<script lang="ts" setup>
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
                <drop-select class="filter-ctrl" :items="store.getters.filterSets" :model-value="store.state.filter.set"
                    @update:model-value="setFilter('set', $event)" />
            </div>
            <div class="filter">
                <span class="filter-name">部位：</span>
                <drop-select class="filter-ctrl" :items="store.getters.filterSlots"
                    :model-value="store.state.filter.slot" @update:model-value="setFilter('slot', $event)" />
            </div>
            <div class="filter">
                <span class="filter-name">主词条：</span>
                <drop-select class="filter-ctrl" :items="store.getters.filterMains"
                    :model-value="store.state.filter.main" @update:model-value="setFilter('main', $event)" />
            </div>
            <div class="filter">
                <span class="filter-name">角色：</span>
                <drop-select class="filter-ctrl" :items="store.getters.filterLocations"
                    :model-value="store.state.filter.location" @update:model-value="setFilter('location', $event)" />
            </div>
            <div class="filter">
                <span class="filter-name">锁：</span>
                <drop-select class="filter-ctrl" :items="store.getters.filterLocks"
                    :model-value="store.state.filter.lock" @update:model-value="setFilter('lock', $event)" />
            </div>
            <div class="filter">
                <span class="filter-name">等级：</span>
                <range-slider class="filter-ctrl" :model-value="store.state.filter.lvRange"
                    @update:model-value="setFilter('lvRange', $event)" />
            </div>
        </div>
        <div class="section-content" v-show="store.state.useFilterPro">
            <section-title title="套装">
                <span @click="selectAll('set', store.getters.filterProSets)">全选</span>
                <span @click="deselectAll('set')">全不选</span>
            </section-title>
            <el-checkbox-group :model-value="store.state.filterPro.set"
                @update:model-value="setFilterPro('set', $event)" style="margin-top: 10px;">
                <el-checkbox class="check p2" v-for="s in store.getters.filterProSets" :label="s.key">{{ s.value }}
                </el-checkbox>
            </el-checkbox-group>
            <section-title title="部位">
                <span @click="selectAll('slot', store.getters.filterProSlots)">全选</span>
                <span @click="deselectAll('slot')">全不选</span>
            </section-title>
            <el-checkbox-group :model-value="store.state.filterPro.slot"
                @update:model-value="setFilterPro('slot', $event)" style="margin-top: 10px;">
                <el-checkbox class="check p5" v-for="s in store.getters.filterProSlots" :label="s.key">{{ s.value }}
                </el-checkbox>
            </el-checkbox-group>
            <section-title title="主词条">
                <span @click="selectAll('main', store.getters.filterProMains)">全选</span>
                <span @click="deselectAll('main')">全不选</span>
            </section-title>
            <el-checkbox-group :model-value="store.state.filterPro.main"
                @update:model-value="setFilterPro('main', $event)" style="margin-top: 10px;">
                <el-checkbox class="check p2" v-for="s in store.getters.filterProMains" :label="s.key">{{ s.value }}
                </el-checkbox>
            </el-checkbox-group>
            <section-title title="角色">
                <span @click="selectAll('location', store.getters.filterProLocations)">全选</span>
                <span @click="deselectAll('location')">全不选</span>
            </section-title>
            <el-checkbox-group :model-value="store.state.filterPro.location"
                @update:model-value="setFilterPro('location', $event)" style="margin-top: 10px;">
                <el-checkbox class="check p3" v-for="s in store.getters.filterProLocations" :label="s.key">{{ s.value }}
                </el-checkbox>
            </el-checkbox-group>
            <section-title title="锁">
                <span @click="selectAll('lock', store.getters.filterProLocks)">全选</span>
                <span @click="deselectAll('lock')">全不选</span>
            </section-title>
            <el-checkbox-group :model-value="store.state.filterPro.lock"
                @update:model-value="setFilterPro('lock', $event)" style="margin-top: 10px;">
                <el-checkbox class="check p2" v-for="s in store.getters.filterProLocks" :label="s.key">{{ s.value }}
                </el-checkbox>
            </el-checkbox-group>
            <section-title title="等级" />
            <range-slider class="filter-ctrl" :model-value="store.state.filterPro.lvRange"
                @update:model-value="setFilterPro('lvRange', $event)" />
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
        color: gray;
        // font-weight: normal;
    }

    .filter-ctrl {
        width: 300px;
    }
}

.check {
    --el-checkbox-font-size: 16px;
    --el-checkbox-font-weight: bold;
    --el-checkbox-text-color: #444;
    height: 30px;

    &.p2 {
        width: 170px;
    }

    &.p3 {
        width: 100px;
    }

    &.p5 {
        width: 50px;
    }
}
</style>