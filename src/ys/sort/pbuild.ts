import { Artifact } from "../artifact";
import { calcAffnumFull } from "./affnum";
import { SimpleCache } from "../utils";
import type { IWeight } from "../types";
import { ArtifactData } from "../data";
import { getAffnumPdf } from "../gacha/reliq";
import { toCDF } from "../gacha/utils";

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

export type IPBuildSortBy = "max" | "owner";

const AffnumCDFCache = new SimpleCache(
    ({
        mainKey,
        weight,
        rarity,
    }: {
        mainKey: string;
        weight: IWeight;
        rarity: number;
    }) => {
        let w = { ...weight };
        ArtifactData.minorKeys.forEach((key) => {
            w[key] ||= 0;
        });
        let pdf = getAffnumPdf(mainKey, w, rarity);
        return toCDF(pdf);
    }
);

export function setIncludes(set: string[], target: string) {
    for (let s of set) {
        if (s.startsWith("s:")) {
            if (
                s in ArtifactData.setGroups &&
                ArtifactData.setGroups[
                    s as keyof typeof ArtifactData.setGroups
                ].includes(target)
            )
                return true;
        } else if (s === target) return true;
    }
    return false;
}

function calcPBuild(
    art: Artifact,
    builds: IBuild[],
    {
        threshold = 0.001,
        numInSet = 100,
        numIndividual = 200,
        ignoreIndividual = false,
    }: {
        threshold?: number;
        numInSet?: number;
        numIndividual?: number;
        ignoreIndividual?: boolean;
    }
) {
    const ret: IPBuildResult = {
        maxProb: 0,
        buildProbs: {},
    };

    // AvgAffnumCache记录不同权重下圣遗物的满级期望词条数
    const AvgAffnumCache = new SimpleCache((weight: IWeight) => {
        return Math.round(calcAffnumFull(art, weight).avg * 10);
    });
    // ProbCache记录不同权重下的（无套装）适配概率
    const ProbCache = new SimpleCache((weight: IWeight) => {
        let p = (ArtifactData.mainProbs as any)[art.slot][art.mainKey] / 5,
            a = AvgAffnumCache.get(weight),
            d = AffnumCDFCache.get({
                mainKey: art.mainKey,
                weight,
                rarity: art.rarity,
            }),
            x = a >= d.length ? 1 : d[a];
        return p * x + 1 - p;
    });

    for (const b of builds) {
        // if artifact type is not recommanded, skip
        if (
            ["sands", "goblet", "circlet"].includes(art.slot) &&
            !b.main[art.slot].includes(art.mainKey)
        )
            continue;
        // if not in recommanded set, and should ignore individual artifact, skip
        let inSet = setIncludes(b.set, art.set);
        if (!inSet && ignoreIndividual) continue;
        // set factor
        let nSet = inSet ? numInSet : numIndividual;
        // prob
        let prob = ProbCache.get(b.weight) ** nSet;
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
 * @param allBuilds 配装列表
 * @param selectedBuildKeys 选中的配装key
 * @param sortBy 排序依据
 *   - max: 最大适配概率
 *   - owner: 如果已装配，按装配者的概率排序，否则按最大适配概率排序
 * @returns results
 */
export function sort(
    arts: Artifact[],
    allBuilds: IBuild[],
    selectedBuildKeys: string[],
    {
        sortBy = "max",
        threshold = 0.001,
        numInSet = 100,
        numIndividual = 200,
        ignoreIndividual = false,
    }: {
        sortBy?: IPBuildSortBy;
        threshold?: number;
        numInSet?: number;
        numIndividual?: number;
        ignoreIndividual?: boolean;
    }
) {
    const results = new Map<Artifact, IPBuildResult>(),
        builds = allBuilds.filter((b) => selectedBuildKeys.includes(b.key));

    for (let art of arts) {
        let _builds = [...builds];
        if (sortBy == "owner") {
            _builds = _builds.concat(
                allBuilds.filter((b) => b.key === art.location)
            );
        }
        let pbuild = calcPBuild(art, _builds, {
            threshold,
            numInSet,
            numIndividual,
            ignoreIndividual,
        });
        results.set(art, pbuild);
    }

    arts.sort((a, b) => {
        let pbuildA = results.get(a),
            pbuildB = results.get(b);
        if (pbuildA === undefined || pbuildB === undefined) {
            throw new Error("Unexpected undefined");
        }
        if (sortBy === "max") {
            return pbuildB.maxProb - pbuildA.maxProb;
        } else if (sortBy === "owner") {
            let pa = a.location
                    ? pbuildA.buildProbs[a.location] || 0
                    : pbuildA.maxProb,
                pb = b.location
                    ? pbuildB.buildProbs[b.location] || 0
                    : pbuildB.maxProb;
            return pb - pa;
        } else {
            throw new Error("Unexpected sortBy");
        }
    });

    return results;
}
