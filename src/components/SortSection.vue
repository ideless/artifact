<script lang="ts" setup>
import SectionTitle from './SectionTitle.vue';
import DropSelect from './DropSelect.vue';
import DropSelectPlus from './DropSelectPlus.vue';
import CharSelect from './CharSelect.vue';
import PresetLoader from './PresetLoader.vue';
import { computed, ref } from 'vue'
import { useStore } from '@/store';
import chs from '@/ys/locale/chs';
import { ArtifactScoreWeight } from "@/ys/artifact"
import ArtfactData from "@/ys/data/artifact"
import CharacterData from '@/ys/data/character';
const store = useStore()
// 排序方式
const sortByOptions = [
    { key: 'index', label: '不排序' },
    { key: 'cur', label: '按当前词条数' },
    { key: 'md', label: '按满级期望词条数' },
    { key: 'tot', label: '按圣遗物评分' },
    { key: 'prop', label: '按角色适配概率' },
]
const presetOptions = [
    { key: 'index', label: '不排序' },
    { key: 'cur', label: '按当前词条数' },
    { key: 'md', label: '按满级期望词条数' },
    { key: 'tot', label: '按圣遗物评分(预设)' },
    { key: 'prop', label: '按角色适配概率（预设）' },
]
const sortBy = computed<string>({
    get() { return store.state.sort.by },
    set(v) { store.commit('setSort', { key: 'by', value: v }) }
})

// 按角色适配概率（多人）
const charOptions = Object.keys(CharacterData)
    .map(key => ({ key, tip: '' }))
const char = computed<string[]>({
    get() { return store.state.sort.characters },
    set(v) { store.commit('setSort', { key: 'characters', value: v }) }
})
// 按角色适配概率（单人）
const setsOptions = Object.entries(chs.set).map(([key, val]) => ({
    key,
    label: val.name,
    icon: `./assets/artifacts/${key}/flower.webp`,
}))
const sets4 = computed<string[]>({
    get() { return store.state.sort.build.set[4] },
    set(v) { store.commit('setSort', { key: 'sets', value: v }) }
})
const sets2 = computed<string[]>({
    get() { return store.state.sort.build.set[2] },
    set(v) { store.commit('setSort', { key: 'sets', value: v }) }
})
const sandsOptions = ArtfactData.mainKeys.sands.map(m => ({
    key: m,
    label: chs.affix[m]
}))
const sands = computed<string[]>({
    get() { return store.state.sort.build.main.sands },
    set(v) { store.commit('setSort', { key: 'sands', value: v }) }
})
const gobletOptions = ArtfactData.mainKeys.goblet.map(m => ({
    key: m,
    label: chs.affix[m]
}))
const goblet = computed<string[]>({
    get() { return store.state.sort.build.main.goblet },
    set(v) { store.commit('setSort', { key: 'goblet', value: v }) }
})
const circletOptions = ArtfactData.mainKeys.circlet.map(m => ({
    key: m,
    label: chs.affix[m]
}))
const circlet = computed<string[]>({
    get() { return store.state.sort.build.main.circlet },
    set(v) { store.commit('setSort', { key: 'circlet', value: v }) }
})
// 按上位替代数
// 不排序
// *词条数

// 配装加载窗口
const showPresetLoader = ref(false)
const disablePreset = () => {
    store.state.usePreset = ''
    store.state.sort.by = 'tot'
    store.state.weight = new (ArtifactScoreWeight)
    ElNotification({
        type: 'success',
        title: '取消预设成功',
    })
}
</script>

<template>
    <div class="section">
         <section-title title="排序">
            <span v-show="store.state.usePreset==''" @click="showPresetLoader=true">预设</span>
            <span v-show="store.state.usePreset!=''" @click="disablePreset">当前预设：{{chs.character[store.state.usePreset]}}</span>
         </section-title>
        <div class="content">
            <drop-select class="row" v-if="!store.state.usePreset" v-model="sortBy" :options="sortByOptions" title="排序方式"/>
            <drop-select class="row" v-else v-model="sortBy" :options="presetOptions" title="排序方式"/>
            <div v-if="store.state.usePreset!=''">
                <p class="row small">圣遗物a对角色c的适配概率定义为，刷100个满级圣遗物，其中和a同部位同主词条的圣遗物得分均不超过a的满级期望得分的概率。如果a对c是散件则是200个。</p>
                <drop-select-plus class="row" v-model="sets4" :options="setsOptions" title="四件套套装偏好" :use-icon="true" />
                <drop-select-plus class="row" v-model="sets2" :options="setsOptions" title="二件套套装偏好" :use-icon="true" />
                <drop-select-plus class="row" v-model="sands" :options="sandsOptions" title="时之沙主词条偏好" />
                <drop-select-plus class="row" v-model="goblet" :options="gobletOptions" title="空之杯主词条偏好" />
                <drop-select-plus class="row" v-model="circlet" :options="circletOptions" title="理之冠主词条偏好" />
            </div>
            <div v-else-if="sortBy == 'prop'">
                <p class="row small">圣遗物a对角色c的适配概率定义为，刷100个满级圣遗物，其中和a同部位同主词条的圣遗物得分均不超过a的满级期望得分的概率。如果a对c是散件则是200个。</p>
                <p class="row small">根据<a href="https://ngabbs.com/read.php?tid=27859119"
                        target="_blank">推荐配装</a>为每个角色计算适配概率（自定义的词条权重不会生效），总的适配概率为所有选中角色适配概率的最大值。
                </p>
                <p class="row small">鼠标悬停在圣遗物上可以查看详细的计算结果。</p>
                <char-select class="row" title="角色" :options="charOptions" v-model="char" />
            </div>
            <div v-else-if="sortBy == 'index'">
            </div>
            <div v-else>
                <p class="row small">圣遗物的“词条数”是各个副词条数值除以单次平均提升量，再根据词条权重计算的加权和。</p>
            </div>
        </div>
    </div>
    <preset-loader v-model="showPresetLoader" />
</template>

<style lang="scss" scoped>
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
.content {
    margin-top: 24px;
    padding: 0 10px;

    .row {
        margin-top: 15px;
    }

    .small {
        font-size: 12px;
        color: gray;
        margin-top: 10px;
        text-align: center;
    }

    .text-btn {
        color: $primary-color;
        cursor: pointer;

        &:hover {
            text-decoration: underline;
        }
    }
}
</style>