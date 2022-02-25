import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { IState } from './types'
import chs from '../ys/locale/chs'
import data from '../ys/data'
import { Artifact } from '../ys/artifact'

function countArtifactAttr(artifacts: Artifact[], key: keyof Artifact) {
    let s: { [key: string]: number } = {}
    for (let a of artifacts) {
        let akey = a[key].toString()
        s[akey] = (akey in s) ? s[akey] + 1 : 1
    }
    return s
}

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
                lock: '', // '', 'true', 'false'
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
            weightInUse: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0.5, defp: 0, em: 0.5, er: 0.5, cr: 1, cd: 1 },
            weightJson: '{"hp":0,"atk":0,"def":0,"hpp":0,"atkp":0.5,"defp":0,"em":0.5,"er":0.5,"cr":1,"cd":1}',
            useWeightJson: false,
            sortBy: 'avg', // 'avg', 'min', 'max', 'cur'
            canExport: false,
            nReload: 0, // for UI refreshing
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
        weightInUse(state) {
            return state.useWeightJson ? JSON.parse(state.weightJson) : state.weight
        }
    },
    mutations: {
        useWeightJson(state, payload) {
            state.useWeightJson = payload.use
        },
        setWeightJson(state, payload) {
            state.weightJson = payload.json
        },
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
            if (state.useWeightJson) {
                state.weightJson = JSON.stringify(payload.weight)
            } else {
                state.weight = payload.weight
            }
        }
    },
    actions: {
        setArtifacts({ state, dispatch }, payload) {
            state.canExport = payload.format === 'GOOD'
            state.artifacts = payload.artifacts
            dispatch('updFilteredArtifacts')
        },
        updFilteredArtifacts({ state, getters }) {
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
            state.weightInUse = state.useWeightJson ? JSON.parse(state.weightJson) : { ...state.weight }
            // update affix numbers
            for (let a of ret) {
                a.updateAffnum(state.weightInUse)
            }
            // sort
            if (state.sortBy) { // sort in descending order of affix number
                ret.sort((a, b) => (b.data.affnum as any)[state.sortBy] - (a.data.affnum as any)[state.sortBy]);
            } else { // sort in ascending order of index
                ret.sort((a, b) => a.data.index - b.data.index)
            }
            // update
            state.filteredArtifacts = ret;
            state.nReload++
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
        }
    }
})

export function useStore() {
    return baseUseStore(key)
}