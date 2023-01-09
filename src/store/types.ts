import { Artifact } from '../ys/artifact'
import { assign } from './utils'

export interface IOption {
    key: string | number
    label: string
    tip?: string
    icon?: string
}

export interface ICharOption {
    key: string
    name?: string
    tip?: string
}

export interface IYasConfig {
    max_row: number
    min_star: number
    min_level: number
    max_wait_switch_artifact: number
    default_stop: number
    lock_stop: number
    scroll_stop: number
    number: number
    speed: number
    max_wait_scroll: number
    no_check: boolean
    dxgcap: boolean
}

export class YasConfig implements IYasConfig {
    max_row = 1000
    min_star = 5
    min_level = 0
    max_wait_switch_artifact = 800
    default_stop = 500
    lock_stop = 100
    scroll_stop = 100
    number = 0
    speed = 5
    max_wait_scroll = 0
    no_check = false
    dxgcap = false

    constructor(o?: any) {
        assign(this, o)
    }
    toArgv() {
        let argv = []
        for (let key in this) {
            let arg = '--' + key.replaceAll('_', '-')
            if (typeof this[key] == 'boolean') {
                if (this[key]) {
                    argv.push(arg)
                }
            } else {
                argv.push(arg)
                argv.push(String(this[key]))
            }
        }
        return argv
    }
}

export interface IWeight {
    [key: string]: number
}

export interface IBuild {
    key: string
    name: string
    set: string[]
    main: {
        [slotKey: string]: string[]
    }
    weight: {
        [affixKey: string]: number
    }
}

export type IScoreAlg = 'sum' | 'max'

export interface IState {
    artifacts: Artifact[]
    filteredArtifacts: Artifact[]
    filter: {
        set: string[]
        slot: string[]
        main: string[]
        lock: string[]
        lvRange: number[]
        pro: boolean
        location: string[]
        ruleId: number
    }
    weight: IWeight
    weightInUse: IWeight
    sort: {
        by: string
        buildKeys: string[]
        scoreAlg: IScoreAlg
        sets: string[]
        sands: string[]
        goblet: string[]
        circlet: string[]
    }
    builds: IBuild[]
    artMode: {
        [key: string]: any // allow string key
        showAffnum: boolean // 展示词条数而不是数值
        useMaxAsUnit: boolean // 用最大提升量作为1单位词条
        reverseOrder: boolean // 倒序
        alikeEnabled: boolean // 联想
    }
    ws: {
        server?: WebSocket
        connected: boolean
    }
    yas: {
        version: string | null
        config: YasConfig
    }
    // miscs
    canExport: boolean
    nReload: number
    loading: boolean
    nResetFilter: number
}
