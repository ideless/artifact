import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { IState } from './types'
import { Artifact } from '@/ys/artifact'
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
                main: [],
                lock: [],
                lvRange: [0, 20],
                pro: false,
                location: [],
                minorMustHave: [],
                minorMustNotHave: [],
            },
            weight: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0.5, defp: 0, em: 0.5, er: 0.5, cr: 1, cd: 1 },
            weightInUse: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0.5, defp: 0, em: 0.5, er: 0.5, cr: 1, cd: 1 }, // weight的快照，仅在updFilteredArtifacts时修改
            sort: {
                by: 'avg', // 'avg', 'min', 'max', 'cur', 'pmulti', 'psingle', 'defeat', 'index',
                // pmulti
                characters: Object.keys(CharacterData),
                // psingle
                sets: ["NoblesseOblige", "ShimenawasReminiscence", "GladiatorsFinale", "WanderersTroupe", "EmblemOfSeveredFate", "CrimsonWitchOfFlames"],
                sands: ["em", "er", "atkp"],
                goblet: ["pyroDB"],
                circlet: ["cr", "cd"],
            },
            artMode: {
                showAffnum: false,
                useMaxAsUnit: false,
            },
            canExport: false,
            nReload: 0, // for UI refreshing
            loading: false,
            nResetFilter: 0, // 更新filter
        }
    },
    getters: {
    },
    mutations: {
        setFilter(state, payload) {
            (state.filter as any)[payload.key] = payload.value
        },
        setWeight(state, payload) {
            state.weight[payload.key] = payload.value
        },
        usePreset(state, payload) {
            state.weight = payload.weight
        },
        setSort(state, payload) {
            (state.sort as any)[payload.key] = payload.value
        },
        useBuild(state, payload) {
            if (payload.charKey in CharacterData) {
                let b = CharacterData[payload.charKey].build
                // 不要直接赋值
                state.sort.sets = [...b.set]
                state.sort.sands = [...b.main.sands]
                state.sort.goblet = [...b.main.goblet]
                state.sort.circlet = [...b.main.circlet]
                state.weight = { ...b.weight }
            }
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
        updFilteredArtifacts({ state }) {
            state.loading = true
            setTimeout(() => {
                let ret = state.artifacts
                // filter
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
                // weight
                state.weightInUse = { ...state.weight }
                // update affix numbers / score
                for (let a of ret) {
                    a.clear()
                    if (state.sort.by == 'psingle') {
                        a.updateScoreSingle({
                            set: state.sort.sets,
                            main: {
                                flower: ['hp'],
                                plume: ['atk'],
                                sands: state.sort.sands,
                                goblet: state.sort.goblet,
                                circlet: state.sort.circlet,
                            },
                            weight: state.weight
                        })
                    } else if (state.sort.by == 'pmulti') {
                        a.updateScore(state.sort.characters)
                    }
                    a.updateAffnum(state.weightInUse)
                }
                // sort
                if (['psingle', 'pmulti'].includes(state.sort.by)) { // sort in descending order of score
                    ret.sort((a, b) => b.data.score - a.data.score)
                } else if (state.sort.by == 'defeat') {
                    Artifact.sortByDefeat(ret)
                } else if (state.sort.by == 'index') { // sort in ascending order of index
                    ret.sort((a, b) => a.data.index - b.data.index)
                } else if (['cur', 'avg', 'min', 'max'].includes(state.sort.by)) { // sort in descending order of affix number
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
            dispatch('updFilteredArtifacts') // 也许可以改为部分更新
        },
        delArtifacts({ state, dispatch }, payload) {
            let indices = new Set(payload.indices)
            // 在state.artifacts中删除
            let artifacts: Artifact[] = []
            for (let a of state.artifacts) {
                if (!indices.has(a.data.index))
                    artifacts.push(a)
            }
            state.artifacts = artifacts
            // 在state.artifacts中删除
            let filteredArtifacts: Artifact[] = []
            for (let a of state.filteredArtifacts) {
                if (!indices.has(a.data.index))
                    filteredArtifacts.push(a)
            }
            state.filteredArtifacts = filteredArtifacts
            dispatch('reload')
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

