import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { IState } from './types'
import chs from '../ys/locale/chs'
import data from '../ys/data'
import { Artifact } from '../ys/artifact'
import build from '../ys/build'

function countArtifactAttr(artifacts: Artifact[], key: keyof Artifact) {
    let s: { [key: string]: number } = {}
    for (let a of artifacts) {
        let akey = a[key].toString()
        s[akey] = (akey in s) ? s[akey] + 1 : 1
    }
    return s
}

const LOADING_DELAY = 250

export const key: InjectionKey<Store<IState>> = Symbol()

export const store = createStore<IState>({
    state: () => {
        let set = [], slot = [], main = [], location = ['']
        for (let key in chs.set) set.push(key)
        for (let key in chs.slot) slot.push(key)
        for (let key of data.mainKeys.all) main.push(key)
        for (let key in chs.character) location.push(key)
        return {
            artifacts: [],
            filteredArtifacts: [],
            filter: {
                set: '',
                slot: '',
                main: '', // mainKey should be better...
                location: 'all', // 'all' is a temporary workaround, fix it later
                lock: '', // '', 'true', 'false' ('' stands for both 'true' and 'false')
                lvRange: [0, 20],
            },
            filterPro: {
                set,
                slot,
                main,
                location,
                lock: ['true', 'false'],
                lvRange: [0, 20],
            },
            useFilterPro: false,
            weight: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0.5, defp: 0, em: 0.5, er: 0.5, cr: 1, cd: 1 },
            weightInUse: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0.5, defp: 0, em: 0.5, er: 0.5, cr: 1, cd: 1 }, // weight的快照，仅在updFilteredArtifacts时修改
            build: {
                set: ["NoblesseOblige", "ShimenawasReminiscence", "GladiatorsFinale", "WanderersTroupe", "EmblemOfSeveredFate", "CrimsonWitchOfFlames"],
                main: {
                    flower: ["hp"],
                    plume: ["atk"],
                    sands: ["em", "er", "atkp"],
                    goblet: ["pyroDB"],
                    circlet: ["cr", "cd"]
                },
                weight: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0.5, defp: 0, em: 0.5, er: 0.5, cr: 1, cd: 1 }
            },
            useBuild: false,
            sortBy: 'avg', // 'avg', 'min', 'max', 'cur', 'score'
            canExport: false,
            nReload: 0, // for UI refreshing
            loading: false
        }
    },
    getters: {
        filterSets(state) {
            let ret = [{ key: "", value: "全部", tip: state.artifacts.length.toString() }],
                s = countArtifactAttr(state.artifacts, 'set')
            for (let key in chs.set) {
                if (key in s)
                    ret.push({ key, value: chs.set[key].name, tip: s[key].toString() });
            }
            return ret;
        },
        filterSlots(state) {
            let ret = [{ key: "", value: "全部", tip: state.artifacts.length.toString() }],
                s = countArtifactAttr(state.artifacts, 'slot')
            for (let key in chs.slot) {
                if (key in s)
                    ret.push({ key, value: chs.slot[key], tip: s[key].toString() });
            }
            return ret;
        },
        filterMains(state) {
            let ret = [{ key: "", value: "全部", tip: state.artifacts.length.toString() }],
                s = countArtifactAttr(state.artifacts, 'mainKey')
            for (let key of data.mainKeys.all) {
                if (key in s)
                    ret.push({ key, value: chs.affix[key], tip: s[key].toString() });
            }
            return ret;
        },
        filterLocations(state) {
            let ret = [{ key: "all", value: "全部", tip: state.artifacts.length.toString() }],
                s = countArtifactAttr(state.artifacts, 'location')
            if ('' in s) ret.push({ key: '', value: "闲置", tip: s[''].toString() })
            for (let key in chs.character) {
                if (key in s)
                    ret.push({ key, value: chs.character[key], tip: s[key].toString() })
            }
            return ret
        },
        filterLocks(state) {
            let ret = [{ key: "", value: "全部", tip: state.artifacts.length.toString() }],
                s = countArtifactAttr(state.artifacts, 'lock')
            if ('true' in s) ret.push({ key: 'true', value: '加锁', tip: s['true'].toString() })
            if ('false' in s) ret.push({ key: 'false', value: '解锁', tip: s['false'].toString() })
            return ret
        },
        filterProSets() {
            let sets = []
            for (let key in chs.set) {
                sets.push({ key, value: chs.set[key].name })
            }
            return sets
        },
        filterProSlots() {
            let slots = []
            for (let key in chs.slot) {
                slots.push({ key, value: chs.slot[key] })
            }
            return slots
        },
        filterProMains() {
            let mains = []
            for (let key of data.mainKeys.all) {
                mains.push({ key, value: chs.affix[key] })
            }
            return mains
        },
        filterProLocations() {
            let locations = [{ key: '', value: '闲置' }]
            for (let key in chs.character) {
                locations.push({ key, value: chs.character[key] })
            }
            return locations
        },
        filterProLocks() {
            return [
                { key: 'true', value: '加锁' },
                { key: 'false', value: '解锁' },
            ]
        },
    },
    mutations: {
        setWeight(state, payload) {
            state.weight[payload.key] = payload.value
        },
        useFilterPro(state, payload) {
            state.useFilterPro = payload.use
        },
        setFilter(state, payload) {
            (state.filter as any)[payload.key] = payload.value
        },
        setFilterPro(state, payload) {
            (state.filterPro as any)[payload.key] = payload.value
        },
        setSortBy(state, payload) {
            state.sortBy = payload.sort
        },
        flipLock(state, payload) {
            for (let a of state.artifacts) {
                if (a.data.index == payload.index) {
                    a.lock = !a.lock
                }
            }
        },
        setLock(state, payload) {
            let s: Set<number> = new Set(payload.indices)
            for (let a of state.artifacts) {
                if (s.has(a.data.index)) {
                    a.lock = payload.lock
                }
            }
        },
        usePreset(state, payload) {
            state.weight = payload.weight
        },
        useBuild(state, payload) {
            if (payload.charKey in build) {
                let b = build[payload.charKey]
                // 不要直接赋值
                state.build.set = [...b.set]
                state.build.main.sands = [...b.main.sands]
                state.build.main.goblet = [...b.main.goblet]
                state.build.main.circlet = [...b.main.circlet]
                state.build.weight = { ...b.weight }
            }
        },
        setUseBuild(state, payload) {
            state.useBuild = payload.use
        },
        setBuildWeight(state, payload) {
            state.build.weight[payload.key] = payload.value
        },
        setBuildSet(state, payload) {
            state.build.set = [...payload.set]
        },
        setBuildMain(state, payload) {
            state.build.main[payload.slot] = [...payload.keys]
        },
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
            state.canExport = payload.format === 'GOOD'
            state.artifacts = payload.artifacts
            dispatch('updFilteredArtifacts')
        },
        updFilteredArtifacts({ state }) {
            state.loading = true
            setTimeout(() => {
                let ret = state.artifacts
                // filter
                if (!state.useFilterPro) { // basic filter
                    if (state.filter.set)
                        ret = ret.filter(a => a.set == state.filter.set);
                    if (state.filter.slot)
                        ret = ret.filter(a => a.slot == state.filter.slot);
                    if (state.filter.main)
                        ret = ret.filter(a => a.mainKey == state.filter.main);
                    if (state.filter.location != 'all')
                        ret = ret.filter(a => a.location == state.filter.location)
                    if (state.filter.lock)
                        ret = ret.filter(a => a.lock.toString() == state.filter.lock)
                    ret = ret.filter(a => (
                        state.filter.lvRange[0] <= a.level &&
                        a.level <= state.filter.lvRange[1]
                    ));
                } else { // filter pro
                    ret = ret.filter(a => state.filterPro.set.includes(a.set));
                    ret = ret.filter(a => state.filterPro.slot.includes(a.slot));
                    ret = ret.filter(a => state.filterPro.main.includes(a.mainKey));
                    ret = ret.filter(a => state.filterPro.location.includes(a.location))
                    ret = ret.filter(a => state.filterPro.lock.includes(a.lock.toString()))
                    ret = ret.filter(a => (
                        state.filterPro.lvRange[0] <= a.level &&
                        a.level <= state.filterPro.lvRange[1]
                    ));
                }
                // weight
                state.weightInUse = state.useBuild ? { ...state.build.weight } : { ...state.weight }
                // update affix numbers
                for (let a of ret) {
                    a.clear()
                    if (state.sortBy == 'score') {
                        if (state.useBuild) a.updateScoreSingle(state.build)
                        else a.updateScore()
                    }
                    a.updateAffnum(state.weightInUse)
                }
                // sort
                if (state.sortBy == 'score') { // sort in descending order of score
                    ret.sort((a, b) => b.data.score - a.data.score)
                } else if (state.sortBy == 'defeat') {
                    Artifact.sortByDefeat(ret)
                } else if (state.sortBy) { // sort in descending order of affix number
                    ret.sort((a, b) => (b.data.affnum as any)[state.sortBy] - (a.data.affnum as any)[state.sortBy]);
                } else { // sort in ascending order of index
                    ret.sort((a, b) => a.data.index - b.data.index)
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
            dispatch('updFilteredArtifacts') // 也许可以改为部分更新
        }
    }
})

export function useStore() {
    return baseUseStore(key)
}