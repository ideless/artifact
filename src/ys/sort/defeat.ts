import { Artifact } from "../artifact";

export interface IDefeatResult {
    defeat: number;
    by: Artifact[];
}

export type IDefeatResults = Map<Artifact, IDefeatResult>;

const VecIndices: { [key: string]: number } = {
    cr: 0,
    cd: 1,
    em: 2,
    er: 3,
    atkp: 4,
    defp: 5,
    hpp: 6,
};

/**
 * 按上位替代数从小到大排序。圣遗物b是圣遗物a的上位替代，如果它们类型相同，
 * 且a的所有副词条（除小攻/小生/小防外）b都有而且数值更大。
 * @param arts 圣遗物列表，会被修改
 * @returns results
 */
export function sort(arts: Artifact[]): IDefeatResults {
    const results = new Map<Artifact, IDefeatResult>(),
        mvecs = new Map<Artifact, number[]>();

    let bins: { [key: string]: Artifact[] } = {};
    // categorize artifacts into bins, and update defeat and mvec for each artifact
    for (let a of arts) {
        let categoryKey =
            a.slot + "," + a.mainKey + "," + Math.floor(a.level / 4);
        if (categoryKey in bins) {
            bins[categoryKey].push(a);
        } else {
            bins[categoryKey] = [a];
        }
        results.set(a, { defeat: 0, by: [] });
        mvecs.set(a, [0, 0, 0, 0, 0, 0, 0]);
        for (let m of a.minors) {
            // ignore atk, def and hp
            if (m.key in VecIndices) mvecs.get(a)![VecIndices[m.key]] = m.value;
        }
    }
    // enumerate inside each category (O(n^2))
    for (let categoryKey in bins) {
        let len = bins[categoryKey].length;
        for (let i = 0; i < len - 1; ++i) {
            for (let j = i + 1; j < len; ++j) {
                let a = bins[categoryKey][i],
                    b = bins[categoryKey][j];
                // a Pareto comparison
                let cnt_a_over_b = 0,
                    cnt_b_over_a = 0;
                for (let k = 0; k < 7; ++k) {
                    if (mvecs.get(a)![k] >= mvecs.get(b)![k]) cnt_a_over_b++;
                    if (mvecs.get(b)![k] >= mvecs.get(a)![k]) cnt_b_over_a++;
                }
                // only if these one cnt is 7 and the other <7, update defeat
                if (cnt_a_over_b == 7 && cnt_b_over_a < 7) {
                    results.get(b)!.defeat++;
                    results.get(b)!.by.push(a);
                } else if (cnt_b_over_a == 7 && cnt_a_over_b < 7) {
                    results.get(a)!.defeat++;
                    results.get(a)!.by.push(b);
                }
            }
        }
    }
    // sort by defeat, break ties arbitrarily
    arts.sort((a, b) => results.get(a)!.defeat - results.get(b)!.defeat);

    return results;
}
