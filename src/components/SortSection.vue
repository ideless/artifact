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
const setSortOrder = (use: boolean) => {
    store.commit('setSortOrder', { use })
}
</script>

<template>
    <div class="section">
        <section-title title="排序">
        <span v-show="store.state.sortord" @click="setSortOrder(false)">倒序</span>
        <span v-show="!store.state.sortord" @click="setSortOrder(true)">正序</span>
        </section-title>
        <div class="section-content">
            <el-radio class="sort" v-model="sortBy" label="tot">按圣遗物评分</el-radio>
            <el-radio class="sort" v-model="sortBy" label="md">按期望词条数</el-radio>
            <el-radio class="sort" v-model="sortBy" label="cur">按当前词条数</el-radio>
            <el-radio class="sort" v-model="sortBy" label>不排序</el-radio>
        </div>
    </div>
</template>

<style lang="scss">
.sort {
    --el-radio-font-size: 16px;
    --el-radio-font-weight: bold;
    --el-radio-font-color: #444;
    height: 35px;
    width: 160px;
}
</style>