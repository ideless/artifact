import { argmax, argmin, assert, choice, SimpleCache } from "./utils"
import ArtifactData from "./data/artifact"
import CharacterData, { IBuild } from "./data/character"
import { affnumDistr } from "./gacha/artifact"

interface IWeight {
    [key: string]: number
}

const AffnumDistrCache = new SimpleCache(({ main, weight }: { main: string, weight: IWeight }) => {
    return affnumDistr(main, weight)
})

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
    valueString(showAffnum?: boolean) {
        if (showAffnum) {
            let v = this.value / ArtifactData.minorStat[this.key].v / 0.85
            return v.toFixed(1)
        } else {
            if (['hp', 'atk', 'def', 'em'].includes(this.key)) {
                return this.value.toFixed(0)
            } else {
                return this.value.toFixed(1) + '%'
            }
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
        index: number // 圣遗物唯一标识，如果是导入的圣遗物就是导入数据中的序号，否则一般是Math.random()生成的随机数取相反数（因为想和导入的圣遗物在“不排序”时区分开）
        source: string // 圣遗物数据来源，例如"good"，内部生成的source为''
        lock: boolean // 导入数据中圣遗物的原本加解锁信息，用来识别在本工具中做过的修改
        affnum: { // “词条数”
            cur: number
            avg: number
            min: number
            max: number
        }
        score: number // 稀有度
        charScores: Array<{
            charKey: string
            score: number
        }>
        defeat: number // 上位替代数
        mvec: number[]
    }
}

export class Artifact implements IArtifact {
    set = ''
    slot = ''
    rarity = 5
    level = 0
    lock = false
    location = ''
    mainKey = ''
    minors: Affix[] = []
    data = {
        index: -Math.random(),
        source: '',
        lock: false,
        affnum: { cur: 0, avg: 0, min: 0, max: 0 },
        score: 0,
        charScores: [] as Array<{ charKey: string, score: number }>,
        defeat: 0,
        mvec: [] as number[]
    }
    constructor(obj?: any) {
        if (typeof obj === 'object') {
            this.set = obj.set || this.set
            this.slot = obj.slot || this.slot
            this.rarity = obj.rarity || this.rarity
            this.level = obj.level || this.level
            this.lock = obj.lock || this.lock
            this.location = obj.location || this.location
            this.mainKey = obj.mainKey || this.mainKey
            if (obj.minors instanceof Array) {
                for (let o of obj.minors) {
                    this.minors.push(new Affix(o))
                }
            }
            this.data.lock = this.lock
        }
    }
    clear() {
        this.data.score = 0
        this.data.charScores = []
        this.data.defeat = 0
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
        let A: Set<string> = new Set(), Ac = new Set(ArtifactData.minorKeys), sum_w = 0
        Ac.delete(this.mainKey)
        for (let a of this.minors) {
            this.data.affnum.cur += w[a.key] * a.value / ArtifactData.minorStat[a.key].v / 0.85
            A.add(a.key)
            Ac.delete(a.key)
            sum_w += w[a.key]
        }
        if (this.minors.length == 3) {
            // avg
            let dn = 0, nm = 0 // denominator and numerator
            Ac.forEach(a_key => {
                nm += w[a_key] * ArtifactData.minorStat[a_key].p
                dn += ArtifactData.minorStat[a_key].p
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
        } else if (this.minors.length == 4) {
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
        let A: Set<string> = new Set(), Ac = new Set(ArtifactData.minorKeys), sum_w = 0, cur = 0
        Ac.delete(this.mainKey)
        for (let a of this.minors) {
            cur += w[a.key] * a.value / ArtifactData.minorStat[a.key].v
            A.add(a.key)
            Ac.delete(a.key)
            sum_w += w[a.key]
        }
        if (this.minors.length == 3) {
            let dn = 0, nm = 0 // denominator and numerator
            Ac.forEach(a_key => {
                nm += w[a_key] * ArtifactData.minorStat[a_key].p
                dn += ArtifactData.minorStat[a_key].p
            })
            return cur + 0.85 * sum_w + 1.7 * nm / dn // 0.85*2=1.7
        } else { // this.minors.length == 4
            let n = Math.ceil((20 - this.level) / 4) // n.o. upgrades
            return cur + n * sum_w / 4 * 0.85
        }
    }
    updateScore(charKeys: string[]) {
        this.data.score = 0
        this.data.charScores = []
        // AffnumCache记录不同权重下圣遗物的满级期望词条数
        const AffnumCache = new SimpleCache((weight: IWeight) => {
            return Math.round(this.getAvgAffnum(weight) * 10)
        })
        // ScoreCache记录不同权重下的得分
        const ScoreCache = new SimpleCache((
            weight: IWeight,
            { slot, main, distr, affnum }: { slot: string, main: string, distr: number[], affnum: number }
        ) => {
            let p = ArtifactData.mainDistr[slot][main] / 5
            let x = affnum >= distr.length ? 1 : distr[affnum]
            return (p * x + 1 - p) ** 100 // 有没有100其实无所谓，有100更好看一点
        })
        // 对每个角色分别计算
        for (let charKey of charKeys) {
            let b = CharacterData[charKey].build
            // if the main stat is not recommanded, skip
            if (!b.main[this.slot].includes(this.mainKey))
                continue
            // set factor
            let n_set = b.set.includes(this.set) ? 1 : 2
            // get score
            let affnum = AffnumCache.get(b.weight)
            let distr = AffnumDistrCache.get({ main: this.mainKey, weight: b.weight })
            let score = ScoreCache.get(b.weight, { slot: this.slot, main: this.mainKey, distr, affnum }) ** n_set
            // update
            this.data.score = Math.max(this.data.score, score)
            if (score >= 0.001)
                this.data.charScores.push({ charKey, score })
        }
        this.data.charScores.sort((a, b) => b.score - a.score)
    }
    updateScoreSingle(b: IBuild) {
        this.data.score = 0
        this.data.charScores = []
        if (!b.main[this.slot].includes(this.mainKey))
            return
        let n_set = b.set.includes(this.set) ? 1 : 2
        let affnum = Math.round(this.getAvgAffnum(b.weight) * 10)
        let distr = AffnumDistrCache.get({ main: this.mainKey, weight: b.weight })
        let p = ArtifactData.mainDistr[this.slot][this.mainKey] / 5
        let x = affnum >= distr.length ? 1 : distr[affnum]
        this.data.score = (p * x + 1 - p) ** n_set
    }
    static sortByDefeat(artifacts: Artifact[]) {
        let vecIndices: { [key: string]: number } = {
            'cr': 0, 'cd': 1, 'em': 2, 'er': 3,
            'atkp': 4, 'defp': 5, 'hpp': 6
        }
        let bins: { [key: string]: Artifact[] } = {}
        // categorize artifacts into bins, and update defeat and mvec for each artifact
        for (let a of artifacts) {
            let categoryKey = a.slot + ',' + a.mainKey + ',' + Math.floor(a.level / 4)
            if (categoryKey in bins) {
                bins[categoryKey].push(a)
            } else {
                bins[categoryKey] = [a]
            }
            a.data.defeat = 0
            a.data.mvec = [0, 0, 0, 0, 0, 0, 0]
            for (let m of a.minors) {
                // ignore atk, def and hp
                if (m.key in vecIndices)
                    a.data.mvec[vecIndices[m.key]] = m.value
            }
        }
        // enumerate inside each category (O(n^2))
        for (let categoryKey in bins) {
            let len = bins[categoryKey].length
            for (let i = 0; i < len - 1; ++i) {
                for (let j = i + 1; j < len; ++j) {
                    let a = bins[categoryKey][i], b = bins[categoryKey][j]
                    // a Pareto comparisom
                    let cnt_a_over_b = 0, cnt_b_over_a = 0
                    for (let k = 0; k < 7; ++k) {
                        if (a.data.mvec[k] >= b.data.mvec[k])
                            cnt_a_over_b++
                        if (b.data.mvec[k] >= a.data.mvec[k])
                            cnt_b_over_a++
                    }
                    // only if these one cnt is 7 and the other <7, update defeat
                    if (cnt_a_over_b == 7 && cnt_b_over_a < 7) {
                        b.data.defeat++
                    } else if (cnt_b_over_a == 7 && cnt_a_over_b < 7) {
                        a.data.defeat++
                    }
                }
            }
        }
        // sort by defeat (in increasing order), break ties arbitariliy
        artifacts.sort((a, b) => a.data.defeat - b.data.defeat)
    }
    static rand(
        {
            sets,
            slot,
            mainKey,
            init_3,
            level = 0,
        }: {
            sets?: string[]
            slot?: string
            mainKey?: string
            init_3?: boolean
            level?: number
        }
    ) {
        let artifact = new Artifact()
        // 套装
        if (sets instanceof Array && sets.length) {
            artifact.set = choice(sets)
        }
        // 部位
        if (slot && ['flower', 'plume', 'sands', 'goblet', 'circlet'].includes(slot)) {
            artifact.slot = slot
        } else {
            artifact.slot = choice(['flower', 'plume', 'sands', 'goblet', 'circlet'])
        }
        // 主词条
        if (mainKey && ArtifactData.mainKeys[artifact.slot].includes(mainKey)) {
            artifact.mainKey = mainKey
        } else {
            let mains: string[] = [], main_prs: number[] = []
            for (let key in ArtifactData.mainDistr[artifact.slot]) {
                mains.push(key)
                main_prs.push(ArtifactData.mainDistr[artifact.slot][key])
            }
            artifact.mainKey = choice(mains, main_prs)
        }
        // 是否初始3词条
        if (init_3 == undefined) {
            init_3 = Math.random() < 0.8
        }
        // 等级
        artifact.level = level
        // 副词条列表
        let p_all = (artifact.mainKey in ArtifactData.minorStat) ? 1 - ArtifactData.minorStat[artifact.mainKey].p : 1
        let all_minors: string[] = [], minor_prs: number[] = []
        for (let m in ArtifactData.minorStat) if (m != artifact.mainKey) {
            all_minors.push(m)
            minor_prs.push(ArtifactData.minorStat[m].p / p_all)
        }
        let minor_keys = choice(all_minors, minor_prs, 4)
        let minor_values = [0, 0, 0, 0]
        for (let i = 0; i < 4; ++i) {
            minor_values[i] = 7 + choice(4)
        }
        let n_level_up = Math.floor(level / 4)
        if (init_3) n_level_up--
        for (let i = 0; i < n_level_up; ++i) {
            let j = choice(4)
            let k = 7 + choice(4)
            minor_values[j] += k
        }
        let len = (init_3 && level < 4) ? 3 : 4
        for (let i = 0; i < len; ++i) {
            artifact.minors.push(new Affix({
                key: minor_keys[i],
                value: minor_values[i] / 10 * ArtifactData.minorStat[minor_keys[i]].v
            }))
        }
        return artifact
    }
}