<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { Artifact } from '../ys/artifact';
import { useStore } from '../store';
import ArtifactCard from './ArtifactCard.vue';
const store = useStore()
const props = defineProps<{
    modelValue: boolean,
    index: number,
}>()
const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
}>()
const show = computed<boolean>({
    get() { return props.modelValue },
    set(value) { emit('update:modelValue', value) }
})
/* 相似圣遗物 */
const artAlike = ref<Artifact[]>([])
const artAlikeShowCount = ref(0)
const loadArtAlike = () => {
    if (artAlikeShowCount.value < artAlike.value.length) {
        artAlikeShowCount.value = Math.min(artAlike.value.length, artAlikeShowCount.value + 10)
    }
}
const loadArtAlikeDisabled = computed(() => artAlikeShowCount.value >= artAlike.value.length)
function isSubset(A: Set<any>, B: Set<any>) {
    for (let a of A) {
        if (!B.has(a)) {
            return false
        }
    }
    return true
}
let ignored = new Set(['hp', 'atk', 'def'])
watch(() => props.modelValue, (value) => {
    /* 仅在打开对话框时更新相似圣遗物 */
    if (!value) return
    /* 获取目标圣遗物 */
    let target: Artifact | undefined = undefined
    for (let a of store.state.artifacts) {
        if (a.data.index == props.index) {
            target = a
            break
        }
    }
    if (target == undefined) {
        emit('update:modelValue', false)
        return
    }
    targetLock.value = target.lock
    if (target.lock) { }
    let tm = new Set(target.minors.map(x => x.key).filter(x => !ignored.has(x)))
    /* 更新artAlike */
    artAlike.value = []
    for (let a of store.state.artifacts) {
        if (a.data.index == props.index) continue
        /* 主词条不同或锁状态一样，不相似 */
        if (
            a.mainKey != target.mainKey ||
            a.lock == target.lock
            // Math.floor(a.level / 4) > Math.floor(target.level / 4)
        ) {
            continue
        }
        /* 忽略小攻/生/防 */
        let am = new Set(a.minors.map(x => x.key).filter(x => !ignored.has(x)))
        if (target.lock) {
            if (isSubset(tm, am)) {
                artAlike.value.push(a)
            }
        } else {
            if (isSubset(am, tm)) {
                artAlike.value.push(a)
            }
        }
    }
    artAlikeShowCount.value = Math.min(artAlike.value.length, 10)
    if (artAlike.value.length == 0) {
        emit('update:modelValue', false)
    }
})
// 加/解锁
const targetLock = ref(false)
const msg = computed(() => `你可能还想${targetLock.value ? '加锁' : '解锁'}以下圣遗物（共${artAlike.value.length}个）`)
const btnText = computed(() => targetLock.value ? '全部加锁' : '全部解锁')
const click = () => {
    store.dispatch('setLock', {
        lock: targetLock.value,
        indices: artAlike.value.map(a => a.data.index),
    })
    emit('update:modelValue', false)
}
</script>

<template>
    <el-dialog title="圣遗物联想" v-model="show" top="8vh">
        <div class="small-title" style="margin-top: 10px;">{{ msg }}</div>
        <div class="preview-artifact-list" v-infinite-scroll="loadArtAlike" :infinite-scroll-immediate="false"
            :infinite-scroll-disabled="loadArtAlikeDisabled">
            <artifact-card v-for="i in artAlikeShowCount" :artifact="artAlike[i - 1]" :key="artAlike[i - 1].data.index"
                :readonly="true" />
        </div>
        <div style="margin-top: 10px; text-align: center;">
            <el-button type="primary" @click="click">{{ btnText }}</el-button>
        </div>
    </el-dialog>
</template>

<style lang="scss">
.preview-artifact-list {
    display: flex;
    width: 100%;
    overflow: auto;
    margin-top: 10px;

    >* {
        margin: 5px;
        margin-bottom: 10px;
        zoom: 80%;
    }
}
</style>