import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { ArtifactScoreWeight, Artifact } from '@/ys/artifact'
import { IState } from './types'
import CharacterData from "@/ys/data/character"

const LOADING_DELAY = 250
export const key: InjectionKey<Store<IState>> = Symbol()
export const store = createStore<IState>({
    state: () => {
        return {
            artifacts: [],
            filteredArtifacts: [],
            filter: {
                set: [],
                slot: [],
                main: [], // mainKey should be better
                lock: [],
                lvRange: [0, 20],
                score: [0, 20],
                pro: false,
                location: [],
                minorMustHave: [],
                minorMustNotHave: [],
            },
            filterBatch: [],
            useFilterPro: false,
            useFilterBatch: -1,  // -1 notwork, 0~length-1 select one
            weight: new ArtifactScoreWeight(),
            useWeightJson: false,
            usePreset: '',
            sort: {
                by: 'tot', // 'avg', 'min', 'max', 'cur', 'pmulti', 'psingle', 'defeat', 'index',
                characters: Object.keys(CharacterData),
                build: {
                    set: {
                        2: [],
                        4: []
                    },
                    main: {
                        flower: ['hp'],
                        plume: ['atk'],
                        sands: [],
                        goblet: [],
                        circlet: []
                    },
                },
            },
            artMode: {
                showAffnum: false,
                useMaxAsUnit: true,
            },
            canExport: false,
            nReload: 0,// for UI refreshing
            loading: false,
            nResetFilter: 0, // 更新filter
        }
    },
    getters: {
        
    },
    mutations: {
        useWeightJson(state, payload) {
            state.useWeightJson = payload.use
        },
        setWeight(state, payload) {
            state.weight[payload.key] = payload.value
        },
        setFilter(state, payload) {
            (state.filter as any)[payload.key] = payload.value
        },
        usePreset(state, payload) {
            state.weight = payload.weight
            state.sort.by = 'tot'
            state.usePreset = payload.charKey
            if (payload.charKey in CharacterData) {
                let b = CharacterData[payload.charKey].build
                // 不要直接赋值
                state.sort.build.set[4] = [...b.set[4]]
                state.sort.build.set[2] = [...b.set[2]]
                state.sort.build.main.sands = [...b.main.sands]
                state.sort.build.main.goblet = [...b.main.goblet]
                state.sort.build.main.circlet = [...b.main.circlet]
            }
        },
        setSort(state, payload) {
            (state.sort as any)[payload.key] = payload.value
        },
        filterBatchIndex(state, payload) {
            state.useFilterBatch = payload
            store.dispatch('updFilteredArtifacts')
        },
        setArtMode(state, payload) {
            for (let key in payload) {
                if (key in state.artMode) {
                    state.artMode[key] = payload[key]
                }
            }
        }
    },
    actions: {
        reload({ state }) {
            // 仅弹出加载界面
            state.loading = true
            setTimeout(() => {
                state.loading = false
                state.nReload++
            }, LOADING_DELAY)
        },
        setArtifacts({ state, dispatch }, payload) {
            state.canExport = payload.canExport
            state.artifacts = payload.artifacts
            state.nResetFilter++
            dispatch('updFilteredArtifacts')
        },
        setLockByFilterBatch({ state }) {
            // TODO two different lock, which is right?
            let newLock = [];
            for (let i = 0; i < state.artifacts.length; i++)
                newLock.push(state.artifacts[i].lock);
            if (state.filterBatch.length === 0) {
                ElNotification({
                    type: 'error',
                    title: '一条规则都没有！',
                })
                return;
            }
            for (let i = 0; i < state.filterBatch.length; i++) {
                let filter = state.filterBatch[i].filter;
                // let ruleResult = [];
                if (state.filterBatch[i].lock == 'disabled')
                    continue
                for (let a of state.artifacts) {
                    a.updateAffnum(filter.scoreWeight)
                }
                const filterRes = filter.filter(state.artifacts)
                for (const j of filterRes)
                    newLock[j] = state.filterBatch[i].lock == 'lock';
                // for (let j = 0; j < state.artifacts.length; j ++ )
                //     if (filter.filterOne(state.artifacts[j])) {
                //         // ruleResult.push(JSON.parse(JSON.stringify(state.artifacts[j])));
                //         newLock[j] = state.filterBatch[i].lock == 'lock';
                //     }
                // console.log(state.filterBatch[i], ruleResult);
            }
            for (let i = 0; i < state.artifacts.length; i++)
                state.artifacts[i].lock = newLock[i];
            ElNotification({
                type: 'success',
                title: '批量规则应用成功',
            })
        },
        updFilteredArtifacts({ state }) {
            state.loading = true
            setTimeout(() => {
                let ret = state.artifacts
                // weight
                let weight = state.weight
                if (state.useFilterBatch != -1) {
                    weight = state.filterBatch[state.useFilterBatch].filter.scoreWeight;
                }
                // update affix numbers
                for (let a of ret) {
                    a.updateAffnum(weight)
                    if(state.usePreset){
                        a.updatePresetTot(state.sort.build)
                        a.updatePresetProp(state.sort.build,state.usePreset,weight)
                    }
                    else if(state.sort.by == 'prop') {
                        a.updateProp(state.sort.characters)
                    }
                }
                if (state.useFilterBatch != -1) {
                    // use specified filterbatch
                    let filter = state.filterBatch[state.useFilterBatch].filter;
                    const filterRes = filter.filter(state.artifacts)
                    ret = []
                    for (const j of filterRes)
                        ret.push(state.artifacts[j])
                    ret = ret.filter(a => filter.filterOne(a));
                }
                else { // basic filter
                    ret = ret.filter(a => {
                        if (!state.filter.set.includes(a.set)) return false
                        if (!state.filter.slot.includes(a.slot)) return false
                        if (!state.filter.main.includes(a.mainKey)) return false
                        if (!state.filter.lock.includes(a.lock.toString())) return false
                        if (a.level < state.filter.lvRange[0] ||
                            state.filter.lvRange[1] < a.level) return false
                        return true
                    })
                    if (state.filter.pro) {
                        ret = ret.filter(a => {
                            if (!state.filter.location.includes(a.location)) return false
                            let minorKeys = a.minors.map(m => m.key)
                            for (let key of state.filter.minorMustHave)
                                if (!minorKeys.includes(key)) return false
                            for (let key of state.filter.minorMustNotHave)
                                if (minorKeys.includes(key)) return false
                            return true
                        })
                    }
                    if (state.sort.by) {//得分筛选
                        if (['presetprop', 'prop'].includes(state.sort.by)) {
                            ret = ret.filter((a) => (
                                state.filter.score[0] <= a.data.charScores[0].score &&
                                a.data.charScores[0].score <= state.filter.score[1]
                            ));
                        }else if(state.sort.by=='index') {
                            
                        } else {
                            ret = ret.filter((a) => (
                                state.filter.score[0] <= a.data.affnum[state.sort.by] &&
                                a.data.affnum[state.sort.by] <= state.filter.score[1]
                            ));
                        }
                    }
                }
                // sort
                if (['presetprop', 'prop'].includes(state.sort.by)) { // sort in descending order of charscore
                    ret.sort((a, b) => b.data.charScores[0].score - a.data.charScores[0].score)
                } else if (state.sort.by=='index') { // sort in descending order of index
                    ret.sort((a, b) => a.data.index - b.data.index)
                } else { // sort in ascending order of affix number
                    ret.sort((a, b) => (b.data.affnum as any)[state.sort.by] - (a.data.affnum as any)[state.sort.by]);
                }
                // update
                state.filteredArtifacts = ret;
                state.nReload++
                state.loading = false
            }, LOADING_DELAY)
        },
        updArtifact({ state, dispatch }, payload) {
            for (let a of state.filteredArtifacts) {
                if (a.data.index == payload.index) {
                    if (payload.toSwap) {
                        for (let b of state.artifacts) {
                            if (b.location == payload.newArt.location && b.slot == payload.newArt.slot) {
                                b.location = a.location
                                break
                            }
                        }
                    }
                    a.location = payload.newArt.location
                    a.level = payload.newArt.level
                    a.minors = payload.newArt.minors
                    break
                }
            }
            dispatch('updFilteredArtifacts')
        },
        delArtifacts({ state, dispatch }, payload) {
            let s: Set<number> = new Set(payload.indices)
            let i = 0
            for (let a of state.artifacts) {
                if (s.has(a.data.index)) {
                    state.artifacts.splice(i, 1)
                }
                i++
            }
            dispatch('updFilteredArtifacts') // 也许可以改为部分更新
        },
        addArtifacts({ state, dispatch }, payload) {
            // Array.concat貌似不好用，只能一个个push
            for (let a of payload.artifacts)
                state.artifacts.push(a)
            state.nResetFilter++
            dispatch('updFilteredArtifacts') // 也许可以改为部分更新
        },
        flipLock({ state }, payload) {
            for (let a of state.artifacts) {
                if (a.data.index == payload.index) {
                    a.lock = !a.lock
                    return
                }
            }
        },
        setLock({ state }, payload) {
            let s: Set<number> = new Set(payload.indices)
            for (let a of state.artifacts) {
                if (s.has(a.data.index)) {
                    a.lock = payload.lock
                }
            }
        },
    }
})

export function useStore() {
    return baseUseStore(key)
}