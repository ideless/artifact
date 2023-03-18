import { Artifact } from "../artifact";
import { calcAffnum } from "./affnum";
import { SimpleCache } from "../utils";
import type { IWeight } from "../types";
import { ArtifactData } from "../data";
import { getAffnumCDF } from "../gacha/artifact";

export interface IBuild {
    key: string;
    name: string;
    set: string[];
    main: {
        [slotKey: string]: string[];
    };
    weight: {
        [affixKey: string]: number;
    };
}

export interface IPBuildResult {
    maxProb: number;
    buildProbs: { [key: string]: number };
}

export type IPBuildResults = Map<Artifact, IPBuildResult>;

const AffnumCDFCache = new SimpleCache(
    ({ mainKey, weight }: { mainKey: string; weight: IWeight }) => {
        let w = { ...weight };
        ArtifactData.minorKeys.forEach((key) => {
            w[key] ||= 0;
        });
        return getAffnumCDF(mainKey, w);
    }
);

function calcPBuild(art: Artifact, builds: IBuild[], threshold: number) {
    const ret: IPBuildResult = {
        maxProb: 0,
        buildProbs: {},
    };

    // AvgAffnumCache记录不同权重下圣遗物的满级期望词条数
    const AvgAffnumCache = new SimpleCache((weight: IWeight) => {
        return Math.round(calcAffnum(art, weight).avg * 10);
    });
    // ProbCache记录不同权重下的（无套装）适配概率
    const ProbCache = new SimpleCache((weight: IWeight) => {
        let p = ArtifactData.mainDistr[art.slot][art.mainKey] / 5,
            a = AvgAffnumCache.get(weight),
            d = AffnumCDFCache.get({ mainKey: art.mainKey, weight }),
            x = a >= d.length ? 1 : d[a];
        return (p * x + 1 - p) ** 100; // 有没有100其实无所谓，有100更好看一点
    });

    for (const b of builds) {
        // if artifact type is not recommanded, skip
        if (
            ["sands", "goblet", "circlet"].includes(art.slot) &&
            !b.main[art.slot].includes(art.mainKey)
        )
            continue;
        // set factor
        let n_set = b.set.includes(art.set) ? 1 : 2;
        // prob
        let prob = ProbCache.get(b.weight) ** n_set;
        // update result
        if (prob < threshold) continue;
        ret.maxProb = Math.max(ret.maxProb, prob);
        ret.buildProbs[b.key] = prob;
    }

    return ret;
}

/**
 * 按配装适配概率从大到小排序。圣遗物a对配装b的适配概率定义为，刷100个满级圣遗物，
 * 其中和a同部位同主词条的圣遗物得分均不超过a的满级期望得分的概率。
 * 如果a对b是散件则是200个。
 * @param arts 圣遗物列表，会被修改
 * @param builds 配装列表
 * @returns results
 */
export function sort(arts: Artifact[], builds: IBuild[], threshold = 0.001) {
    const results = new Map<Artifact, IPBuildResult>();

    for (let art of arts) {
        let pbuild = calcPBuild(art, builds, threshold);
        results.set(art, pbuild);
    }

    arts.sort((a, b) => {
        let pbuildA = results.get(a),
            pbuildB = results.get(b);
        if (pbuildA === undefined || pbuildB === undefined) {
            throw new Error("Unexpected undefined");
        }
        return pbuildB.maxProb - pbuildA.maxProb;
    });

    return results;
}
