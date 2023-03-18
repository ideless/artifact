<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { Artifact } from "@/ys/artifact";
import { useArtifactStore, useYasStore, useUiStore } from "@/store";
import ArtifactCard from "@/components/widgets/ArtifactCard.vue";

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
const artToLockShowCount = ref(0);
const loadArtToLock = () => {
    // console.log('load art to lock')
    if (artToLockShowCount.value < artToLock.value.length) {
        artToLockShowCount.value = Math.min(
            artToLock.value.length,
            artToLockShowCount.value + 10
        );
    }
};
const loadArtToLockDisabled = computed(
    () => artToLockShowCount.value >= artToLock.value.length
);
const artToUnlock = ref<Artifact[]>([]);
const artToUnlockShowCount = ref(0);
const loadArtToUnlock = () => {
    // console.log('load art to unlock')
    if (artToUnlockShowCount.value < artToUnlock.value.length) {
        artToUnlockShowCount.value = Math.min(
            artToUnlock.value.length,
            artToUnlockShowCount.value + 10
        );
    }
};
const loadArtToUnlockDisabled = computed(
    () => artToUnlockShowCount.value >= artToUnlock.value.length
);
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
        artToLockShowCount.value = Math.min(artToLock.value.length, 10);
        artToUnlockShowCount.value = Math.min(artToUnlock.value.length, 10);
        // console.log(artToLockShowCount.value, artToUnlockShowCount.value)
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
        <div
            class="preview-artifact-list"
            v-infinite-scroll="loadArtToLock"
            :infinite-scroll-immediate="false"
            :infinite-scroll-disabled="loadArtToLockDisabled"
        >
            <artifact-card
                v-for="i in artToLockShowCount"
                :artifact="artToLock[i - 1]"
                :key="artToLock[i - 1].data.index"
                :readonly="true"
            />
        </div>
        <div
            class="small-title"
            style="margin-top: 10px"
            v-text="$t('ui.arts_to_unlock', { count: artToUnlock.length })"
        />
        <div
            class="preview-artifact-list"
            v-infinite-scroll="loadArtToUnlock"
            :infinite-scroll-immediate="false"
            :infinite-scroll-disabled="loadArtToUnlockDisabled"
        >
            <artifact-card
                v-for="i in artToUnlockShowCount"
                :artifact="artToUnlock[i - 1]"
                :key="artToUnlock[i - 1].data.index"
                :readonly="true"
            />
        </div>
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
