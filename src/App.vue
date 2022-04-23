<script setup lang="ts">
import LayoutLeft from './components/LayoutLeft.vue';
import LayoutRight from './components/LayoutRight.vue';
import { useStore } from './store';
import { onMounted, ref } from 'vue';
import { Download } from '@element-plus/icons-vue'
import axios from 'axios'
import cookie from './store/cookie';

const store = useStore()
const loadingSrc = './assets/loading.gif'

const showUpdateDialog = ref(false)
const message = ref('Hello')
const yasVersion = ref('v0.0.0')
const yasUpdLog = ref('Fix bugs')
const claim = () => {
    cookie.set('yas_ver', yasVersion.value)
    showUpdateDialog.value = false
}
const updYas = () => {
    claim()
    window.open('https://ghproxy.com/https://github.com/ideless/yas-lock/releases/latest/download/yas-lock.exe', '_blank')
}

onMounted(() => {
    try {
        if (process.env.NODE_ENV == 'development') {
            console.log('DEV')
            return
        }
    } catch (e) { }
    console.log('Checking for yas-lock updates...')
    axios.get('https://api.github.com/repos/ideless/yas-lock/releases/latest').then(r => {
        if ('tag_name' in r.data) {
            yasVersion.value = r.data['tag_name']
            yasUpdLog.value = r.data['body']
            let yas_ver = cookie.get('yas_ver')
            if (!yas_ver) {
                message.value = '你可能还没有下载yas-lock。yas-lock是一个轻量windows端圣遗物导出和加解锁工具，推荐下载！'
            } else if (yas_ver != r.data['tag_name']) {
                message.value = `你的yas-lock当前版本为${yas_ver}，最新版本为${r.data['tag_name']}，建议更新！`
            } else return
            showUpdateDialog.value = true
        }
    })
})
</script>

<template>
    <layout-left />
    <layout-right />
    <el-dialog v-model="showUpdateDialog" title="更新 yas-lock">
        <div class="update-content">
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
    </el-dialog>
    <transition name="fade">
        <div class="modal" v-show="store.state.loading">
            <img :src="loadingSrc" />
        </div>
    </transition>
</template>

<style lang="scss">
#app {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    display: flex;
    font-size: 16px;
    font-weight: bold;
    user-select: none;
}

.el-select,
.el-dialog {
    font-weight: normal;
}

.update-content {
    color: #444;
    font-weight: normal;

    p:not(:first-child) {
        margin-top: 10px;
    }
}

.modal {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fffa;
    color: black;
}
</style>
