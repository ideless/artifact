import { argmax, argmin, assert } from "./utils"
import data from "./data"
import build from "./build"
import { affnumDistr } from "./gacha/artifact"

const AffnumDistrCache: { [key: string]: any } = {}
const WeightCache: { [key: string]: any } = {}

interface IAffix {
    key: string
    value: number
}

export class Affix implements IAffix {
    key = ''
    value = 0
    constructor(obj?: any) {
        if (obj) {
            this.key = obj.key
            this.value = obj.value
        }
    }
    valueString() {
        if (['hp', 'atk', 'def', 'em'].includes(this.key)) {
            return this.value.toFixed(0)
        } else {
            return this.value.toFixed(1) + '%'
        }
    }
}

interface IArtifact {
    set: string
    slot: string
    rarity: number
    level: number
    lock: boolean
    location: string
    mainKey: string
    minors: Affix[]
    data: {
        index: number
        affnum: {
            cur: number
            avg: number
            min: number
            max: number
        }
        score: number
        charScores: Array<{
            charKey: string
            score: number
        }>
        lock: boolean
    }
}

export class Artifact implements IArtifact {
    set = ''
    slot = ''
    rarity = 0
    level = 0
    lock = false
    location = ''
    mainKey = ''
    minors: Affix[] = []
    data = {
        index: 0,
        affnum: { cur: 0, avg: 0, min: 0, max: 0 },
        score: 0,
        charScores: [] as Array<{ charKey: string, score: number }>,
        lock: false,
    }
    constructor(obj?: any) {
        if (obj) {
            this.set = obj.set
            this.slot = obj.slot
            this.rarity = obj.rarity
            this.level = obj.level
            this.lock = obj.lock
            this.location = obj.location
            this.mainKey = obj.mainKey
            for (let o of obj.minors) {
                this.minors.push(new Affix(o))
            }
            this.data.lock = this.lock
        }
    }
    validate() {
        assert(this.rarity == 5, 'Only 5 star artifacts are supported')
        assert([3, 4].includes(this.minors.length), 'Invalid artifact: number of minors is not 3 or 4')
        assert(this.level >= 0 && this.level <= 20, 'Invalid artifact: invalid level')
        assert(this.level < 4 || this.minors.length == 4, 'Invalid artifact: number of minors is not 4')
    }
    updateAffnum(w: { [key: string]: number }) {
        // Refer to ./README.md for symbols and equations
        this.data.affnum = { cur: 0, avg: 0, min: 0, max: 0 }
        let A: Set<string> = new Set(), Ac = new Set(data.minorKeys), sum_w = 0
        Ac.delete(this.mainKey)
        for (let a of this.minors) {
            this.data.affnum.cur += w[a.key] * a.value / data.minorStat[a.key].v / 0.85
            A.add(a.key)
            Ac.delete(a.key)
            sum_w += w[a.key]
        }
        if (this.minors.length == 3) {
            // avg
            let dn = 0, nm = 0 // denominator and numerator
            Ac.forEach(a_key => {
                nm += w[a_key] * data.minorStat[a_key].p
                dn += data.minorStat[a_key].p
            })
            this.data.affnum.avg = this.data.affnum.cur + sum_w + 2 * nm / dn
            // max
            let a4_key = argmax(w, Ac) as string
            A.add(a4_key)
            let astar_key = argmax(w, A) as string
            A.delete(a4_key)
            this.data.affnum.max = this.data.affnum.cur + (w[a4_key] + 4 * w[astar_key]) / 0.85
            // min
            a4_key = argmin(w, Ac) as string
            A.add(a4_key)
            astar_key = argmin(w, A) as string
            A.delete(a4_key)
            this.data.affnum.min = this.data.affnum.cur + (w[a4_key] + 4 * w[astar_key]) * 0.7 / 0.85
        } else { // this.minors.length == 4
            let n = Math.ceil((20 - this.level) / 4) // n.o. upgrades
            // avg
            this.data.affnum.avg = this.data.affnum.cur + n * sum_w / 4
            // max
            let astar_key = argmax(w, A) as string
            this.data.affnum.max = this.data.affnum.cur + n * w[astar_key] / 0.85
            // min
            astar_key = argmin(w, A) as string
            this.data.affnum.min = this.data.affnum.cur + n * w[astar_key] * 0.7 / 0.85
        }
    }
    getAvgAffnum(w: { [key: string]: number }) {
        let A: Set<string> = new Set(), Ac = new Set(data.minorKeys), sum_w = 0, cur = 0
        Ac.delete(this.mainKey)
        for (let a of this.minors) {
            cur += w[a.key] * a.value / data.minorStat[a.key].v
            A.add(a.key)
            Ac.delete(a.key)
            sum_w += w[a.key]
        }
        if (this.minors.length == 3) {
            let dn = 0, nm = 0 // denominator and numerator
            Ac.forEach(a_key => {
                nm += w[a_key] * data.minorStat[a_key].p
                dn += data.minorStat[a_key].p
            })
            return cur + 0.85 * sum_w + 1.7 * nm / dn // 0.85*2=1.7
        } else { // this.minors.length == 4
            let n = Math.ceil((20 - this.level) / 4) // n.o. upgrades
            return cur + n * sum_w / 4 * 0.85
        }
    }
    updateScore() {
        this.data.score = 0
        this.data.charScores = []
        function get_weight(minors: string) {
            if (minors in WeightCache) return WeightCache[minors]
            return WeightCache[minors] = JSON.parse(minors)
        }
        const AffnumCache: { [key: string]: number } = {}
        function get_affnum(artifact: Artifact, minors: string, weight: { [key: string]: number }) {
            if (minors in AffnumCache) return AffnumCache[minors]
            let s = artifact.getAvgAffnum(weight)
            // for (let m of artifact.minors) {
            //     s += weight[m.key] * m.value / data.minorStat[m.key].v
            // }
            // here 'affnum' should be Math.round('current affnum' * 10)
            return AffnumCache[minors] = Math.round(s * 10)
        }
        function get_affnum_distr(minors: string, main: string, weight: { [key: string]: number }) {
            let distr_key = minors + '|' + main
            if (distr_key in AffnumDistrCache) return AffnumDistrCache[distr_key]
            let d = affnumDistr(main, weight)
            return AffnumDistrCache[distr_key] = d
        }
        const ScoreCache: { [key: string]: number } = {}
        function get_score(minors: string, slot: string, main: string, distr: number[], affnum: number) {
            if (minors in ScoreCache) return ScoreCache[minors]
            let p = data.mainDistr[slot][main] / 5
            let x = affnum >= distr.length ? 1 : distr[affnum]
            return ScoreCache[minors] = (p * x + 1 - p) ** 100
        }
        for (let charKey in build) {
            // if the main stat is not recommanded, skip
            if (!build[charKey].main[this.slot].includes(this.mainKey))
                continue
            // set factor
            let n_set = 2
            if (build[charKey].set[4].includes(this.set)) {
                n_set = 1
            } else if (build[charKey].set[2].includes(this.set)) {
                n_set = 1
            }
            // get score
            let weight = get_weight(build[charKey].minors)
            let affnum = get_affnum(this, build[charKey].minors, weight)
            let distr = get_affnum_distr(build[charKey].minors, this.mainKey, weight)
            let score = get_score(build[charKey].minors, this.slot, this.mainKey, distr, affnum) ** n_set
            // console.log(charKey, build[charKey].minors)
            // console.log(weight)
            // console.log(affnum)
            // console.log(distr)
            // console.log(score)
            // update
            if (score < 0.001) continue
            this.data.charScores.push({ charKey, score })
            this.data.score = Math.max(this.data.score, score)
        }
        this.data.charScores.sort((a, b) => b.score - a.score)
    }
}