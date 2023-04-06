<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { Artifact } from "@/ys/artifact";
import { useArtifactStore } from "@/store";
import ArtifactCard from "@/components/widgets/ArtifactCard.vue";

const props = defineProps<{
    modelValue: boolean;
    index: number;
}>();
const emit = defineEmits<{
    (e: "update:modelValue", value: boolean): void;
}>();

const artStore = useArtifactStore();

const show = computed<boolean>({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit("update:modelValue", value);
    },
});
/* 相似圣遗物 */
const artAlike = ref<Artifact[]>([]);
const artAlikeShowCount = ref(0);
const loadArtAlike = () => {
    if (artAlikeShowCount.value < artAlike.value.length) {
        artAlikeShowCount.value = Math.min(
            artAlike.value.length,
            artAlikeShowCount.value + 10
        );
    }
};
const loadArtAlikeDisabled = computed(
    () => artAlikeShowCount.value >= artAlike.value.length
);
function isSubset(A: Set<any>, B: Set<any>) {
    for (let a of A) {
        if (!B.has(a)) {
            return false;
        }
    }
    return true;
}
let ignored = new Set(["hp", "atk", "def"]);
const updArtLike = () => {
    /* 获取目标圣遗物 */
    let target: Artifact | undefined = undefined;
    for (let a of artStore.artifacts) {
        if (a.data.index == props.index) {
            target = a;
            break;
        }
    }
    if (target == undefined) return false;
    targetLock.value = target.lock;
    let tm = new Set(
        target.minors.map((x) => x.key).filter((x) => !ignored.has(x))
    );
    /* 更新artAlike */
    artAlike.value = [];
    for (let a of artStore.artifacts) {
        if (a.data.index == props.index) continue;
        /* 部位、主词条不同或锁状态一样，不相似 */
        if (
            a.slot != target.slot ||
            a.mainKey != target.mainKey ||
            a.lock == target.lock
            // Math.floor(a.level / 4) > Math.floor(target.level / 4)
        ) {
            continue;
        }
        /* 忽略小攻/生/防 */
        let am = new Set(
            a.minors.map((x) => x.key).filter((x) => !ignored.has(x))
        );
        if (target.lock) {
            if (isSubset(tm, am)) {
                artAlike.value.push(a);
            }
        } else {
            if (isSubset(am, tm)) {
                artAlike.value.push(a);
            }
        }
    }
    artAlikeShowCount.value = Math.min(artAlike.value.length, 10);
    if (artAlike.value.length == 0) return false;
    return true;
};
watch(
    () => props.modelValue,
    (value) => {
        /* 仅在打开对话框时更新相似圣遗物 */
        if (!value) return;
        if (!updArtLike()) {
            show.value = false;
        }
    }
);
// 加/解锁
const targetLock = ref(false);
const click = () => {
    artStore.setLocks(
        artAlike.value.map((a) => a.data.index),
        targetLock.value
    );
    emit("update:modelValue", false);
};
</script>

<template>
    <el-dialog :title="$t('ui.art_alike')" v-model="show" top="8vh">
        <div
            class="small-title"
            style="margin-top: 10px"
            v-text="
                targetLock
                    ? $t('ui.suggest_lock', { count: artAlike.length })
                    : $t('ui.suggest_unlock', { count: artAlike.length })
            "
        />
        <div
            class="preview-artifact-list"
            v-infinite-scroll="loadArtAlike"
            :infinite-scroll-immediate="false"
            :infinite-scroll-disabled="loadArtAlikeDisabled"
        >
            <artifact-card
                v-for="i in artAlikeShowCount"
                :artifact="artAlike[i - 1]"
                :key="artAlike[i - 1].data.index"
                :readonly="true"
            />
        </div>
        <div style="margin-top: 10px; text-align: center">
            <el-button
                type="primary"
                @click="click"
                v-text="targetLock ? $t('ui.lock_all') : $t('ui.unlock_all')"
            />
        </div>
    </el-dialog>
</template>

<style lang="scss">
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
