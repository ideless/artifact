import { Artifact, ArtifactScoreWeight } from '../ys/artifact'
import { FilterBatchOne } from '../ys/artifactFilter'
import { IBuild } from '../ys/data/character'

export interface IOption {
    key: string
    label: string
    tip?: string
    icon?: string
}
export interface ICharOption {
    key: string
    tip?: string
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
        score: number[]
        pro: boolean
        location: string[]
        minorMustHave: string[]
        minorMustNotHave: string[]
    }
    filterBatch: FilterBatchOne[]
    useFilterBatch: number
    weight: ArtifactScoreWeight
    useWeightJson: boolean
    usePreset: string
    sort: {
        by: string
        characters: string[]
        build: IBuild
    }
    artMode: {
        [key: string]: any // allow string key
        showAffnum: boolean // 展示词条数而不是数值
        useMaxAsUnit: boolean // 用最大提升量作为1单位词条
    }
    // miscs
    canExport: boolean
    nReload: number
    loading: boolean
    nResetFilter: number
}
