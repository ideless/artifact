<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import ArtifactList from "@/components/widgets/ArtifactList.vue";
import { Artifact } from "@/ys/artifact";
import { useArtifactStore } from "@/store";
import { i18n } from "@/i18n";

const props = defineProps<{
    modelValue: boolean;
    art?: Artifact;
}>();
const emit = defineEmits<{
    (e: "update:modelValue", value: boolean): void;
}>();
const artStore = useArtifactStore();

const show = computed({
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value),
});

/* same type and same set artifacts */
const sameTypeSameSetList = computed(() => {
    if (!props.art) return [];
    const a = props.art;
    return [a].concat(
        artStore.artifacts.filter((b) => {
            return (
                a != b &&
                a.set == b.set &&
                a.slot == b.slot &&
                a.mainKey == b.mainKey
            );
        })
    );
});
const sameTypeSameSetTitle = computed(() => {
    if (!props.art) return i18n.global.t("ui.unknown");
    const a = props.art;
    return (
        i18n.global.t(`artifact.set.${a.set}`) +
        "·" +
        i18n.global.t(`artifact.type.${a.slot}_${a.mainKey}`) +
        i18n.global.t("ui.count_hint", {
            count: sameTypeSameSetList.value.length,
        })
    );
});

/* same type but different set artifacts */
const sameTypeDiffSetList = computed(() => {
    if (!props.art) return [];
    const a = props.art;
    return artStore.artifacts.filter((b) => {
        return (
            a != b &&
            a.set != b.set &&
            a.slot == b.slot &&
            a.mainKey == b.mainKey
        );
    });
});
const sameTypeDiffSetTitle = computed(() => {
    if (!props.art) return i18n.global.t("ui.unknown");
    const a = props.art;
    return (
        i18n.global.t("ui.other_sets") +
        "·" +
        i18n.global.t(`artifact.type.${a.slot}_${a.mainKey}`) +
        i18n.global.t("ui.count_hint", {
            count: sameTypeDiffSetList.value.length,
        })
    );
});

/* apply filter */
const checkAll = ref(false);
const isIndeterminate = ref(true);
const filterKeys = ["set", "slot", "mainKey", "lock", "location"] as const;
type FilterKey = (typeof filterKeys)[number];
const checkedKeys = ref<FilterKey[]>(["slot", "mainKey"]);

const filterLabel = (key: FilterKey) => {
    if (!props.art) {
        switch (key) {
            case "set":
                return i18n.global.t("ui.art_set");
            case "slot":
                return i18n.global.t("ui.art_slot");
            case "mainKey":
                return i18n.global.t("ui.art_main");
            case "lock":
                return i18n.global.t("ui.art_lock");
            case "location":
                return i18n.global.t("ui.art_location");
        }
    } else {
        switch (key) {
            case "set":
                return i18n.global.t("artifact.set." + props.art.set);
            case "slot":
                return i18n.global.t("artifact.slot." + props.art.slot);
            case "mainKey":
                return i18n.global.t("artifact.affix." + props.art.mainKey);
            case "lock":
                return props.art.lock
                    ? i18n.global.t("ui.locked")
                    : i18n.global.t("ui.unlocked");
            case "location":
                return props.art.location
                    ? i18n.global.t("character." + props.art.location)
                    : i18n.global.t("ui.unequiped");
        }
    }
    return i18n.global.t("ui.unknown");
};
const handleCheckAllChange = (val: boolean) => {
    checkedKeys.value = val ? [...filterKeys] : [];
    isIndeterminate.value = false;
};
const handleCheckedKeysChange = (value: string[]) => {
    const checkedCount = value.length;
    checkAll.value = checkedCount === filterKeys.length;
    isIndeterminate.value =
        checkedCount > 0 && checkedCount < filterKeys.length;
};
const applyFilter = () => {
    if (!props.art) return;
    artStore.resetFilter();
    for (let key of checkedKeys.value) {
        switch (key) {
            case "set":
                artStore.filter.set = [props.art.set];
                break;
            case "slot":
                artStore.filter.slot = [props.art.slot];
                break;
            case "mainKey":
                artStore.filter.main = [props.art.mainKey];
                break;
            case "lock":
                artStore.filter.lock = [String(props.art.lock)];
                break;
            case "location":
                artStore.filter.pro = true;
                artStore.filter.location = [props.art.location];
                break;
        }
    }
    artStore.filterAndSort();
    show.value = false;
};
</script>

<template>
    <el-dialog v-model="show" :title="$t('ui.quick_filter')">
        <div
            class="small-title"
            style="margin: 10px"
            v-text="sameTypeSameSetTitle"
        />
        <artifact-list :arts="sameTypeSameSetList" />
        <div
            class="small-title"
            style="margin: 10px"
            v-text="sameTypeDiffSetTitle"
        />
        <artifact-list :arts="sameTypeDiffSetList" />
        <div
            class="small-title"
            style="margin: 10px"
            v-text="$t('ui.quick_filter_apply')"
        />
        <div>
            <el-checkbox
                class="checkbox"
                v-model="checkAll"
                :indeterminate="isIndeterminate"
                @change="handleCheckAllChange"
            >
                {{ $t("ui.sel_all") }}
            </el-checkbox>
            <el-checkbox-group
                v-model="checkedKeys"
                @change="handleCheckedKeysChange"
            >
                <el-checkbox
                    class="checkbox"
                    v-for="key in filterKeys"
                    :key="key"
                    :label="key"
                >
                    {{ filterLabel(key) }}
                </el-checkbox>
            </el-checkbox-group>
        </div>
        <el-row align="center" justify="center" style="margin-top: 10px">
            <el-button
                type="primary"
                v-text="$t('ui.filter')"
                :disabled="checkedKeys.length == 0"
                @click="applyFilter"
            />
        </el-row>
    </el-dialog>
</template>

<style lang="scss" scoped>
.btn {
    margin: 0 10px;
}
.checkbox {
    margin: 0 10px;
}
</style>
