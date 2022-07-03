<script lang="ts" setup>
import SectionTitle from './SectionTitle.vue';
import ValueButton from './ValueButton.vue';
import PresetLoader from './PresetLoader.vue';
import chs from "@/ys/locale/chs"
import { useStore } from '@/store';
import { ref, computed } from 'vue';
const store = useStore()
const setWeight = (key: string, value: number) => {
    store.commit('setWeight', { key, value })
}
const showPresetLoader = ref(false)
const openLoader = () => {
    showPresetLoader.value = true
}
</script>

<template>
    <div class="section">
        <section-title title="词条权重">
            <span @click="openLoader">预设</span>
        </section-title>
        <p class="info">点按粗调，拖拽微调，悬停查看数值</p>
        <value-button class="weight-button" v-for="(_, key) in store.state.weight"
            :model-value="store.state.weight[key]" @update:model-value="setWeight(key as string, $event)">{{
                    (chs.affix as any)[key]
            }}</value-button>
    </div>
    <preset-loader v-model="showPresetLoader" />
</template>

<style lang="scss" scoped>
.weight-button {
    margin: 10px 10px 0 10px;
}

.filter {
    margin-top: 15px;
}
</style>