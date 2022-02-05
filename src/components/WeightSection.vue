<script lang="ts" setup>
import SectionTitle from './SectionTitle.vue';
import ValueButton from './ValueButton.vue';
import chs from "../ys/locale/chs.json"
import { useStore } from '../store';
import { computed } from 'vue';
const store = useStore()
const setWeight = (key: string, value: number) => {
    store.commit('setWeight', { key, value })
}
const useWeightJson = (use: boolean) => {
    store.commit('useWeightJson', { use })
}
const weightJson = computed<string>({
    get() {
        return store.state.weightJson
    },
    set(json) {
        store.commit('setWeightJson', { json })
    }
})
</script>

<template>
    <div class="section">
        <section-title title="词条权重">
            <span v-show="store.state.useWeightJson" @click="useWeightJson(false)">基本</span>
            <span v-show="!store.state.useWeightJson" @click="useWeightJson(true)">高级</span>
        </section-title>
        <div style="margin-top: 14px;" v-show="!store.state.useWeightJson">
            <value-button
                class="weight-button"
                v-for="(_, key) in store.state.weight"
                :model-value="store.state.weight[key]"
                @update:model-value="setWeight(key as string, $event)"
            >{{ (chs.affix as any)[key] }}</value-button>
        </div>
        <div class="section-content" v-show="store.state.useWeightJson">
            <textarea class="json-input" v-model="weightJson" />
        </div>
    </div>
</template>

<style>
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
</style>