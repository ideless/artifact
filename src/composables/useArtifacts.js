import { ref, computed } from "vue"
import {
    currentAffixNumber,
    expectedAffixNumber,
    maximumAffixNumber,
    minimumAffixNumber,
} from "../ys/potential";
import { MainAffixes } from "../ys/stat";
import chs from "../locale/chs.json";

export default function () {
    const artifacts = ref([]);
    const filter = ref({
        set: "",
        type: "",
        mainAffix: "",
        lvRange: [0, 20],
    });
    const affixWeight = ref({
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
    });
    const orderBy = ref("expectedAffixNumber");
    const artifactsList = ref([]);
    const updateArtifactsList = async () => {
        let ret = artifacts.value;
        if (filter.value.set) {
            ret = ret.filter((a) => a.set == filter.value.set);
        }
        if (filter.value.type) {
            ret = ret.filter((a) => a.type == filter.value.type);
        }
        if (filter.value.mainAffix) {
            ret = ret.filter(
                (a) => a.mainAffix.key == filter.value.mainAffix
            );
        }
        ret = ret.filter((a) => {
            return (
                filter.value.lvRange[0] <= a.level &&
                a.level <= filter.value.lvRange[1]
            );
        });
        for (let a of artifacts.value) {
            a.data = {
                id: Math.random().toString(),
                currentAffixNumber: currentAffixNumber(a, affixWeight.value),
                expectedAffixNumber: expectedAffixNumber(a, affixWeight.value),
                minimumAffixNumber: minimumAffixNumber(a, affixWeight.value),
                maximumAffixNumber: maximumAffixNumber(a, affixWeight.value),
            };
        }
        ret.sort((a, b) => b.data[orderBy.value] - a.data[orderBy.value]);
        artifactsList.value = ret;
    };
    const affixName = (key) => {
        let name = chs.artifact.affix[key];
        if (["hpp", "atkp", "defp"].includes(key)) {
            name += "%";
        }
        return name;
    }
    const sets = computed(() => {
        let cnt = 0,
            s = {};
        for (let a of artifacts.value) {
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
                tip: cnt,
            },
        ];
        for (let key in chs.artifact.set) {
            if (key in s) {
                ret.push({
                    key,
                    value: chs.artifact.set[key].name,
                    tip: s[key],
                });
            }
        }
        return ret;
    })
    const types = computed(() => {
        let ret = [
            {
                key: "",
                value: "全部",
                tip: "",
            },
        ];
        for (let key in chs.artifact.type) {
            ret.push({
                key,
                value: chs.artifact.type[key],
                tip: "",
            });
        }
        return ret;
    })
    const mainAffixes = computed(() => {
        let l = filter.value.type
            ? MainAffixes[filter.value.type]
            : MainAffixes.all;
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
                value: affixName(key),
                tip: "",
            });
        }
        return ret;
    })
    return {
        artifacts,
        affixWeight,
        filter,
        orderBy,
        artifactsList,
        updateArtifactsList,
        affixName,
        sets,
        types,
        mainAffixes,
    };
}