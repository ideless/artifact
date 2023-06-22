<script lang="ts" setup>
import { useArtifactStore } from "@/store";
import { computed, ref, watch } from "vue";
import { Artifact } from "@/ys/artifact";
import { IDefeatResult } from "@/ys/sort";
import ArtifactList from "@/components/widgets/ArtifactList.vue";

const props = defineProps<{
    modelValue: boolean;
    art?: Artifact;
}>();
const emit = defineEmits<{
    (e: "update:modelValue", value: boolean): void;
}>();

const show = computed<boolean>({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit("update:modelValue", value);
    },
});

const artStore = useArtifactStore();

// 列表
const defeatByList = ref<Artifact[]>([]);
const updDefeatByList = () => {
    /* update defeatByList according sort results */
    if (!props.art) return false;
    if (!artStore.sortResults) return false;
    if (artStore.sortResultType != "defeat") return false;
    const result = artStore.sortResults.get(props.art) as IDefeatResult;
    if (!result) return false;
    defeatByList.value = result.by;
    return true;
};

watch(
    () => props.modelValue,
    (value) => {
        if (!value) return;
        if (!updDefeatByList()) {
            show.value = false;
        }
    }
);
</script>

<template>
    <el-dialog :title="$t('ui.defeat_list_title')" v-model="show" top="8vh">
        <p
            class="small-title"
            v-text="$t('ui.defeat_count', { count: defeatByList.length })"
        />
        <artifact-list :arts="defeatByList" />
    </el-dialog>
</template>

<style lang="scss" scoped>
.preview-artifact-list {
    display: flex;
    width: 100%;
    overflow: auto;
    margin-top: 10px;

    > * {
        margin: 5px;
        margin-bottom: 10px;
        zoom: 80%;
    }
}
</style>
