import { argmax, argmin, assert } from "./utils"
import data from "./data"
import setweight from "./distr"

interface IAffix {
    key: string
    value: number
}

export class ArtifactScoreWeight {
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
            let v = this.value / data.minorStat[this.key].v / 0.85
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
    main: Affix
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
            md: number
            ma: number
            se: number
            tot: number
        }
        score:{
            [key: string]: number
        }
    }
}

export class Artifact implements IArtifact {
    set = ''
    slot = ''
    rarity = 0
    level = 0
    lock = false
    location = ''
    main = new Affix()
    minors: Affix[] = []
    data = {
        index: -Math.random(),
        source: '',
        affnum: { cur: 0, avg: 0, min: 0, max: 0, md: 0, ma:0, se:0, tot: 0 },
        score: { 'life':0, 'attack':0, 'defend':0, 'critical':0, 'elementalMastery':0, 'recharge':0 },
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
    updateAffnum(w: ArtifactScoreWeight) {
        // Refer to ./README.md for symbols and equations
        this.data.affnum = { cur: 0, avg: 0, min: 0, max: 0, md: 0, ma:0, se:0, tot: 0}
        let A: Set<string> = new Set(), Ac = new Set(data.minorKeys), sum_w = 0
        Ac.delete(this.main.key)
        for (let a of this.minors) {
            this.data.affnum.cur += w[a.key] * a.value / data.minorStat[a.key].v 
            A.add(a.key)
            Ac.delete(a.key)
            sum_w += w[a.key]
        }
        //mainAffix depend minorAffix score
        let n = Math.ceil((20 - this.level) / 4) // n.o. upgrades
        if (this.minors.length == 3) {
            let nm = 0, dn = 0
            Ac.forEach(akey => {
                nm += w[akey] * data.minorStat[akey].p
                dn += data.minorStat[akey].p
            })
            this.data.affnum.md += nm / dn * 1.7
            n--
        }
        this.data.score={ 'life':0, 'attack':0, 'defend':0, 'critical':0, 'elementalMastery':0, 'recharge':0 }
        for (let a of this.minors) {
            switch (a.key) {
                case "atkp":
                    this.data.score['attack'] += w[a.key] * (a.value / data.minorStat[a.key].v + n * 0.85 / 4)
                    break
                case "atk":
                    this.data.score['attack'] += w[a.key] * (a.value / data.minorStat[a.key].v + n * 0.85 / 4)
                    break
                case "hpp":
                    this.data.score['life'] += w[a.key] * (a.value / data.minorStat[a.key].v + n * 0.85 / 4)
                    break
                case "hp":
                    this.data.score['life'] += w[a.key] * (a.value / data.minorStat[a.key].v + n * 0.85 / 4)
                    break
                case "defp":
                    this.data.score['defend'] += w[a.key] * (a.value / data.minorStat[a.key].v + n * 0.85 / 4)
                    break
                case "def":
                    this.data.score['defend'] += w[a.key] * (a.value / data.minorStat[a.key].v + n * 0.85 / 4)
                    break
                case "em":
                    this.data.score['elementalMastery'] += w[a.key] * (a.value / data.minorStat[a.key].v + n * 0.85 / 4)
                    break
                case "er":
                    this.data.score['recharge'] += w[a.key] * (a.value / data.minorStat[a.key].v + n * 0.85 / 4)
                    break
                case "cr":
                    this.data.score['critical'] += w[a.key] * (a.value / data.minorStat[a.key].v + n * 0.85 / 4)
                    break
                case "cd":
                    this.data.score['critical'] += w[a.key] * (a.value / data.minorStat[a.key].v + n * 0.85 / 4)
                    break
            }
        }
        let maintag = this.main.key
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
                    this.data.score['attack'] += w[a.key] * (a.value / data.minorStat[a.key].v)
                    break
                case "atk":
                    this.data.score['attack'] += w[a.key] * (a.value / data.minorStat[a.key].v)
                    break
                case "hpp":
                    this.data.score['life'] += w[a.key] * (a.value / data.minorStat[a.key].v)
                    break
                case "hp":
                    this.data.score['life'] += w[a.key] * (a.value / data.minorStat[a.key].v)
                    break
                case "defp":
                    this.data.score['defend'] += w[a.key] * (a.value / data.minorStat[a.key].v)
                    break
                case "def":
                    this.data.score['defend'] += w[a.key] * (a.value / data.minorStat[a.key].v)
                    break
                case "em":
                    this.data.score['elementalMastery'] += w[a.key] * (a.value / data.minorStat[a.key].v)
                    break
                case "er":
                    this.data.score['recharge'] += w[a.key] * (a.value / data.minorStat[a.key].v)
                    break
                case "cr":
                    this.data.score['critical'] += w[a.key] * (a.value / data.minorStat[a.key].v)
                    break
                case "cd":
                    this.data.score['critical'] += w[a.key] * (a.value / data.minorStat[a.key].v)
                    break
            }
        }
        maintag = this.main.key
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
        this.data.affnum.ma = this.data.affnum.ma + w['main'] * data.mainWeight[this.slot][this.main.key].p / data.mainWeight[this.slot][this.main.key].v
        if(this.main.key!='atk' && this.main.key!='hp'){
            if(setweight[this.slot][this.main.key][this.set]<0){
                this.data.affnum.se = 0.25 * w['set'] * setweight[this.slot][this.main.key][this.set]
            }else{
                this.data.affnum.se = w['set'] * setweight[this.slot][this.main.key][this.set]
            }
            if(this.main.key!='atkp' && this.main.key!='hpp'&& this.main.key!='defp'&& this.main.key!='cr'&& this.main.key!='cd'){
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
}