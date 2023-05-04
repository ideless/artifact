import { Artifact } from "../artifact";
import type { IBuild } from "./pbuild";
import { setIncludes } from "./pbuild";
import { calcAffnumCur } from "./affnum";
import { getIncreAffnumPdf } from "../gacha/reliq";
import { toCDF } from "../gacha/utils";

interface ICharEqiup {
    flower?: Artifact;
    plume?: Artifact;
    sands?: Artifact;
    goblet?: Artifact;
    circlet?: Artifact;
}

type ISlotKey = keyof ICharEqiup;

export interface IPEquipResult {
    maxProb: number;
    charProbs: {
        [charKey: string]: {
            prob: number;
            art: Artifact;
        };
    };
}

export type IPEquipResults = Map<Artifact, IPEquipResult>;

export function sort(
    arts: Artifact[],
    allArts: Artifact[],
    builds: IBuild[],
    charKeys: string[],
    {
        threshold = 0.001,
        ignoreIndividual = false,
    }: {
        threshold?: number;
        ignoreIndividual?: boolean;
    }
): IPEquipResults {
    // collect character equipment data
    // if there are multiple artifacts in the same slot of the same character,
    // pick the last one
    const equip = new Map<
            string,
            {
                arts: ICharEqiup;
                build: IBuild;
            }
        >(),
        charKeySet = new Set(charKeys);
    for (let art of allArts) {
        if (!art.location || !charKeySet.has(art.location)) continue;
        const charKey = art.location;
        if (!equip.has(charKey)) {
            const build = builds.find((b) => b.key === charKey);
            if (!build) {
                console.warn(`Missing build for character: ${charKey}`);
                continue;
            }
            equip.set(charKey, {
                arts: {},
                build,
            });
        }
        equip.get(charKey)!.arts[art.slot as ISlotKey] = art;
    }

    // for each artifact and character, if
    // - the rarity of the artifact is 5,
    // - the artifact is not equipped,
    // - the character has equipped some other artifact that is
    //   - rarity 5
    //   - fully upgraded
    //   - in the same slot
    //   - with the same main stat,
    // - (optionally) the set of the artifact is recommended for the character
    // then calculate the probability, based on minor stats weight of the
    // character's default build, that the artifact could surpass the equipped
    // one when fully upgraded.
    let results: IPEquipResults = new Map();
    for (let art of arts) {
        const result: IPEquipResult = {
            maxProb: 0,
            charProbs: {},
        };
        if (art.rarity !== 5 || !!art.location) {
            results.set(art, result);
            continue;
        }
        equip.forEach((charEquip, charKey) => {
            const otherArt = charEquip.arts[art.slot as ISlotKey];
            if (
                !otherArt ||
                otherArt.rarity !== 5 ||
                otherArt.level !== 20 ||
                otherArt.mainKey !== art.mainKey
            )
                return;
            const build = charEquip.build;
            if (ignoreIndividual && !setIncludes(build.set, art.set)) return;
            const artCur = Math.round(calcAffnumCur(art, build.weight) * 10),
                otherArtCur = Math.round(
                    calcAffnumCur(otherArt, build.weight) * 10
                );
            if (artCur > otherArtCur) {
                result.maxProb = 1.0;
                result.charProbs[charKey] = {
                    prob: 1.0,
                    art: otherArt,
                };
            } else {
                const pdf = getIncreAffnumPdf(
                        art.mainKey,
                        build.weight,
                        art.nMinorsToUpgrade,
                        art.minors.map((m) => m.key)
                    ),
                    delta = otherArtCur - artCur;
                if (delta >= pdf.length) return;
                const cdf = toCDF(pdf),
                    prob = 1 - cdf[delta];
                if (prob < threshold) return;
                result.maxProb = Math.max(result.maxProb, prob);
                result.charProbs[charKey] = {
                    prob,
                    art: otherArt,
                };
            }
        });
        results.set(art, result);
    }

    // sort by maxProb
    arts.sort((a, b) => {
        let resultA = results.get(a),
            resultB = results.get(b);
        if (resultA === undefined || resultB === undefined) {
            throw new Error("Unexpected undefined");
        }
        return resultB.maxProb - resultA.maxProb;
    });

    return results;
}
