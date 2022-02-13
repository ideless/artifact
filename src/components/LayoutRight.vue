<script lang="ts" setup>
import ImportSection from './ImportSection.vue';
import WeightSection from './WeightSection.vue'
import FilterSection from './FilterSection.vue';
import SortSection from './SortSection.vue';
import TextButton from './TextButton.vue';
import { useStore } from '../store';
const store = useStore()
const start = () => { store.dispatch('updFilteredArtifacts') }
</script>

<template>
    <div class="layout-right">
        <el-scrollbar>
            <import-section />
            <weight-section />
            <filter-section />
            <sort-section />
            <div class="start-container">
                <text-button @click="start">开始计算</text-button>
            </div>
        </el-scrollbar>
    </div>
</template>

<style lang="scss" scoped>
.layout-right {
    width: 500px;
    background-color: #d9d9d9;
    color: #444;
    overflow-y: auto;
    user-select: none;
    .start-container {
        padding: 20px 0;
        text-align: center;
        background-color: #d9d9d9bb;
        backdrop-filter: blur(10px);
        position: sticky;
        bottom: 0;
        z-index: 1;
    }
}
</style>