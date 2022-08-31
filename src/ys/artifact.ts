import { assert, SimpleCache } from "./utils"
import ArtifactData from "./data/artifact"
import CharacterData, { IBuild } from "./data/character"
import setweight from "./data/artifact_w"
import { affnumDistr } from "./gacha/artifact"
import preset from "./data/character_w"

interface IWeight {
    [key: string]: number
}
export class ArtifactScoreWeight implements IWeight {
    [key: string]: number
    hp = 0.3
    atk = 0.5
    def = 0.3
    hpp = 1
    atkp = 1
    defp = 1
    em = 1
    er = 1
    cr = 1.5
    cd = 1.5
    hpprop = 0.5
    defprop  = 0.5
    main = 0.5
    set = 0.3
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
            let v = this.value / ArtifactData.minorStat[this.key].v
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
            md: number
            ma: number
            se: number
            tot: number
        }
        score:{
            [key: string]: number
        }
        charScores: Array<{
            charKey: string
            score: number
        }>
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
        index: -Math.random(),
        source: '',
        lock: false,
        affnum: { cur: 0, md: 0, ma:0, se:0, tot: 0 },
        score: { 'life':0, 'attack':0, 'defend':0, 'critical':0, 'elementalMastery':0, 'recharge':0 },
        charScores: [] as Array<{ charKey: string, score: number }>,
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
    validate() {
        assert(this.rarity == 5, 'Only 5 star artifacts are supported')
        assert([3, 4].includes(this.minors.length), 'Invalid artifact: number of minors is not 3 or 4')
        assert(this.level >= 0 && this.level <= 20, 'Invalid artifact: invalid level')
        assert(this.level < 4 || this.minors.length == 4, 'Invalid artifact: number of minors is not 4')
    }
    updateAffnum(w: ArtifactScoreWeight) {
        // Refer to ./README.md for symbols and equations
        this.data.affnum = { cur: 0, md: 0, ma:0, se:0, tot: 0}
        let A: Set<string> = new Set(), Ac = new Set(ArtifactData.minorKeys), sum_w = 0
        Ac.delete(this.mainKey)
        for (let a of this.minors) {
            this.data.affnum.cur += w[a.key] * a.value / ArtifactData.minorStat[a.key].v 
            A.add(a.key)
            Ac.delete(a.key)
            sum_w += w[a.key]
        }
        //mainAffix depend minorAffix score
        let n = Math.ceil((20 - this.level) / 4) // n.o. upgrades
        if (this.minors.length == 3) {
            let nm = 0, dn = 0 // denominator and numerator
            Ac.forEach(akey => {
                nm += w[akey] * ArtifactData.minorStat[akey].p
                dn += ArtifactData.minorStat[akey].p
            })
            this.data.affnum.md += nm / dn * 1.7
            n--
        }
        this.data.score={ 'life':0, 'attack':0, 'defend':0, 'critical':0, 'elementalMastery':0, 'recharge':0 }
        for (let a of this.minors) {
            switch (a.key) {
                case "atkp":
                    this.data.score['attack'] += w[a.key] * (a.value / ArtifactData.minorStat[a.key].v + n * 0.85 / 4)
                    break
                case "atk":
                    this.data.score['attack'] += w[a.key] * (a.value / ArtifactData.minorStat[a.key].v + n * 0.85 / 4)
                    break
                case "hpp":
                    this.data.score['life'] += w[a.key] * (a.value / ArtifactData.minorStat[a.key].v + n * 0.85 / 4)
                    break
                case "hp":
                    this.data.score['life'] += w[a.key] * (a.value / ArtifactData.minorStat[a.key].v + n * 0.85 / 4)
                    break
                case "defp":
                    this.data.score['defend'] += w[a.key] * (a.value / ArtifactData.minorStat[a.key].v + n * 0.85 / 4)
                    break
                case "def":
                    this.data.score['defend'] += w[a.key] * (a.value / ArtifactData.minorStat[a.key].v + n * 0.85 / 4)
                    break
                case "em":
                    this.data.score['elementalMastery'] += w[a.key] * (a.value / ArtifactData.minorStat[a.key].v + n * 0.85 / 4)
                    break
                case "er":
                    this.data.score['recharge'] += w[a.key] * (a.value / ArtifactData.minorStat[a.key].v + n * 0.85 / 4)
                    break
                case "cr":
                    this.data.score['critical'] += w[a.key] * (a.value / ArtifactData.minorStat[a.key].v + n * 0.85 / 4)
                    break
                case "cd":
                    this.data.score['critical'] += w[a.key] * (a.value / ArtifactData.minorStat[a.key].v + n * 0.85 / 4)
                    break
            }
        }
        let maintag = this.mainKey
        switch(maintag){
            case 'atkp':
                this.data.affnum.md=this.data.score['critical']+this.data.score['attack']+this.data.score['elementalMastery']+this.data.score['recharge']
                break
            case 'defp':
                this.data.affnum.md=this.data.score['critical']+this.data.score['defend']+this.data.score['elementalMastery']+this.data.score['recharge']+w['defprop']*this.data.score['attack']
                break
            case 'hpp':
                this.data.affnum.md=this.data.score['critical']+this.data.score['life']+this.data.score['elementalMastery']+this.data.score['recharge']+w['hpprop']*this.data.score['attack']
                break
            default:
                let temp = Object.keys(this.data.score).sort((a,b) => this.data.score[b]-this.data.score[a])
                for(let key in temp){ 
                    if(temp[key]=='attack' || temp[key]=='defend' || temp[key]=='life'){
                        maintag=temp[key]
                        break
                    }
                }
                if (this.data.score[maintag]!=0){
                    switch(maintag){
                    case 'attack':
                        this.data.affnum.md=this.data.score['critical']+this.data.score['attack']+this.data.score['elementalMastery']+this.data.score['recharge']
                        break 
                    case 'defend':
                        this.data.affnum.md=this.data.score['critical']+this.data.score['defend']+this.data.score['elementalMastery']+this.data.score['recharge']+w['defprop']*this.data.score['attack']
                        break 
                    case 'life':
                        this.data.affnum.md=this.data.score['critical']+this.data.score['life']+this.data.score['elementalMastery']+this.data.score['recharge']+w['hpprop']*this.data.score['attack'] 
                        break 
                    }
                }      
                else{
                    this.data.affnum.md=this.data.score['critical']+this.data.score['elementalMastery']+this.data.score['recharge']
                }
            }

            //current
            this.data.score={'life':0,'attack':0,'defend':0,'critical':0,'elementalMastery':0,'recharge':0}
            for (let a of this.minors) {
            switch (a.key) {
                case "atkp":
                    this.data.score['attack'] += w[a.key] * (a.value / ArtifactData.minorStat[a.key].v)
                    break
                case "atk":
                    this.data.score['attack'] += w[a.key] * (a.value / ArtifactData.minorStat[a.key].v)
                    break
                case "hpp":
                    this.data.score['life'] += w[a.key] * (a.value / ArtifactData.minorStat[a.key].v)
                    break
                case "hp":
                    this.data.score['life'] += w[a.key] * (a.value / ArtifactData.minorStat[a.key].v)
                    break
                case "defp":
                    this.data.score['defend'] += w[a.key] * (a.value / ArtifactData.minorStat[a.key].v)
                    break
                case "def":
                    this.data.score['defend'] += w[a.key] * (a.value / ArtifactData.minorStat[a.key].v)
                    break
                case "em":
                    this.data.score['elementalMastery'] += w[a.key] * (a.value / ArtifactData.minorStat[a.key].v)
                    break
                case "er":
                    this.data.score['recharge'] += w[a.key] * (a.value / ArtifactData.minorStat[a.key].v)
                    break
                case "cr":
                    this.data.score['critical'] += w[a.key] * (a.value / ArtifactData.minorStat[a.key].v)
                    break
                case "cd":
                    this.data.score['critical'] += w[a.key] * (a.value / ArtifactData.minorStat[a.key].v)
                    break
            }
        }
        maintag = this.mainKey
        switch(maintag){
            case 'atkp':
                this.data.affnum.cur=this.data.score['critical']+this.data.score['attack']+this.data.score['elementalMastery']+this.data.score['recharge']
                break
            case 'defp':
                this.data.affnum.cur=this.data.score['critical']+this.data.score['defend']+this.data.score['elementalMastery']+this.data.score['recharge']+w['defprop']*this.data.score['attack']
                break
            case 'hpp':
                this.data.affnum.cur=this.data.score['critical']+this.data.score['life']+this.data.score['elementalMastery']+this.data.score['recharge']+w['hpprop']*this.data.score['attack']
                break
            default:
                let temp = Object.keys(this.data.score).sort((a,b) => this.data.score[b]-this.data.score[a])
                for(var key in temp){
                    if(temp[key]=='attack' || temp[key]=='defend' || temp[key]=='life'){
                        maintag=temp[key]
                        break
                    }
                }
                if (this.data.score[maintag]!=0){
                    switch(maintag){
                    case 'attack':
                        this.data.affnum.cur=this.data.score['critical']+this.data.score['attack']+this.data.score['elementalMastery']+this.data.score['recharge']
                        break
                    case 'defend':
                        this.data.affnum.cur=this.data.score['critical']+this.data.score['defend']+this.data.score['elementalMastery']+this.data.score['recharge']+w['defprop']*this.data.score['attack']
                        this.data.affnum.ma=this.data.affnum.ma - w['main'] * 0.5
                        break
                    case 'life':
                        this.data.affnum.cur=this.data.score['critical']+this.data.score['life']+this.data.score['elementalMastery']+this.data.score['recharge']+w['hpprop']*this.data.score['attack'] 
                        this.data.affnum.ma=this.data.affnum.ma - w['main'] * 0.5
                        break
                    }
                }
                else{
                    this.data.affnum.cur=this.data.score['critical']+this.data.score['elementalMastery']+this.data.score['recharge']
                }
        }
        //total score
        this.data.affnum.ma = this.data.affnum.ma + w['main'] * ArtifactData.mainWeight[this.slot][this.mainKey].p / ArtifactData.mainWeight[this.slot][this.mainKey].v
        if(this.mainKey!='atk' && this.mainKey!='hp'){
            if(setweight[this.slot][this.mainKey][this.set]<0){
                this.data.affnum.se = 0.25 * w['set'] * setweight[this.slot][this.mainKey][this.set]
            }else{
                this.data.affnum.se = w['set'] * setweight[this.slot][this.mainKey][this.set]
            }
            if(this.mainKey!='atkp' && this.mainKey!='hpp'&& this.mainKey!='defp'&& this.mainKey!='cr'&& this.mainKey!='cd'){
                this.data.affnum.se = 2 * this.data.affnum.se
            }
        }else{switch(maintag){
            case 'attack':
                if(setweight['minor']['atkp'][this.set]<0){
                    this.data.affnum.se = 0.25 * w['set'] * setweight['minor']['atkp'][this.set]
                }else{
                    this.data.affnum.se = w['set'] * setweight['minor']['atkp'][this.set]
                }
                break
            case 'defend':
                if(setweight['minor']['defp'][this.set]<0){
                    this.data.affnum.se = 0.25 * w['set'] * setweight['minor']['defp'][this.set]
                }else{
                    this.data.affnum.se = w['set'] * setweight['minor']['defp'][this.set]
                }
                break 
            case 'life':
                if(setweight['minor']['hpp'][this.set]<0){
                    this.data.affnum.se = 0.25 * w['set'] * setweight['minor']['hpp'][this.set]
                }else{
                    this.data.affnum.se = w['set'] * setweight['minor']['hpp'][this.set]
                }
                break 
            }
        }
        this.data.affnum.tot = this.data.affnum.md + this.data.affnum.ma + this.data.affnum.se
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
    updateProp(charKeys: string[]) {
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
            let n_set = 2
            if (CharacterData[charKey].build.set[4].includes(this.set)) {
                n_set = 1
            } else if (CharacterData[charKey].build.set[2].includes(this.set)) {
                n_set = 1
            }
            // get score
            let charweight = []
            for (let p of CharacterData[charKey].presets) {
                    charweight.push(preset.presets[p])
            }
            let scorearr = []
            for (let w of charweight){
                let affnum = AffnumCache.get(w)
                let distr = AffnumDistrCache.get({ main: this.mainKey, weight: w })
                scorearr.push(ScoreCache.get(w, { slot: this.slot, main: this.mainKey, distr, affnum }) ** n_set)
            }
            let score=Math.max.apply(null,scorearr)
            // update
            if (score > 0.001){
                this.data.charScores.push({ charKey, score })
            }
        }
        this.data.charScores.sort((a, b) => b.score - a.score)
        if(this.data.charScores.length==0){
            this.data.charScores.push({charKey:'',score:0})
        }
        else if(this.data.charScores.length>10){
            this.data.charScores=this.data.charScores.slice(0,10)
        }
    }
    updatePresetProp(b: IBuild,charKey: string, w: IWeight) {
        this.data.charScores = []
        if (!b.main[this.slot].includes(this.mainKey)){
            this.data.charScores.push({charKey:charKey,score:0})
            return
        }
        let n_set = 2
        if (b.set[4].includes(this.set)) {
            n_set = 1
        } else if (b.set[2].includes(this.set)) {
            n_set = 1
        }
        let affnum = Math.round(this.getAvgAffnum(w) * 10)
        let distr = AffnumDistrCache.get({ main: this.mainKey, weight: w })
        let p = ArtifactData.mainDistr[this.slot][this.mainKey] / 5
        let x = affnum >= distr.length ? 1 : distr[affnum]
        let prop=(p * x + 1 - p) ** n_set
        this.data.charScores.push({charKey:charKey,score:prop})
    }
    updatePresetTot(b: IBuild) {
        this.data.affnum.ma=0
        this.data.affnum.se=0
        this.data.affnum.tot=0
        if (b.main[this.slot].includes(this.mainKey))
            if(this.mainKey=='atk' || this.mainKey=='hp'){
                this.data.affnum.ma = 6
            }else{
                this.data.affnum.ma = 8
        }
        if (b.set[4].includes(this.set)) {
            this.data.affnum.se = 4
        } else if (b.set[2].includes(this.set)) {
            this.data.affnum.se = 2
        }
        this.data.affnum.tot = this.data.affnum.md + this.data.affnum.ma + this.data.affnum.se
    }
}