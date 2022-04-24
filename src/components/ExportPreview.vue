<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { Artifact } from '../ys/artifact';
import { download } from '../store/utils';
import { useStore } from '../store';
import { Download } from '@element-plus/icons-vue'
import ArtifactCard from './ArtifactCard.vue';
import axios from 'axios'

const store = useStore()
const showUpdateDialog = ref(false)
const message = ref('Hello')
const yasVersion = ref('v0.0.0')
const yasUpdLog = ref('Fix bugs')
try {
    axios.get('https://api.github.com/repos/ideless/yas-lock/releases/latest').then(r => {
        if ('tag_name' in r.data) {
            yasVersion.value = r.data['tag_name']
            yasUpdLog.value = r.data['body']
            let yas_ver=localStorage.getItem('yas_ver')
            if (!yas_ver) {
                message.value = '你可能还没有下载yas-lock。yas-lock是一个轻量windows端圣遗物导出和加解锁工具，配合该工具使用效果更佳！'
            } else if (yas_ver != r.data['tag_name']) {
                message.value = `你的yas-lock当前版本为${yas_ver}，最新版本为${r.data['tag_name']}，建议更新！`
            } else return
            showUpdateDialog.value = true
        }
    })
}catch (e) {
    message.value = '未能获取当前yas-lock版本号，可能是浏览器版本过低导致的，详细信息请F12打开控制台查看。'
    console.log(e)
}
const claim = () => {
    localStorage.setItem('yas_ver', yasVersion.value)
    showUpdateDialog.value = false
}
const updYas = () => {
    claim()
    window.open('https://ghproxy.com/https://github.com/ideless/yas-lock/releases/latest/download/yas-lock.exe', '_blank')
}

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
    if (artToLockShowCount.value < artToLock.value.length) {
        artToLockShowCount.value = Math.min(artToLock.value.length, artToLockShowCount.value + 10)
    }
}
const loadArtToLockDisabled = computed(() => artToLockShowCount.value >= artToLock.value.length)
const artToUnlock = ref<Artifact[]>([])
const artToUnlockShowCount = ref(0)
const loadArtToUnlock = () => {
    if (artToUnlockShowCount.value < artToUnlock.value.length) {
        artToUnlockShowCount.value = Math.min(artToUnlock.value.length, artToUnlockShowCount.value + 10)
    }
}
const loadArtToUnlockDisabled = computed(() => artToUnlockShowCount.value >= artToUnlock.value.length)
watch(() => props.modelValue, (value) => {
    if (!value) return
    artToLock.value = []
    artToUnlock.value = []
    for (let a of store.state.artifacts) {
        if (a.data.source != 'good') continue
        if (a.lock && !a.data.lock) artToLock.value.push(a)
        if (!a.lock && a.data.lock) artToUnlock.value.push(a)
    }
    artToLockShowCount.value = Math.min(artToLock.value.length, 10)
    artToUnlockShowCount.value = Math.min(artToUnlock.value.length, 10)
})
// 导出
const remember = ref(true)
const exportArts = () => {
    show.value = false
    let indices = []
    for (let a of store.state.artifacts) {
        if (a.data.source == 'good' && a.lock != a.data.lock) {
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
        <div class="update-content" v-show="showUpdateDialog">
            <p>{{ message }}</p>
            <p>
                <el-button :icon="Download" type="primary" @click="updYas">下载 yas-lock {{ yasVersion }}</el-button>
                <el-button @click="claim" style="margin-left: 10px;">我已有此版本</el-button>
            </p>
            <p>
                <b>更新日志：</b>
            </p>
            <p style="white-space: pre-wrap;">{{ yasUpdLog }}</p>
        </div>
        <div v-show="!showUpdateDialog">此功能用于导出加解锁信息，然后经由yas-lock同步到游戏，详情见<a href="./tutorial" target="_blank">教程</a></div>
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
            <el-checkbox v-model="remember">记住本次更改，重新导入新的圣遗物前将不再导出以上圣遗物</el-checkbox>
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