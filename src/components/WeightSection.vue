<script lang="ts" setup>
import SectionTitle from './SectionTitle.vue';
import ValueButton from './ValueButton.vue';
import PresetLoader from './PresetLoader.vue';
import chs from "../ys/locale/chs"
import { useStore } from '../store';
import { ref, computed } from 'vue';
const store = useStore()
const setWeight = (key: string, value: number) => {
    store.commit('setWeight', { key, value })
}
const useWeightJson = (use: boolean) => {
    store.commit('useWeightJson', { use })
}
// const weightJson = computed<string>({
//      get() { return store.state.weightJson },
//      set(json) { store.commit('setWeightJson', { json }) }
//  })
const showLoader = ref(false)
</script>

<template>
    <div class="section">
        <section-title title="词条权重">
            <span @click="showLoader = true">预设</span>
            <span v-show="store.state.useWeightJson" @click="useWeightJson(false)">基本</span>
            <span v-show="!store.state.useWeightJson" @click="useWeightJson(true)">高级</span>
        </section-title>
        <div style="margin-top: 14px;" v-show="store.state.useFilterBatch == -1 && !store.state.useWeightJson">
            <value-button
                class="weight-button"
                v-for="(_, key) in store.state.weight"
                :model-value="store.state.weight[key]"
                @update:model-value="setWeight(key as string, $event)"
            >{{ (chs.affix as any)[key] }}</value-button>
        </div>
        <!--
        <div class="section-content" v-show="store.state.useWeightJson">
            <textarea class="json-input" v-model="weightJson" />
        </div>
        -->
        <div class="section-content" v-show="store.state.useWeightJson || store.state.useFilterBatch != -1">
            <div class="filter-hint-div" v-show="store.state.useFilterBatch != -1">已选择过滤规则，当前使用过滤规则内的词条权重</div>
            <el-form :inline="true">
                <el-form-item 
                    v-for="(_, key) in store.state.weight"
                    :key="key"
                    :label="chs.affix[key] + (chs.affix[key].length >= 5 ? '' : '&emsp;'.repeat(5 - chs.affix[key].length))"
                    style="width: 50%; margin-right: 0"
                >
                    <el-input class="weight-input" v-model.number="store.state.weight[key]" type="number" step="0.1"></el-input>
                </el-form-item>
            </el-form>
        </div>
    </div>
    <preset-loader v-model="showLoader" />
</template>

<style lang="scss">
.weight-button {
    margin: 10px 10px 0 10px;
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
.weight-input {
    width: 80px;
    > * {
        padding-right: 0px
    }
}
.filter-hint-div {
    text-align: center;
    margin: 20px;
}
</style>