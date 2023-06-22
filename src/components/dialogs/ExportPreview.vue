<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { Artifact } from "@/ys/artifact";
import { useArtifactStore, useYasStore, useUiStore } from "@/store";
import ArtifactList from "@/components/widgets/ArtifactList.vue";

const props = defineProps<{
    modelValue: boolean;
}>();
const emit = defineEmits<{
    (e: "update:modelValue", value: boolean): void;
}>();

const artStore = useArtifactStore();
const yasStore = useYasStore();
const uiStore = useUiStore();

const show = computed<boolean>({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit("update:modelValue", value);
    },
});
// 预览
const artToLock = ref<Artifact[]>([]);
const artToUnlock = ref<Artifact[]>([]);
function exportable(a: Artifact) {
    return a.data.source == "yas-lock/good" || a.data.source == "pcap/good";
}
watch(
    () => props.modelValue,
    (value) => {
        if (!value) return;
        artToLock.value = [];
        artToUnlock.value = [];
        for (let a of artStore.artifacts) {
            if (!exportable(a)) continue;
            if (a.lock && !a.data.lock) artToLock.value.push(a);
            if (!a.lock && a.data.lock) artToUnlock.value.push(a);
        }
    }
);
// 导出
const remember = ref(true);
const useLockV2 = ref(false);
const exportValidation = ref(false);

const exportArts = () => {
    show.value = false;

    let flip_indices = [];
    let validation = [];
    for (let a of artStore.artifacts) {
        if (!exportable(a)) continue;
        validation.push({
            index: a.data.index,
            locked: a.data.lock,
        });
        if (a.lock != a.data.lock) {
            flip_indices.push(a.data.index);
            // 记住更改
            if (remember.value || yasStore.connected) {
                a.data.lock = a.lock;
            }
        }
    }

    flip_indices.sort((a, b) => a - b);
    validation.sort((a, b) => a.index - b.index);

    if (useLockV2.value) {
        const dataV2 = {
            version: 2,
            flip_indices,
            lock_indices: [],
            unlock_indices: [],
            validation,
        };
        if (yasStore.connected) {
            yasStore.sendLockReq({
                lock_json: JSON.stringify(dataV2),
            });
        } else {
            uiStore.exportFile("lock.json", JSON.stringify(dataV2));
        }
    } else {
        if (yasStore.connected) {
            yasStore.sendLockReq({
                indices: flip_indices,
            });
        } else {
            uiStore.exportFile("lock.json", JSON.stringify(flip_indices));
        }
    }
};
</script>

<template>
    <el-dialog :title="$t('ui.export_preview_title')" v-model="show" top="8vh">
        <p v-html="$t('ui.export_help')" />
        <div
            class="small-title"
            style="margin-top: 10px"
            v-text="$t('ui.arts_to_lock', { count: artToLock.length })"
        />
        <artifact-list :arts="artToLock" />
        <div
            class="small-title"
            style="margin-top: 10px"
            v-text="$t('ui.arts_to_unlock', { count: artToUnlock.length })"
        />
        <artifact-list :arts="artToUnlock" />
        <div style="margin-top: 10px" v-show="!yasStore.connected">
            <el-checkbox v-model="remember">{{
                $t("ui.remember_lock_change")
            }}</el-checkbox>
            <br />
            <el-checkbox v-model="useLockV2">{{
                $t("ui.use_lock_v2")
            }}</el-checkbox>
            <el-checkbox v-model="exportValidation" :disabled="!useLockV2">{{
                $t("ui.export_lock_validation")
            }}</el-checkbox>
        </div>
        <div style="margin-top: 10px; text-align: center">
            <el-button
                type="primary"
                @click="exportArts"
                v-text="$t('ui.export')"
            />
        </div>
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
