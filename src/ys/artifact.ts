import { argmax, argmin, assert } from "./utils"
import data from "./data"
import build from "./build"
import distr from "./distr"

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
    /**
     * updateScore() will change this.data.affnum.
     * CALL IT BEFORE updateAffnum() !
     */
    updateScore() {
        this.data.score = 0
        this.data.charScores = []
        for (let charKey in build) {
            // main
            if (!build[charKey].main[this.slot].includes(this.mainKey)) {
                continue
            }
            // set
            let p_set = 1
            if (build[charKey].set[4].includes(this.set)) {
                p_set = 5 / 6
            } else if (build[charKey].set[2].includes(this.set)) {
                p_set = 1 / 2
            } else {
                p_set = 1 / 5
            }
            // distr
            let minors = build[charKey].minors
            if (!(minors in distr)) {
                continue
            }
            let weight: any = { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0, defp: 0, em: 0, er: 0, cr: 0, cd: 0 }
            for (let m of minors.split(',')) {
                weight[m] = 1
            }
            this.updateAffnum(weight)
            let main = (this.mainKey in distr[minors]) ? this.mainKey : ''
            let index = Math.min(Math.ceil(this.data.affnum.avg * 8.5), 90)
            let p_minor = distr[minors][main][index]
            let p_main = data.mainDistr[this.slot][this.mainKey]
            let p_low = 1 - p_main * (1 - p_minor);
            // let p = (1 - (1 - p_set) * p_main) * p_low
            let p = p_set * p_low
            this.data.charScores.push({ charKey, score: p })
            this.data.score = Math.max(this.data.score, p)
        }
        this.data.charScores.sort((a, b) => b.score - a.score)
    }
}