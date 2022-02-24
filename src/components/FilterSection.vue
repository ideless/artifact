<script lang="ts" setup>
import { ref } from 'vue'
import SectionTitle from './SectionTitle.vue';
import DropSelect from './DropSelect.vue';
import RangeSlider from './RangeSlider.vue';
import { useStore } from '../store';
const store = useStore()
const useFilterPro = (use: boolean) => {
    store.commit('useFilterPro', { use })
}
const setFilter = (key: string, value: any) => {
    store.commit('setFilter', { key, value })
}
const setFilterPro = (key: string, value: any) => {
    store.commit('setFilterPro', { key, value })
}
const selectAll = (filterProKey: string, items: Array<{ key: string, value: string }>) => {
    let keys = []
    for (let i of items) {
        keys.push(i.key)
    }
    store.commit('setFilterPro', { key: filterProKey, value: keys })
}
const deselectAll = (filterProKey: string) => {
    store.commit('setFilterPro', { key: filterProKey, value: [] })
}
</script>

<template>
    <div class="section">
        <section-title title="筛选">
            <span v-show="store.state.useFilterPro" @click="useFilterPro(false)">基本</span>
            <span v-show="!store.state.useFilterPro" @click="useFilterPro(true)">高级</span>
        </section-title>
        <div class="section-content" v-show="!store.state.useFilterPro">
            <div class="filter">
                <span class="filter-name">套装：</span>
                <drop-select
                    class="filter-ctrl"
                    :items="store.getters.filterSets"
                    :model-value="store.state.filter.set"
                    @update:model-value="setFilter('set', $event)"
                />
            </div>
            <div class="filter">
                <span class="filter-name">部位：</span>
                <drop-select
                    class="filter-ctrl"
                    :items="store.getters.filterSlots"
                    :model-value="store.state.filter.slot"
                    @update:model-value="setFilter('slot', $event)"
                />
            </div>
            <div class="filter">
                <span class="filter-name">主词条：</span>
                <drop-select
                    class="filter-ctrl"
                    :items="store.getters.filterMains"
                    :model-value="store.state.filter.main"
                    @update:model-value="setFilter('main', $event)"
                />
            </div>
            <div class="filter">
                <span class="filter-name">等级：</span>
                <range-slider
                    class="filter-ctrl"
                    :model-value="store.state.filter.lvRange"
                    @update:model-value="setFilter('lvRange', $event)"
                />
            </div>
        </div>
        <div class="section-content" v-show="store.state.useFilterPro">
            <section-title title="套装">
                <span @click="selectAll('set', store.getters.filterProSets)">全选</span>
                <span @click="deselectAll('set')">全不选</span>
            </section-title>
            <el-checkbox-group
                :model-value="store.state.filterPro.set"
                @update:model-value="setFilterPro('set', $event)"
                style="margin-top: 10px;"
            >
                <el-checkbox
                    class="check"
                    v-for="s in store.getters.filterProSets"
                    :label="s.key"
                >{{ s.value }}</el-checkbox>
            </el-checkbox-group>
            <section-title title="部位">
                <span @click="selectAll('slot', store.getters.filterProSlots)">全选</span>
                <span @click="deselectAll('slot')">全不选</span>
            </section-title>
            <el-checkbox-group
                :model-value="store.state.filterPro.slot"
                @update:model-value="setFilterPro('slot', $event)"
                style="margin-top: 10px;"
            >
                <el-checkbox
                    class="check small"
                    v-for="s in store.getters.filterProSlots"
                    :label="s.key"
                >{{ s.value }}</el-checkbox>
            </el-checkbox-group>
            <section-title title="主词条">
                <span @click="selectAll('main', store.getters.filterProMains)">全选</span>
                <span @click="deselectAll('main')">全不选</span>
            </section-title>
            <el-checkbox-group
                :model-value="store.state.filterPro.main"
                @update:model-value="setFilterPro('main', $event)"
                style="margin-top: 10px;"
            >
                <el-checkbox
                    class="check"
                    v-for="s in store.getters.filterProMains"
                    :label="s.key"
                >{{ s.value }}</el-checkbox>
            </el-checkbox-group>
            <div class="filter">
                <span class="filter-name">等级：</span>
                <range-slider
                    class="filter-ctrl"
                    :model-value="store.state.filterPro.lvRange"
                    @update:model-value="setFilterPro('lvRange', $event)"
                />
            </div>
            <div class="filter">
                <span class="filter-name">评分：</span>
                <range-slider
                    class="filter-ctrl"
                    :model-value="store.state.filterPro.score"
                    @update:model-value="setFilterPro('score', $event)"
                />
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.filter {
    display: flex;
    align-items: center;
    &:not(:last-child) {
        margin-bottom: 10px;
    }
    .filter-name {
        flex: 1;
        color: #444;
    }
    .filter-ctrl {
        width: 300px;
    }
}
.check {
    --el-checkbox-font-size: 16px;
    --el-checkbox-font-weight: bold;
    --el-checkbox-font-color: #444;
    height: 30px;
    width: 170px;
    &.small {
        width: 50px;
    }
}
</style>