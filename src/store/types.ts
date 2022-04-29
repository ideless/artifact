import { Artifact, ArtifactScoreWeight } from '../ys/artifact'
import { FilterBatchOne } from '../ys/artifactFilter'
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
        score: number[]
    }
    build: IBuild
    filterBatch: FilterBatchOne[]
    useFilterPro: boolean
    useFilterBatch: number
    weight: ArtifactScoreWeight,
    useWeightJson: boolean
    usePreset: string
    sortBy: string
    canExport: boolean
    nReload: number
    loading: boolean
}
