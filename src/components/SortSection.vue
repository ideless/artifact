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
            <el-radio class="sort" v-model="sortBy" label="cur">按当前词条数</el-radio>
            <el-radio class="sort" v-model="sortBy" label="min">按满级最小词条数</el-radio>
            <el-radio class="sort" v-model="sortBy" label="avg">按满级期望词条数</el-radio>
            <el-radio class="sort" v-model="sortBy" label="max">按满级最大词条数</el-radio>
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