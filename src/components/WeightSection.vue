<script lang="ts" setup>
import SectionTitle from './SectionTitle.vue';
import ValueButton from './ValueButton.vue';
import PresetLoader from './PresetLoader.vue';
import BuildLoader from './BuildLoader.vue';
import chs from "../ys/locale/chs"
import data from '../ys/data';
import { useStore } from '../store';
import { ref, computed } from 'vue';
const store = useStore()
const setWeight = (key: string, value: number) => {
    store.commit('setWeight', { key, value })
}
const setBuildWeight = (key: string, value: number) => {
    store.commit('setBuildWeight', { key, value })
}
const useBuild = (use: boolean) => {
    store.commit('setUseBuild', { use })
}
// loader
const showPresetLoader = ref(false)
const showBuildLoader = ref(false)
const openLoader = () => {
    if (store.state.useBuild) {
        showBuildLoader.value = true
    } else {
        showPresetLoader.value = true
    }
}
// set
const sets = Object.entries(chs.set).map(([key, val]) => ({
    value: key,
    label: val.name
}))
const setCands = computed({
    get() { return store.state.build.set },
    set(v) { store.commit('setBuildSet', { set: v }) }
})
// main
const sandsMains = data.mainKeys.sands.map(m => ({
    value: m,
    label: chs.affix[m]
}))
const sandsMain = computed({
    get() { return store.state.build.main.sands },
    set(v) { store.commit('setBuildMain', { slot: 'sands', keys: v }) }
})
const gobletMains = data.mainKeys.goblet.map(m => ({
    value: m,
    label: chs.affix[m]
}))
const gobletMain = computed({
    get() { return store.state.build.main.goblet },
    set(v) { store.commit('setBuildMain', { slot: 'goblet', keys: v }) }
})
const circletMains = data.mainKeys.circlet.map(m => ({
    value: m,
    label: chs.affix[m]
}))
const circletMain = computed({
    get() { return store.state.build.main.circlet },
    set(v) { store.commit('setBuildMain', { slot: 'circlet', keys: v }) }
})
</script>

<template>
    <div class="section">
        <section-title title="词条权重">
            <span @click="openLoader">预设</span>
            <span v-show="store.state.useBuild" @click="useBuild(false)">基本</span>
            <span v-show="!store.state.useBuild" @click="useBuild(true)">高级</span>
        </section-title>
        <div style="margin-top: 14px;" v-show="!store.state.useBuild">
            <p class="info">拖拽进行微调，悬停查看数值</p>
            <value-button class="weight-button" v-for="(_, key) in store.state.weight"
                :model-value="store.state.weight[key]" @update:model-value="setWeight(key as string, $event)">{{
                    (chs.affix as any)[key]
                }}</value-button>
        </div>
        <div style="margin-top: 14px;" v-show="store.state.useBuild">
            <p class="info">拖拽进行微调，悬停查看数值</p>
            <value-button class="weight-button" v-for="(_, key) in store.state.build.weight"
                :model-value="store.state.build.weight[key]"
                @update:model-value="setBuildWeight(key as string, $event)">{{
                    (chs.affix as any)[key]
                }}</value-button>
            <p class="info" style="margin-top: 5px">以下仅在“按角色适配概率”排序中生效</p>
            <p class="small">设置套装偏好</p>
            <el-select v-model="setCands" multiple clearable placeholder="选择偏好套装" style="width:100%;">
                <el-option v-for="o in sets" :value="o.value" :label="o.label" />
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
    </div>
    <preset-loader v-model="showPresetLoader" />
    <build-loader v-model="showBuildLoader" />
</template>

<style lang="scss">
.weight-button {
    margin: 10px 10px 0 10px;
}

.small {
    font-size: smaller;
    font-weight: normal;
    color: gray;
    margin-top: 5px;
}

.json-input {
    resize: none;
    border: lightgray;
    padding: 10px;
    width: 100%;
    height: 60px;
    color: gray;
    border-radius: 3px;
    box-shadow: 0 0 2px 0 #0007;
    background: white;
    line-height: 1.5;
}
</style>