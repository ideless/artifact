import { Artifact } from '../ys/artifact'
import { IBuild } from '../ys/build'

export interface IOption {
    key: string
    value: string
    tip: string
}

export interface IState {
    artifacts: Artifact[]
    filteredArtifacts: Artifact[]
    filter: {
        set: string
        slot: string
        main: string
        location: string
        lock: string
        lvRange: number[]
    }
    filterPro: {
        set: string[]
        slot: string[]
        main: string[]
        location: string[]
        lock: string[]
        lvRange: number[]
    }
    useFilterPro: boolean
    weight: {
        [key: string]: number
    },
    weightInUse: {
        [key: string]: number
    },
    build: IBuild
    useBuild: boolean
    sortBy: string
    canExport: boolean
    nReload: number
    loading: boolean
}
