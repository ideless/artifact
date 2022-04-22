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
        <section-title title="排序">
            <el-popover placement="left" :width="400" trigger="click">
                <template #reference>
                    <span>说明</span>
                </template>
                <div class="info-wrapper">
                    <h5>按角色适配概率</h5>
                    <p>圣遗物a对角色c的适配概率定义为，刷100个满级圣遗物，其中和a同部位同主词条的圣遗物得分均不超过a的满级期望得分的概率。如果a对c是散件则是200个。</p>
                    <p>排序时以对所有角色的最高适配概率为关键字。</p>
                    <i>基本模式下“按角色适配概率”不会受到词条权重的影响</i>
                    <h5 style="margin-top: 5px">按上位替代数</h5>
                    <p>圣遗物b是圣遗物a的上位替代，如果它们部位和主词条相同，且a的所有副词条（除小攻/小生/小防外）b都有而且数值更大。</p>
                    <i>“按上位替代数”不会受到词条权重的影响</i>
                </div>
            </el-popover>
        </section-title>
        <div class="section-content">
            <el-radio class="sort" v-model="sortBy" label="cur">按当前词条数</el-radio>
            <el-radio class="sort" v-model="sortBy" label="min">按满级最小词条数</el-radio>
            <el-radio class="sort" v-model="sortBy" label="avg">按满级期望词条数</el-radio>
            <el-radio class="sort" v-model="sortBy" label="max">按满级最大词条数</el-radio>
            <el-radio class="sort" v-model="sortBy" label="score">按角色适配概率</el-radio>
            <el-radio class="sort" v-model="sortBy" label="defeat">按上位替代数</el-radio>
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

.info-wrapper {
    font-size: 12px;

    p {
        margin: 4px;
    }
}
</style>