<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { Artifact } from '@/ys/artifact';
import { download } from '@/store/utils';
import { useStore } from '@/store';
import ArtifactCard from '@/components/widgets/ArtifactCard.vue';
import { number } from 'echarts';

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
const useLockV2 = ref(false)
const exportValidation = ref(false)

const exportArts = () => {
    show.value = false

    let flip_indices = []
    let validation = []
    for (let a of store.state.artifacts) {
        if (!exportable(a)) continue
        validation.push({
            index: a.data.index,
            locked: a.data.lock
        })
        if (a.lock != a.data.lock) {
            flip_indices.push(a.data.index)
            // 记住更改
            if (remember.value || store.state.ws.connected) {
                a.data.lock = a.lock
            }
        }
    }

    flip_indices.sort((a, b) => a - b)
    validation.sort((a, b) => a.index - b.index)

    if (useLockV2.value) {
        const dataV2 = {
            version: 2,
            flip_indices,
            lock_indices: [],
            unlock_indices: [],
            validation,
        }
        if (store.state.ws.connected) {
            store.dispatch('sendLockReq', {
                lock_json: JSON.stringify(dataV2)
            })
        } else {
            download(JSON.stringify(dataV2), 'lock.json')
        }
    } else {
        if (store.state.ws.connected) {
            store.dispatch('sendLockReq', {
                indices: flip_indices
            })
        } else {
            download(JSON.stringify(flip_indices), 'lock.json')
        }
    }
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
        <div style="margin-top: 10px;" v-show="!store.state.ws.connected">
            <el-checkbox v-model="remember">记住本次更改，下次导出时将不再包含以上圣遗物</el-checkbox>
            <el-checkbox v-model="useLockV2">导出格式为v2（yas-lock v1.0.9-beta1起支持）</el-checkbox>
            <el-checkbox v-model="exportValidation" :disabled="!useLockV2">导出验证数据</el-checkbox>
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