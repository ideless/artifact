import { Artifact } from "../artifact";
import { ArtifactData } from "../data";
import type { IMinorAffixKey, IWeight } from "../types";
import { getIncreAffnumMinMaxAvg } from "../gacha/reliq";

export interface ISetBonusTable {
    [setKey: string]: string[];
}

export type IAffixWeightTable = Array<{
    set: string;
    type: string;
    label: string;
    weight: IWeight;
}>;

export type IAffnumResult = {
    cur: number;
    min: number;
    max: number;
    avg: number;
    weight: IWeight;
    setBonus: number;
};

export type IAffnumResults = Map<Artifact, IAffnumResult>;

export function calcAffnumCur(art: Artifact, weight: IWeight): number {
    let result = 0,
        minorStats = art.minorStats;

    art.minors.forEach((m) => {
        result +=
            (weight[m.key] * m.value) / minorStats[m.key as IMinorAffixKey];
    });

    return result;
}

export function calcAffnumFull(
    art: Artifact,
    weight: IWeight,
    setBonus = 0
): IAffnumResult {
    let _weight: IWeight = { ...weight },
        result = {
            cur: setBonus,
            min: 0,
            max: 0,
            avg: 0,
            weight: _weight,
            setBonus,
        };

    ArtifactData.minorKeys.forEach((key) => {
        _weight[key] ||= 0;
    });

    result.cur += calcAffnumCur(art, _weight);
    result.min = result.max = result.avg = result.cur;

    let increMinMaxAvg = getIncreAffnumMinMaxAvg(
        art.mainKey,
        _weight,
        art.nMinorsToUpgrade,
        art.minors.map((m) => m.key)
    );

    result.min += increMinMaxAvg.min;
    result.max += increMinMaxAvg.max;
    result.avg += increMinMaxAvg.avg;

    return result;
}

/**
 * 按满级期望词条数从大到小排序。词条数单次最大提升量为单位。
 * @param arts 待排序的圣遗物列表，会被修改
 * @param setBonusTable 套装词条加成表
 * @param affixWeightTable 词条权重表
 * @returns results
 */
export function sort(
    arts: Artifact[],
    setBonusTable: ISetBonusTable,
    affixWeightTable: IAffixWeightTable
): IAffnumResults {
    const results = new Map<Artifact, IAffnumResult>();

    for (const art of arts) {
        const set = art.set,
            type = `${art.slot}_${art.mainKey}`;

        // query set bonus
        const setBonus =
            (setBonusTable[set] && setBonusTable[set].includes(type)) ||
            (setBonusTable["*"] && setBonusTable["*"].includes(type))
                ? 1
                : 0;

        // query affix weight
        let filteredRules: IAffixWeightTable = [],
            filterLevel = 0;
        affixWeightTable.forEach((rule) => {
            let level = 0;

            if (rule.set === set) {
                level += 2;
            } else if (rule.set !== "*") {
                return;
            }

            if (rule.type === type) {
                level += 1;
            } else if (rule.type !== "*") {
                return;
            }

            filteredRules.push(rule);
            // if (level < filterLevel) {
            //     return;
            // } else if (level === filterLevel) {
            //     filteredRules.push(rule);
            // } else {
            //     filteredRules = [rule];
            //     filterLevel = level;
            // }
        });
        // then calculate affnum for each rule, and the max (avg) one as result
        let result: IAffnumResult = {
                cur: setBonus,
                min: setBonus,
                max: setBonus,
                avg: setBonus,
                weight: {},
                setBonus,
            },
            maxAvg = -Infinity;
        filteredRules.forEach((rule) => {
            const affnum = calcAffnumFull(art, rule.weight, setBonus);
            if (affnum.avg > maxAvg) {
                result = affnum;
                maxAvg = affnum.avg;
            }
        });

        results.set(art, result);
    }

    arts.sort((a, b) => {
        const aAffnum = results.get(a);
        const bAffnum = results.get(b);
        if (aAffnum === undefined || bAffnum === undefined) {
            throw new Error("Unexpected undefined");
        }
        return bAffnum.avg - aAffnum.avg;
    });

    return results;
}
