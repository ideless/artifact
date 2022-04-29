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
                    <i>预设模式下“按圣遗物总分”与“按角色适配概率”计算逻辑会改变</i>
                    <h5>按圣遗物总分</h5>
                    <p>圣遗物期望有效副词条数的基础上加上主属性评分。</p>
                    <p>主属性评分公式为：主属性系数*属性使用率/属性出现概率+套装系数*套装与主属性相关系数。</p>
                    <p><i>* 圣遗物期望有效副词条数的生（防）攻转化率为对生命（防御）角色的攻击词条有效率</i></p>
                    <h5>按角色适配概率</h5>
                    <p>圣遗物a对角色c的适配概率定义为，刷100个满级圣遗物，其中和a同部位同主词条的圣遗物得分均不超过a的满级期望得分的概率。如果a对c是散件则是200个。</p>
                    <p>排序时以对所有角色的最高适配概率为关键字，悬停于圣遗物卡片上可查看。由于计算量较大等待时间较长，在选择以按角色适配概率排序前该项将不会计算和显示。</p>
                    <p><i>* 非预设模式下“按角色适配概率”不会受到词条权重的影响</i></p>
                </div>
            </el-popover>
        </section-title>
        <div class="section-content">
            <el-radio class="sort" v-model="sortBy" label="tot">按圣遗物总分</el-radio>
            <el-radio class="sort" v-model="sortBy" label="prop">按角色适配率</el-radio>
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
.small {
    font-size: smaller;
    font-weight: normal;
    color: gray;
    margin-top: 5px;
}
.info-wrapper {
    font-size: 12px;

    p {
        margin: 4px;
    }
}
</style>