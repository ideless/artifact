import { Artifact } from '../ys/artifact'

export interface IOption {
    key: string
    label: string
    tip?: string
    icon?: string
}

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
        minorMustHave: string[]
        minorMustNotHave: string[]
    }
    weight: {
        [key: string]: number
    }
    weightInUse: {
        [key: string]: number
    }
    sort: {
        by: string
        characters: string[]
        sets: string[]
        sands: string[]
        goblet: string[]
        circlet: string[]
    }
    //
    canExport: boolean
    nReload: number
    loading: boolean
    nResetFilter: number
}
