import { Affix, Artifact } from "@/ys/artifact";
import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { useUiStore } from "./uiStore";
import { AffnumSort, PBuildSort, DefeatSort } from "@/ys/sort";
import type {
    IBuild,
    ISetBonusTable,
    IAffixWeightTable,
    IAffnumResults,
    IPBuildResults,
    IDefeatResults,
} from "@/ys/types";
import filterRules from "../filterRules";
import { useLocalStorage } from "@vueuse/core";
import {
    ArtifactData,
    CharacterData,
    DefaultAffixWeightTable,
    DefaultSetBonusTable,
} from "@/ys/data";
import { i18n } from "@/i18n";
import { isSame } from "../utils";

function isCustomizedBuild(b: IBuild) {
    if (!(b.key in CharacterData)) return true;

    let c = CharacterData[b.key].build;
    if (!isSame(b.set, c.set)) return true;
    if (!isSame(b.main.sands, c.main.sands)) return true;
    if (!isSame(b.main.goblet, c.main.goblet)) return true;
    if (!isSame(b.main.circlet, c.main.circlet)) return true;
    if (!isSame(b.weight, c.weight)) return true;

    return false;
}

export type ISortBy =
    | "avg"
    | "avgpro"
    | "psingle"
    | "pmulti"
    | "defeat"
    | "set"
    | "index";
export type ISortResultType = "affnum" | "pbuild" | "defeat";

export const useArtifactStore = defineStore("artifact", () => {
    const uiStore = useUiStore();

    const artifacts = ref<Artifact[]>([]);
    const processedArtifacts = ref<Artifact[]>([]);
    const filter = reactive({
        set: [] as string[],
        slot: [] as string[],
        main: [] as string[],
        lock: [] as string[],
        lvRange: [0, 20],
        pro: false,
        location: [] as string[],
        ruleId: 0,
    });
    const sort = useLocalStorage("sort", {
        by: "avg" as ISortBy,
        weight: {
            hp: 0,
            atk: 0,
            def: 0,
            hpp: 0,
            atkp: 0.5,
            defp: 0,
            em: 0.5,
            er: 0.5,
            cr: 1,
            cd: 1,
        },
        buildKeys: [] as string[],
        set: [] as string[],
        sands: [] as string[],
        goblet: [] as string[],
        circlet: [] as string[],
    });
    const customizedBuilds = useLocalStorage<IBuild[]>("customized_builds", []);
    const builds = computed(() => {
        let ret: IBuild[] = [];

        let cbuildMap = new Map<string, IBuild>();
        for (let b of customizedBuilds.value) {
            cbuildMap.set(b.key, b);
        }

        // default builds from data, some replaced by customized builds
        for (let key in CharacterData) {
            if (cbuildMap.has(key)) {
                ret.push(cbuildMap.get(key)!);
            } else {
                let c = CharacterData[key];
                ret.push({
                    key,
                    name: i18n.global.t(`character.${key}`),
                    set: [...c.build.set],
                    main: {
                        sands: [...c.build.main.sands],
                        goblet: [...c.build.main.goblet],
                        circlet: [...c.build.main.circlet],
                    },
                    weight: { ...c.build.weight },
                });
            }
        }

        // custom builds
        for (let b of customizedBuilds.value) {
            if (b.key.startsWith("0")) ret.push(b);
        }

        return ret;
    });
    const setBonusTable = useLocalStorage<ISetBonusTable>(
        "set_bonus_table",
        DefaultSetBonusTable
    );
    const affixWeightTable = useLocalStorage<IAffixWeightTable>(
        "affix_weight_table",
        DefaultAffixWeightTable
    );
    const sortResults = ref<IAffnumResults | IPBuildResults | IDefeatResults>();
    const sortResultType = ref<ISortResultType>();
    const canExport = ref(false);
    const artMode = reactive({
        normalize: false,
        reverseOrder: false,
        alikeEnabled: true,
    });
    const affnumMultiplierKey = useLocalStorage(
        "affnum_multiplier_key",
        "1/0.85"
    );
    const affnumMultiplier = computed(() => {
        switch (affnumMultiplierKey.value) {
            case "1":
                return 1;
            case "1/0.85":
                return 1 / 0.85;
            case "7.8":
                return 7.8;
            default:
                return 1;
        }
    });
    const nResetFilter = ref(0);

    /** set artifacts, filter & sort them automatically */
    function setArtifacts(_artifacts: Artifact[], _canExport: boolean) {
        artifacts.value = _artifacts;
        canExport.value = _canExport;
        nResetFilter.value++;
        filterAndSort();
    }

    /** filter and sort artifacts */
    function filterAndSort() {
        uiStore.run(() => {
            const arts: Artifact[] = [];
            // filter
            for (let a of artifacts.value) {
                if (!filter.set.includes(a.set)) continue;
                if (!filter.slot.includes(a.slot)) continue;
                if (!filter.main.includes(a.mainKey)) continue;
                if (!filter.lock.includes(a.lock.toString())) continue;
                if (a.level < filter.lvRange[0] || a.level > filter.lvRange[1])
                    continue;
                if (filter.pro && !filter.location.includes(a.location))
                    continue;
                if (filter.pro && !filterRules[filter.ruleId].accept(a))
                    continue;
                arts.push(a);
            }
            // sort
            switch (sort.value.by) {
                case "avg":
                    sortResults.value = AffnumSort.sort(arts, {}, [
                        {
                            set: "*",
                            type: "*",
                            label: "",
                            weight: sort.value.weight,
                        },
                    ]);
                    sortResultType.value = "affnum";
                    break;
                case "avgpro":
                    sortResults.value = AffnumSort.sort(
                        arts,
                        setBonusTable.value,
                        affixWeightTable.value
                    );
                    sortResultType.value = "affnum";
                    break;
                case "pmulti":
                    sortResults.value = PBuildSort.sort(
                        arts,
                        builds.value.filter((b) =>
                            sort.value.buildKeys.includes(b.key)
                        )
                    );
                    sortResultType.value = "pbuild";
                    break;
                case "psingle":
                    sortResults.value = PBuildSort.sort(arts, [
                        {
                            key: "",
                            name: "",
                            set: sort.value.set,
                            main: {
                                sands: sort.value.sands,
                                goblet: sort.value.goblet,
                                circlet: sort.value.circlet,
                            },
                            weight: sort.value.weight,
                        },
                    ]);
                    sortResultType.value = "pbuild";
                    break;
                case "defeat":
                    sortResults.value = DefeatSort.sort(arts);
                    sortResultType.value = "defeat";
                    break;
                case "set":
                    const setIndex: { [key: string]: number } = {};
                    ArtifactData.setKeys.forEach((key, i) => {
                        setIndex[key] = i;
                    });
                    arts.sort((a, b) => setIndex[a.set] - setIndex[b.set]);
                    sortResults.value = undefined;
                    sortResultType.value = undefined;
                    break;
                case "index":
                default:
                    arts.sort((a, b) => a.data.index - b.data.index);
                    sortResults.value = undefined;
                    sortResultType.value = undefined;
            }
            processedArtifacts.value = arts;
        });
    }

    /** add artifacts, filter and sort automatically */
    function addArtifacts(_artifacts: Artifact[]) {
        _artifacts.forEach((a) => artifacts.value.push(a));
        nResetFilter.value++;
        filterAndSort();
    }

    /** delete artifacts, filter and sort automatically */
    function delArtifacts(indices: number[]) {
        let indices_set = new Set(indices);
        // 在state.artifacts中删除
        let arts: Artifact[] = [];
        for (let a of artifacts.value) {
            if (!indices_set.has(a.data.index)) arts.push(a);
        }
        artifacts.value = arts;
        // 在state.artifacts中删除
        arts = [];
        for (let a of processedArtifacts.value) {
            if (!indices_set.has(a.data.index)) arts.push(a);
        }
        processedArtifacts.value = arts;
        // show reload
        uiStore.run(() => {});
    }

    /** update artifact, filter and sort automatically */
    function updArtifact(
        index: number,
        toSwap: boolean,
        newArt: {
            location: string;
            slot: string;
            level: number;
            minors: Affix[];
        }
    ) {
        for (let a of processedArtifacts.value) {
            if (a.data.index == index) {
                if (toSwap) {
                    for (let b of artifacts.value) {
                        if (
                            b.location == newArt.location &&
                            b.slot == newArt.slot
                        ) {
                            b.location = a.location;
                            break;
                        }
                    }
                }
                a.location = newArt.location;
                a.level = newArt.level;
                a.minors = newArt.minors;
                break;
            }
        }
        filterAndSort();
    }

    /** flip one lock */
    function flipLock(index: number) {
        for (let a of artifacts.value) {
            if (a.data.index == index) {
                a.lock = !a.lock;
                break;
            }
        }
    }

    /** set locks */
    function setLocks(indices: number[], lock: boolean) {
        let s = new Set(indices);
        for (let a of artifacts.value) {
            if (s.has(a.data.index)) {
                a.lock = lock;
            }
        }
    }

    return {
        artifacts,
        processedArtifacts,
        filter,
        sort,
        customizedBuilds,
        builds,
        setBonusTable,
        affixWeightTable,
        sortResults,
        sortResultType,
        canExport,
        artMode,
        affnumMultiplierKey,
        affnumMultiplier,
        nResetFilter,
        setArtifacts,
        filterAndSort,
        addArtifacts,
        delArtifacts,
        updArtifact,
        flipLock,
        setLocks,
    };
});
