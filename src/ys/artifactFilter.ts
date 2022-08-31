/**
 * 圣遗物过滤器
 *
 */
import { Artifact, Affix, ArtifactScoreWeight } from './artifact'
export enum SubFilterEquation {
    '<',
    '≤',
    '>',
    '≥',
    '=',
}
export class ScoreFilter {
    value: number = 0
    equation: SubFilterEquation = SubFilterEquation['≥']
    constructor (data?: any) {
        if (!data) return;
        for (const i in data)
            if (this.hasOwnProperty(i)) {
                // @ts-ignore
                this[i] = data[i];
            }
    }
    filter(value: number): boolean {
        const thisvalue = this.value;
        if (this.equation === SubFilterEquation['<']) return value < thisvalue
        if (this.equation === SubFilterEquation['≤']) return value <= thisvalue
        if (this.equation === SubFilterEquation['>']) return value > thisvalue
        if (this.equation === SubFilterEquation['≥']) return value >= thisvalue
        return value === thisvalue
    }
}
export class SubFilter {
    name: string = ''
    value: string = '0'
    equation: SubFilterEquation = SubFilterEquation['>']
    constructor (data?: any) {
        if (!data) return;
        for (const i in data)
            if (this.hasOwnProperty(i)) {
                // @ts-ignore
                this[i] = data[i];
            }
    }
    filterOne(input: Affix): number {
        if (this.name !== input.key) return 0
        // if ((input.value.indexOf('%') === -1) !== (this.value.indexOf('%') === -1)) return 0 // 一个有%一个没有，不同类
        const value = input.value;
        const thisvalue = parseFloat(this.value);
        if (this.equation === SubFilterEquation['<']) return value < thisvalue ? 1 : 0
        if (this.equation === SubFilterEquation['≤']) return value <= thisvalue ? 1 : 0
        if (this.equation === SubFilterEquation['>']) return value > thisvalue ? 1 : 0
        if (this.equation === SubFilterEquation['≥']) return value >= thisvalue ? 1 : 0
        // remain '='
        return value === thisvalue ? 1 : 0
    }
    filter(input: Affix[]): number {
        let res = 0
        for (const i of input) res += this.filterOne(i)
        return res
    }
}
export const scoreFilterNames = [
    ['cur', '当前分'],
    ['md', '期望分'],
    ['tot', '总分'],
]
export class ArtifactFilter {
    main: String[] = []
    stars: Number[] = []
    // level: Number[] = []
    level: number[] = [0, 20]
    // name: String[] = []
    set: String[] = []
    position: String[] = []
    lock: Boolean[] = []
    character: String[] = []
    static anyCharacter: string = 'anyCharacter'
    subCount: Number[] = []
    includeSub: SubFilter[] = []
    includeSubCount: number = 0
    excludeSub: SubFilter[] = []
    excludeSubCount: number = 0
    scoreFilters: {string?: ScoreFilter} = {}
    scoreWeight: ArtifactScoreWeight = new ArtifactScoreWeight()
    useRankFilter: boolean = false
    rankGroup = {
        main: false,
        set: false,
        position: false
    }
    rankAscend: boolean = false
    rankSelectNumber: number = 10
    rankReverseSelect: boolean = false
    rankScoreName: string = 'tot'

    constructor(datastr?: string) {
        for (let i = 0; i < scoreFilterNames.length; i ++ )
            this.scoreFilters[scoreFilterNames[i][0]] = new ScoreFilter()
        if (!datastr) return;
        this.loadFromJSON(datastr)
    }

    filterOneRule<T>(input: T, filter: T[]): boolean {
        if (filter.length === 0) return true
        return filter.indexOf(input) !== -1
    }
    filterSub(input: Affix[], filters: SubFilter[], targetCount: number, empty: boolean): boolean {
        if (filters.length === 0) return empty
        let matchCount = 0
        for (const filter of filters) matchCount += filter.filter(input)
        return targetCount <= matchCount
    }
    filterOne(artifact: Artifact): boolean {
        let inFilter = true
        inFilter &&= this.filterOneRule(artifact.mainKey, this.main)
        inFilter &&= this.filterOneRule(artifact.rarity, this.stars)
        let level = [] as Number[]
        for (let i = this.level[0] as number; i <= this.level[1]; i ++ )
            level.push(i)
        inFilter &&= this.filterOneRule(artifact.level, level)
        // inFilter &&= this.filterOne(artifact.name, this.name)
        // const [set, position] = ArtifactToSetPosition.get(artifact.name) || ['', '']
        const set = artifact.set;
        const position = artifact.slot;
        inFilter &&= this.filterOneRule(set, this.set)
        inFilter &&= this.filterOneRule(position, this.position)
        inFilter &&= this.filterOneRule(artifact.lock, this.lock)
        let character = this.character.slice()
        // if anyCharacter and artifact has location, add location into filter
        if (character.indexOf(ArtifactFilter.anyCharacter) > -1)
            if (artifact.location !== '')
                character.push(artifact.location)
        inFilter &&= this.filterOneRule(artifact.location, character)
        inFilter &&= this.filterOneRule(artifact.minors.length, this.subCount)
        for (const i in this.scoreFilters)
            inFilter &&= this.scoreFilters[i].filter(artifact.data.affnum[i])
        const subInclude = this.filterSub(artifact.minors, this.includeSub, this.includeSubCount, true)
        const subExclude = this.filterSub(artifact.minors, this.excludeSub, this.excludeSubCount + 1, false)
        inFilter = inFilter && subInclude && !subExclude
        return inFilter
    }
    genGroupName(artifact: Artifact) : string {
        let res = 'G'
        if (this.rankGroup.main) res += '_' + artifact.mainKey
        if (this.rankGroup.position) res += '_' + artifact.slot
        if (this.rankGroup.set) res += '_' + artifact.set
        return res
    }
    rankFilter(artifacts: Artifact[]) : number[] {
        let res = [] as number[]
        let groups = {}
        for (let i = 0; i < artifacts.length; i ++ ) {
            const groupname = this.genGroupName(artifacts[i])
            groups[groupname] = []
        }
        for (let i = 0; i < artifacts.length; i ++ ) {
            const groupname = this.genGroupName(artifacts[i])
            groups[groupname].push(i)
        }
        for (let gn in groups) {
            groups[gn].sort((i: number, j: number) => { 
                const diff = artifacts[i].data.affnum[this.rankScoreName] - artifacts[j].data.affnum[this.rankScoreName]
                return this.rankAscend ? diff : -diff
            })
            if (this.rankReverseSelect)
                for (let i = this.rankSelectNumber; i < groups[gn].length; i ++ )
                    res.push(groups[gn][i])
            else
                for (let i = 0; i < groups[gn].length; i ++ ) {
                    res.push(groups[gn][i])
                    if (i + 1 >= this.rankSelectNumber)
                        break
                }
        }
        return res
    }
    filter(artifacts: Artifact[]) : number[] {
        // input artifacts, output artifact indices filtered.
        let results = []
        let firstRound = []
        for (let i = 0; i < artifacts.length; i ++ )
            if (this.filterOne(artifacts[i])) {
                results.push(i)
                firstRound.push(artifacts[i])
            }
        if (! this.useRankFilter)
            return results
        let results2 = []
        const rankRes = this.rankFilter(firstRound)
        for (let i of rankRes)
            results2.push(results[i])
        return results2
    }
    loadFromJSON(str: string) {
        const data = JSON.parse(str);
        for (const i in data)
            if (this.hasOwnProperty(i))
                if (i === 'includeSub' || i === 'excludeSub') {
                    this[i] = [];
                    for (let j = 0; j < data[i].length; j ++ )
                        this[i].push(new SubFilter(data[i][j]));
                }
                else if (i === 'scoreFilters') {
                    for (const j in data[i])
                        if (this.scoreFilters.hasOwnProperty(j))
                            this.scoreFilters[j] = new ScoreFilter(data[i][j]);
                }
                else if (i === 'scoreWeight') {
                    this.setScoreWeight(data[i] as ArtifactScoreWeight)
                }
                else if (this.hasOwnProperty(i))
                    this[i] = data[i];
    }
    setScoreWeight(w: ArtifactScoreWeight) {
        for (const i in w)
            this.scoreWeight[i] = w[i]
    }
}

export class FilterBatchOne {
    comment: string = ''
    lock: string = 'disabled'
    showFilter: boolean = false
    filter: ArtifactFilter = new ArtifactFilter()
    constructor (data?: any) {
        this.loadFromJSON(data);
    }
    loadFromJSON(data?: any) {
        if (!data) return;
        this.filter.loadFromJSON(JSON.stringify(data.filter));
        this.comment = data.comment;
        this.lock = data.lock;
    }
}
