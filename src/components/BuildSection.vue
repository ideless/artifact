<script lang="ts" setup>
import chs from "../ys/locale/chs"
import data from '../ys/data';
import { computed } from 'vue'
import { useStore } from '../store';
const store = useStore()
// set
const sets2 = Object.entries(chs.set).map(([key, val]) => ({
    value: key,
    label: val.name
}))
const setCands2 = computed<any>({
    get() { return store.state.build.set[2] },
    set(v) { store.commit('setBuildSet2', { set: v }) }
})
const sets4 = Object.entries(chs.set).map(([key, val]) => ({
    value: key,
    label: val.name
}))
const setCands4 = computed<any>({
    get() { return store.state.build.set[4] },
    set(v) { store.commit('setBuildSet4', { set: v }) }
})
// main
const sandsMains = data.mainKeys.sands.map(m => ({
    value: m,
    label: chs.affix[m]
}))
const sandsMain = computed<any>({
    get() { return store.state.build.main.sands },
    set(v) { store.commit('setBuildMain', { slot: 'sands', keys: v }) }
})
const gobletMains = data.mainKeys.goblet.map(m => ({
    value: m,
    label: chs.affix[m]
}))
const gobletMain = computed<any>({
    get() { return store.state.build.main.goblet },
    set(v) { store.commit('setBuildMain', { slot: 'goblet', keys: v }) }
})
const circletMains = data.mainKeys.circlet.map(m => ({
    value: m,
    label: chs.affix[m]
}))
const circletMain = computed<any>({
    get() { return store.state.build.main.circlet },
    set(v) { store.commit('setBuildMain', { slot: 'circlet', keys: v }) }
})
</script>
<template>
    <div style="margin-top: 14px;" v-show="store.state.usePreset != ''">
        <p class="info" style="margin-top: 5px">以下偏好设置仅在预设模式中生效</p>
        <p class="small">设置套装四件套偏好</p>
        <el-select v-model="setCands4" multiple clearable placeholder="选择偏好四件套套装" style="width:100%;">
            <el-option v-for="o in sets4" :value="o.value" :label="o.label" />
        </el-select>
        <p class="small">设置套装两件套偏好</p>
        <el-select v-model="setCands2" multiple clearable placeholder="选择偏好两件套套装" style="width:100%;">
            <el-option v-for="o in sets2" :value="o.value" :label="o.label" />
        </el-select>
        <p class="small">设置时之沙主词条偏好</p>
        <el-select v-model="sandsMain" multiple clearable placeholder="选择偏好主词条" style="width:100%;">
            <el-option v-for="o in sandsMains" :value="o.value" :label="o.label" />
        </el-select>
        <p class="small">设置空之杯主词条偏好</p>
        <el-select v-model="gobletMain" multiple clearable placeholder="选择偏好主词条" style="width:100%;">
            <el-option v-for="o in gobletMains" :value="o.value" :label="o.label" />
        </el-select>
        <p class="small">设置理之冠主词条偏好</p>
        <el-select v-model="circletMain" multiple clearable placeholder="选择偏好主词条" style="width:100%;">
            <el-option v-for="o in circletMains" :value="o.value" :label="o.label" />
        </el-select>
    </div>
</template>
<style lang="scss">
.small {
    font-size: smaller;
    font-weight: normal;
    color: gray;
}
</style>