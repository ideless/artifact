<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { Artifact } from '../ys/artifact';
import { download } from '../store/utils';
import { useStore } from '../store';
import ArtifactCard from './ArtifactCard.vue';
const store = useStore()
const props = defineProps<{
    modelValue: boolean,
}>()
const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
}>()
const show = computed<boolean>({
    get() { return props.modelValue },
    set(value) { emit('update:modelValue', value) }
})
// 预览
const artToLock = ref<Artifact[]>([])
const artToLockShowCount = ref(0)
const loadArtToLock = () => {
    // console.log('load art to lock')
    if (artToLockShowCount.value < artToLock.value.length) {
        artToLockShowCount.value = Math.min(artToLock.value.length, artToLockShowCount.value + 10)
    }
}
const loadArtToLockDisabled = computed(() => artToLockShowCount.value >= artToLock.value.length)
const artToUnlock = ref<Artifact[]>([])
const artToUnlockShowCount = ref(0)
const loadArtToUnlock = () => {
    // console.log('load art to unlock')
    if (artToUnlockShowCount.value < artToUnlock.value.length) {
        artToUnlockShowCount.value = Math.min(artToUnlock.value.length, artToUnlockShowCount.value + 10)
    }
}
const loadArtToUnlockDisabled = computed(() => artToUnlockShowCount.value >= artToUnlock.value.length)
function exportable(a: Artifact) {
    return a.data.source == 'yas-lock/good' || a.data.source == 'pcap/good'
}
watch(() => props.modelValue, (value) => {
    if (!value) return
    artToLock.value = []
    artToUnlock.value = []
    for (let a of store.state.artifacts) {
        if (!exportable(a)) continue
        if (a.lock && !a.data.lock) artToLock.value.push(a)
        if (!a.lock && a.data.lock) artToUnlock.value.push(a)
    }
    artToLockShowCount.value = Math.min(artToLock.value.length, 10)
    artToUnlockShowCount.value = Math.min(artToUnlock.value.length, 10)
    // console.log(artToLockShowCount.value, artToUnlockShowCount.value)
})
// 导出
const remember = ref(true)
const exportArts = () => {
    show.value = false
    let indices = []
    for (let a of store.state.artifacts) {
        if (!exportable(a)) continue
        if (a.lock != a.data.lock) {
            indices.push(a.data.index)
            // 记住更改
            if (remember.value) {
                a.data.lock = a.lock
            }
        }
    }
    indices.sort((a, b) => a - b)
    download(JSON.stringify(indices), 'lock.json')
}
</script>

<template>
    <el-dialog title="导出预览" v-model="show" top="8vh">
        <p>此功能用于导出加解锁信息，然后经由yas-lock同步到游戏，详情见<a href="./tutorial" target="_blank">教程</a></p>
        <el-alert type="warning" style="margin-top: 10px;">
            <template #title>
                确保背包内圣遗物的<b>位置</b>没有发生变化，并且打开yas-lock前将打开圣遗物背包并翻到<b>最顶部</b>！！
            </template>
        </el-alert>
        <div class="small-title" style="margin-top: 10px;">以下圣遗物将被加锁 (共{{ artToLock.length }}个)</div>
        <div class="preview-artifact-list" v-infinite-scroll="loadArtToLock" :infinite-scroll-immediate="false"
            :infinite-scroll-disabled="loadArtToLockDisabled">
            <artifact-card v-for="i in artToLockShowCount" :artifact="artToLock[i - 1]"
                :key="artToLock[i - 1].data.index" :readonly="true" />
        </div>
        <div class="small-title" style="margin-top: 10px;">以下圣遗物将被解锁 (共{{ artToUnlock.length }}个)</div>
        <div class="preview-artifact-list" v-infinite-scroll="loadArtToUnlock" :infinite-scroll-immediate="false"
            :infinite-scroll-disabled="loadArtToUnlockDisabled">
            <artifact-card v-for="i in artToUnlockShowCount" :artifact="artToUnlock[i - 1]"
                :key="artToUnlock[i - 1].data.index" :readonly="true" />
        </div>
        <div style="margin-top: 10px;">
            <el-checkbox v-model="remember">记住本次更改，下次导出时将不再包含以上圣遗物</el-checkbox>
        </div>
        <div style="margin-top: 10px; text-align: center;">
            <el-button type="primary" @click="exportArts">导出</el-button>
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