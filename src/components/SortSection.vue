<script lang="ts" setup>
import SectionTitle from './SectionTitle.vue';
import { computed } from 'vue'
import { useStore } from '../store';
const store = useStore()
const sortBy = computed({
    get() {
        return store.state.sortBy
    },
    set(sort: string) {
        store.commit('setSortBy', { sort })
    }
})
</script>

<template>
    <div class="section">
        <section-title title="排序" />
        <div class="section-content">
            <el-radio class="sort" v-model="sortBy" label="tot">按圣遗物评分</el-radio>
            <el-radio class="sort" v-model="sortBy" label="md">按副词条评分</el-radio>
            <el-radio class="sort" v-model="sortBy" label="avg">按期望词条数</el-radio>
            <el-radio class="sort" v-model="sortBy" label="max">按最大词条数</el-radio>
            <el-radio class="sort" v-model="sortBy" label="cur">按当前词条数</el-radio>
            <el-radio class="sort" v-model="sortBy" label>不排序</el-radio>
        </div>
    </div>
</template>

<style>
.sort {
    --el-radio-font-size: 16px;
    --el-radio-font-weight: bold;
    --el-radio-font-color: #444;
    height: 35px;
    width: 160px;
}
</style>