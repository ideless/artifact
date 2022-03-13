import { Artifact, ArtifactScoreWeight } from '../ys/artifact'
import { FilterBatchOne } from '../ys/artifactFilter'

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
    filterBatch: FilterBatchOne[]
    useFilterPro: boolean
    useFilterBatch: number
    weight: ArtifactScoreWeight,
    useWeightJson: boolean
    sortBy: string
    sortord: boolean
    canExport: boolean
    nReload: number
    loading: boolean
}
