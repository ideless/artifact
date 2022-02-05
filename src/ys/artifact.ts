import { argmax, argmin, assert } from "./utils"
import data from "./data"

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
    main: Affix
    minors: Affix[]
    data: {
        index: number
        affnum: {
            cur: number
            avg: number
            min: number
            max: number
        }
        lock: boolean
    }
}

export class Artifact implements IArtifact {
    set = ''
    slot = ''
    rarity = 0
    level = 0
    lock = false
    main = new Affix()
    minors: Affix[] = []
    data = {
        index: 0,
        affnum: { cur: 0, avg: 0, min: 0, max: 0 },
        lock: false,
    }
    constructor(obj?: any) {
        if (obj) {
            obj = JSON.parse(JSON.stringify(obj))
            this.set = obj.set
            this.slot = obj.slot
            this.rarity = obj.rarity
            this.level = obj.level
            this.lock = obj.lock
            this.main = new Affix(obj.main)
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
        Ac.delete(this.main.key)
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
}