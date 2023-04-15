import {
    convolve,
    product,
    permutations,
    zeros,
    range,
    mix,
    discretize,
    normalize,
} from "./utils";

interface IWeight {
    [key: string]: number;
}

const P_MINOR: IWeight = {
    hp: 6,
    atk: 6,
    def: 6,
    hpp: 4,
    atkp: 4,
    defp: 4,
    em: 4,
    er: 4,
    cr: 3,
    cd: 3,
};

function toWeightVec(weightVecKey: string) {
    if (weightVecKey == "") {
        return [];
    } else {
        return weightVecKey.split(",").map((x) => parseFloat(x));
    }
}

/** Get dict of sorted minor weights (e.g. "1,1,0,0") and corresponding probs */
function getWeightVecProbs(
    mainKey: string,
    weight: IWeight,
    nMinors: number,
    minorKeys: string[] = []
) {
    const allMinors = Object.keys(P_MINOR).filter(
            (m) => m !== mainKey && !minorKeys.includes(m)
        ),
        pAll = allMinors.reduce((p, m) => p + P_MINOR[m], 0),
        weightVecProbs: IWeight = {};

    for (const perm of permutations(allMinors, nMinors)) {
        let p = 1,
            pAllTmp = pAll,
            weightVec: number[] = [];
        for (const m of perm) {
            p *= P_MINOR[m] / pAllTmp;
            pAllTmp -= P_MINOR[m];
            weightVec.push(weight[m]);
        }
        const weightVecKey = minorKeys
            .map((m) => weight[m])
            .concat(...weightVec.sort())
            .join(",");
        if (weightVecKey in weightVecProbs) {
            weightVecProbs[weightVecKey] += p;
        } else {
            weightVecProbs[weightVecKey] = p;
        }
    }

    return weightVecProbs;
}

/** Get pre-4 affnum PDF given minor weights vector */
function getPre4AffnumPdfOfWeightVec(
    weightVec: number[],
    minorKeys: string[] = []
) {
    const nMinors = weightVec.length - minorKeys.length,
        pdf = zeros(10 * nMinors + 1),
        ranges: number[][] = [];

    range(nMinors).forEach(() => ranges.push(range(7, 11)));
    for (const nums of product(...ranges)) {
        const s = nums.reduce(
            (s, n, i) => s + n * weightVec[i + minorKeys.length],
            0
        );
        discretize(pdf, s);
    }
    normalize(pdf);

    return pdf;
}

/** Get post-4 affnum PDF given minor weights vector */
function getPost4AffnumPdfOfWeightVec(weightVec: number[], nMinors: number) {
    let pdf: number[];
    if (nMinors <= 0) {
        pdf = [1];
    } else if (nMinors == 1) {
        pdf = zeros(11);
        for (const [i, j] of product(range(4), range(7, 11))) {
            const s = weightVec[i] * j;
            discretize(pdf, s);
        }
        normalize(pdf);
    } else if (nMinors == 2) {
        pdf = zeros(21);
        for (const [i, j] of product(range(4), range(7, 11))) {
            for (const [k, l] of product(range(4), range(7, 11))) {
                const s = weightVec[i] * j + weightVec[k] * l;
                discretize(pdf, s);
            }
        }
        normalize(pdf);
    } else {
        const pdfs: number[][] = [],
            pdf2 = getPost4AffnumPdfOfWeightVec(weightVec, 2);
        for (const _ of range(Math.floor(nMinors / 2))) {
            pdfs.push(pdf2);
        }
        if (nMinors % 2 == 1) {
            pdfs.push(getPost4AffnumPdfOfWeightVec(weightVec, 1));
        }
        pdf = convolve(...pdfs);
    }

    return pdf;
}

/** Get PDF of incremental affnum x10
 * @param mainKey main affix key, e.g. "atkp". Minor affixes will not confict
 * with this key.
 * @param weight weight dict of minor affixes, 0-1
 * @param nMinors number of minor affixes upgraded
 * @param minorKeys keys of initial minor affixes, length <= 4
 **/
export function getIncreAffnumPdf(
    mainKey: string,
    weight: IWeight,
    nMinors: number,
    minorKeys: string[] = []
) {
    const weightVecProbs = getWeightVecProbs(
            mainKey,
            weight,
            Math.min(nMinors, 4 - minorKeys.length),
            minorKeys
        ),
        pdfs: number[][] = [],
        probs: number[] = [];

    for (const weightVecKey in weightVecProbs) {
        const weightVec = toWeightVec(weightVecKey);
        pdfs.push(
            convolve(
                getPre4AffnumPdfOfWeightVec(weightVec, minorKeys),
                getPost4AffnumPdfOfWeightVec(
                    weightVec,
                    Math.max(nMinors - 4 + minorKeys.length, 0)
                )
            )
        );
        probs.push(weightVecProbs[weightVecKey]);
    }

    return mix(pdfs, probs);
}

/** Get min, max, and average of incremental affnum
 * @param mainKey main affix key, e.g. "atkp". Minor affixes will not confict
 * with this key.
 * @param weight weight dict of minor affixes, 0-1
 * @param nMinors number of minor affixes upgraded
 * @param minorKeys keys of initial minor affixes, length <= 4
 **/
export function getIncreAffnumMinMaxAvg(
    mainKey: string,
    weight: IWeight,
    nMinors: number,
    minorKeys: string[] = []
) {
    const nMinorsPre4 = Math.min(nMinors, 4 - minorKeys.length),
        nMinorsPost4 = nMinors - nMinorsPre4,
        weightVecProbs = getWeightVecProbs(
            mainKey,
            weight,
            nMinorsPre4,
            minorKeys
        ),
        result = {
            min: Number.MAX_VALUE,
            max: 0,
            avg: 0,
        };

    for (const weightVecKey in weightVecProbs) {
        const weightVec = toWeightVec(weightVecKey);
        let minOfWeightVec = 0,
            maxOfWeightVec = 0,
            avgOfWeightVec = 0,
            wMin = Number.MAX_VALUE,
            wMax = 0,
            wSum = 0;
        weightVec.forEach((w, i) => {
            wMin = Math.min(wMin, w);
            wMax = Math.max(wMax, w);
            wSum += w;
            if (i >= minorKeys.length) {
                minOfWeightVec += 0.7 * w;
                maxOfWeightVec += 1.0 * w;
                avgOfWeightVec += 0.85 * w;
            }
        });
        minOfWeightVec += nMinorsPost4 * (0.7 * wMin);
        maxOfWeightVec += nMinorsPost4 * (1.0 * wMax);
        avgOfWeightVec += nMinorsPost4 * (0.85 * (wSum / 4));
        result.min = Math.min(result.min, minOfWeightVec);
        result.max = Math.max(result.max, maxOfWeightVec);
        result.avg += avgOfWeightVec * weightVecProbs[weightVecKey];
    }

    return result;
}

/** Get PDF of affnum x10 of a random artifact
 * @param mainKey main affix key, e.g. "atkp". Minor affixes will not confict
 * with this key.
 * @param weight weight dict of minor affixes, 0-1
 * @param rarity rarity of the artifact, 3-5
 * @param level level of the artifact, 0-4*rarity
 **/
export function getAffnumPdf(
    mainKey: string,
    weight: IWeight,
    rarity: number,
    level?: number
) {
    if (level === undefined) level = rarity * 4;

    const nUpgrades = Math.floor(level / 4),
        nMinorsMin = rarity - 2 + nUpgrades,
        nMinorsMax = nMinorsMin + 1,
        pMin = 0.8,
        pMax = 0.2,
        pdfs: number[][] = [],
        probs: number[] = [];

    if (nMinorsMax <= 4) {
        const weightVecProbsMin = getWeightVecProbs(
                mainKey,
                weight,
                nMinorsMin
            ),
            weightVecProbsMax = getWeightVecProbs(mainKey, weight, nMinorsMax);

        for (const weightVecKey in weightVecProbsMin) {
            const weightVec = toWeightVec(weightVecKey);
            pdfs.push(getPre4AffnumPdfOfWeightVec(weightVec));
            probs.push(weightVecProbsMin[weightVecKey] * pMin);
        }
        for (const weightVecKey in weightVecProbsMax) {
            const weightVec = toWeightVec(weightVecKey);
            pdfs.push(getPre4AffnumPdfOfWeightVec(weightVec));
            probs.push(weightVecProbsMax[weightVecKey] * pMax);
        }
    } else {
        const weightVecProbs = getWeightVecProbs(mainKey, weight, 4);

        for (const weightVecKey in weightVecProbs) {
            const weightVec = toWeightVec(weightVecKey),
                pdf1 = getPost4AffnumPdfOfWeightVec(weightVec, 1),
                pdf2 =
                    nMinorsMax > 5
                        ? getPost4AffnumPdfOfWeightVec(weightVec, 2)
                        : undefined, // no need to calc it if nMinorsMax=5
                nPdf2 = Math.floor((nMinorsMax - 5) / 2);
            pdfs.push(
                convolve(
                    getPre4AffnumPdfOfWeightVec(weightVec),
                    ...range(nPdf2).map((_) => pdf2 as number[]),
                    nMinorsMax % 2 == 1
                        ? mix([pdf1], [pMax])
                        : mix([pdf1, pdf2 as number[]], [pMin, pMax])
                )
            );
            probs.push(weightVecProbs[weightVecKey]);
        }
    }

    return mix(pdfs, probs);
}
