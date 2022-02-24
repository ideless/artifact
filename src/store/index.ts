import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { Artifact } from '../ys/artifact'
import { IState } from './types'
import chs from '../ys/locale/chs'
import data from '../ys/data'

export const key: InjectionKey<Store<IState>> = Symbol()

export const store = createStore<IState>({
    state: () => {
        let set = [], slot = [], main = []
        for (let key in chs.set) set.push(key)
        for (let key in chs.slot) slot.push(key)
        for (let key of data.mainKeys.all) main.push(key)
        let ret = {
            artifacts: [],
            filteredArtifacts: [],
            filter: {
                set: '',
                slot: '',
                main: '',
                lvRange: [0, 20],
            },
            filterPro: {
                set,
                slot,
                main,
                lvRange: [0, 20],
                score: [0,20]
                
            },
            useFilterPro: false,
            weight: {
                hp: 0.3,
                atk: 0.5,
                def: 0.3,
                hpp: 1,
                atkp: 1,
                defp: 1,
                em: 1,
                er: 1,
                cr: 1.5,
                cd: 1.5,
                hpprop: 0.5,
                defprop : 0.5,
                main: 0.5,
            },
            //weightJson: '{"hp":0,"atk":0,"def":0,"hpp":0,"atkp":0.5,"defp":0,"em":0.5,"er":0.5,"cr":1,"cd":1}',
            useWeightJson: false,
            sortBy: 'tot',
            sortord:false,
            canExport: false,
            nReload: 0,
        }
        return ret
    },
    getters: {
        filterSets(state) {
            let cnt = 0,
                s: { [key: string]: number } = {};
            for (let a of state.artifacts) {
                cnt++;
                if (a.set in s) {
                    s[a.set]++;
                } else {
                    s[a.set] = 1;
                }
            }
            let ret = [
                {
                    key: "",
                    value: "全部",
                    tip: cnt.toString(),
                },
            ];
            for (let key in chs.set) {
                if (key in s) {
                    ret.push({
                        key,
                        value: chs.set[key].name,
                        tip: s[key].toString(),
                    });
                }
            }
            return ret;
        },
        filterSlots() {
            let ret = [
                {
                    key: "",
                    value: "全部",
                    tip: "",
                },
            ];
            for (let key in chs.slot) {
                ret.push({
                    key,
                    value: chs.slot[key],
                    tip: "",
                });
            }
            return ret;
        },
        filterMains(state) {
            let l: string[] = state.filter.slot
                ? (data.mainKeys as any)[state.filter.slot]
                : data.mainKeys.all;
            let ret = [
                {
                    key: "",
                    value: "全部",
                    tip: "",
                },
            ];
            for (let key of l) {
                ret.push({
                    key,
                    value: chs.affix[key],
                    tip: "",
                });
            }
            return ret;
        },
        filterProSets() {
            let sets = []
            for (let key in chs.set) {
                sets.push({
                    key,
                    value: chs.set[key].name
                })
            }
            return sets
        },
        filterProSlots() {
            let slots = []
            for (let key in chs.slot) {
                slots.push({
                    key,
                    value: chs.slot[key]
                })
            }
            return slots
        },
        filterProMains() {
            let mains = []
            for (let key of data.mainKeys.all) {
                mains.push({
                    key,
                    value: chs.affix[key]
                })
            }
            return mains
        },
    },
    mutations: {
        useWeightJson(state, payload) {
            state.useWeightJson = payload.use
        },
        // setWeightJson(state, payload) {
        //     state.weightJson = payload.json
        // },
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
        setSortOrder(state, payload) {
            state.sortord = payload.use
        },
        flipLock(state, payload) {
            for (let a of state.artifacts) {
                if (a.data.index == payload.index) {
                    a.data.lock = !a.data.lock
                }
            }
        },
        setLock(state, payload) {
            let s: Set<number> = new Set(payload.indices)
            for (let a of state.artifacts) {
                if (s.has(a.data.index)) {
                    a.data.lock = payload.lock
                }
            }
        },
        delete(state, payload) {          
            let s: Set<number> = new Set(payload.indices)
            let i = 0
            for (let a of state.artifacts) {
                if (s.has(a.data.index)) {
                    state.artifacts.splice(i,1)
                }
                i++
            }
            store.dispatch('updFilteredArtifacts')
        },
        // usePreset(state, payload) {
        //     if (state.useWeightJson) {
        //         state.weightJson = JSON.stringify(payload.weight)
        //     } else {
        //         state.weight = payload.weight
        //     }
        // }
        usePreset(state, payload) {
                state.weight = payload.weight
        }
    },
    actions: {
        setArtifacts({ state, dispatch }, payload) {
            state.canExport = payload.format === 'GOOD'
            state.artifacts = payload.artifacts
            dispatch('updFilteredArtifacts')
        },
        updFilteredArtifacts({ state }) {
            let ret = state.artifacts
            // filter
            if (!state.useFilterPro) { // basic filter
                if (state.filter.set) {
                    ret = ret.filter((a) => a.set == state.filter.set);
                }
                if (state.filter.slot) {
                    ret = ret.filter((a) => a.slot == state.filter.slot);
                }
                if (state.filter.main) {
                    ret = ret.filter(
                        (a) => a.main.key == state.filter.main
                    );
                }
                ret = ret.filter((a) => (
                    state.filter.lvRange[0] <= a.level &&
                    a.level <= state.filter.lvRange[1]
                ));
            } else { // filter pro
                ret = ret.filter((a) => state.filterPro.set.includes(a.set));
                ret = ret.filter((a) => state.filterPro.slot.includes(a.slot));
                ret = ret.filter((a) => state.filterPro.main.includes(a.main.key));
                ret = ret.filter((a) => (
                    state.filterPro.lvRange[0] <= a.level &&
                    a.level <= state.filterPro.lvRange[1]
                ));
                ret = ret.filter((a) => (
                    state.filterPro.score[0] <= a.data.affnum[state.sortBy] &&
                    a.data.affnum[state.sortBy] <= state.filterPro.score[1]
                ));
            }
            // weight
            //let weight = state.useWeightJson ? JSON.parse(state.weightJson) : state.weight
            let weight = state.weight
            // update affix numbers
            for (let a of ret) {
                a.updateAffnum(weight)
            }
            // sort
            if (state.sortBy) { // sort in descending order of affix number
                if(state.sortord){
                    ret.sort((a, b) => (a.data.affnum as any)[state.sortBy] - (b.data.affnum as any)[state.sortBy]);
                }
                else{
                    ret.sort((a, b) => (b.data.affnum as any)[state.sortBy] - (a.data.affnum as any)[state.sortBy]);
                }
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
                    a.set = payload.set
                    a.slot = payload.slot
                    a.main = payload.mainkey
                    a.level = payload.level
                    a.minors = payload.minors
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