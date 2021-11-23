import { assert } from './error'
import { Artifact } from './artifact'
import { MinorAffixStat, MinorAffixes } from './stat'

/**
 * 
 * @param {Artifact} artifact 
 */
function validateArtifact(artifact) {
    assert(artifact instanceof Artifact)
    assert(artifact.rarity == 5, 'Only 5 star artifacts are supported')
    assert([3, 4].includes(artifact.minorAffixes.length), 'Invalid artifact')
    assert(artifact.level >= 0 && artifact.level <= 20, 'Invalid artifact')
    assert(artifact.level < 4 || artifact.minorAffixes.length == 4, 'Invalid artifact')
}

/**
 * 
 * @param {Object} obj objective dict
 * @param {Set} A possible key set
 */
function argmax(obj, A) {
    let m = undefined, ma = undefined
    A.forEach(a => {
        if (a in obj) {
            if (m === undefined || obj[a] > m) {
                m = obj[a]
                ma = a
            }
        }
    })
    return ma
}

/**
 * 
 * @param {Object} obj objective dict
 * @param {Set} A possible key set
 */
function argmin(obj, A) {
    let m = undefined, ma = undefined
    A.forEach(a => {
        if (a in obj) {
            if (m === undefined || obj[a] < m) {
                m = obj[a]
                ma = a
            }
        }
    })
    return ma
}

/**
 * 
 * @param {Artifact} artifact 
 */
function availableAffixSet(artifact) {
    let ret = new Set(MinorAffixes)
    ret.delete(artifact.mainAffix.key)
    for (let a of artifact.minorAffixes) {
        ret.delete(a.key)
    }
    return ret
}

/**
 * @param {Artifact} artifact
 * @param {Object} w User minor affix weight object
 */
function expectedAffixNumber(artifact, w) {
    validateArtifact(artifact)
    let n = Math.ceil((20 - artifact.level) / 4) // n.o. upgrades
    let S = 0
    if (artifact.minorAffixes.length == 3) {
        let avaAfs = availableAffixSet(artifact)
        let nm = 0, dn = 0
        avaAfs.forEach(akey => {
            nm += w[akey] * MinorAffixStat[akey].p
            dn += MinorAffixStat[akey].p
        })
        S += nm / dn * 1.7
        n--
    }
    let ean = n * 0.85 / 4
    for (let a of artifact.minorAffixes) {
        S += w[a.key] * (a.value / MinorAffixStat[a.key].v + ean)
    }
    return S
}

/**
 * @param {Artifact} artifact
 * @param {Object} w User minor affix weight object
 */
function maximumAffixNumber(artifact, w) {
    validateArtifact(artifact)
    let n = Math.ceil((20 - artifact.level) / 4) // n.o. upgrades
    let S = 0, A = new Set()
    for (let a of artifact.minorAffixes) {
        S += w[a.key] * a.value / MinorAffixStat[a.key].v
        A.add(a.key)
    }
    if (artifact.minorAffixes.length == 3) {
        let avaAfs = availableAffixSet(artifact)
        let a4 = argmax(w, avaAfs)
        S += w[a4]
        A.add(a4)
        n--
    }
    let amax = argmax(w, A)
    S += n * w[amax]
    return S
}

/**
 * @param {Artifact} artifact
 * @param {Object} w User minor affix weight object
 */
function minimumAffixNumber(artifact, w) {
    validateArtifact(artifact)
    let n = Math.ceil((20 - artifact.level) / 4) // n.o. upgrades
    let S = 0, A = new Set()
    for (let a of artifact.minorAffixes) {
        S += w[a.key] * a.value / MinorAffixStat[a.key].v
        A.add(a.key)
    }
    if (artifact.minorAffixes.length == 3) {
        let avaAfs = availableAffixSet(artifact)
        let a4 = argmin(w, avaAfs)
        S += 0.7 * w[a4]
        A.add(a4)
        n--
    }
    let amin = argmin(w, A)
    S += n * 0.7 * w[amin]
    return S
}

/**
 * @param {Artifact} artifact
 * @param {Object} w User minor affix weight object
 */
function currentAffixNumber(artifact, w) {
    validateArtifact(artifact)
    let S = 0
    for (let a of artifact.minorAffixes) {
        S += w[a.key] * a.value / MinorAffixStat[a.key].v
    }
    return S
}

export { expectedAffixNumber, maximumAffixNumber, minimumAffixNumber, currentAffixNumber }