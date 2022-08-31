<script lang="ts" setup>
import SectionTitle from './SectionTitle.vue';
import DropSelectPlus from './DropSelectPlus.vue';
import CharSelect from './CharSelect.vue';
import RangeSlider from './RangeSlider.vue';
import chs from '@/ys/locale/chs';
import { computed, watch } from 'vue';
import { useStore } from '@/store';
import { Artifact } from '@/ys/artifact';
import ArtfactData from "@/ys/data/artifact"
import CharacterData from '@/ys/data/character';
const store = useStore()
const pro = computed<boolean>({
    get() { return store.state.filter.pro },
    set(v) { store.commit('setFilter', { key: 'pro', value: v }) }
})
function countArtifactAttr(key: keyof Artifact) {
    let c: { [key: string]: number } = {}
    for (let a of store.state.artifacts) {
        let akey = a[key].toString()
        c[akey] = (akey in c) ? c[akey] + 1 : 1
    }
    return c
}
// 套装
const setOptions = computed(() => {
    let c = countArtifactAttr('set')
    return Object.keys(chs.set)
        .filter(key => key in c)
        .map(key => ({
            key,
            label: chs.set[key].name,
            icon: `./assets/artifacts/${key}/flower.webp`,
            tip: c[key].toString(),
        }))
})
const set = computed<string[]>({
    get() { return store.state.filter.set },
    set(v) { store.commit('setFilter', { key: 'set', value: v }) }
})
// 部位
const slotOptions = computed(() => {
    let c = countArtifactAttr('slot')
    return Object.keys(chs.slot)
        .filter(key => key in c)
        .map(key => ({
            key,
            label: chs.slot[key],
            icon: `./assets/game_icons/${key}.webp`,
            tip: c[key].toString(),
        }))
})
const slot = computed<string[]>({
    get() { return store.state.filter.slot },
    set(v) { store.commit('setFilter', { key: 'slot', value: v }) }
})
// 主词条
const mainOptions = computed(() => {
    let c = countArtifactAttr('mainKey')
    return ArtfactData.mainKeys.all
        .filter(key => key in c)
        .map(key => ({
            key,
            label: chs.affix[key],
            tip: c[key].toString(),
        }))
})
const main = computed<string[]>({
    get() { return store.state.filter.main },
    set(v) { store.commit('setFilter', { key: 'main', value: v }) }
})
// 锁
const lockOptions = computed(() => {
    let c = countArtifactAttr('lock')
    return ['true', 'false']
        .filter(key => key in c)
        .map(key => ({
            key,
            label: key == 'true' ? '加锁' : '解锁',
            tip: c[key].toString(),
        }))
})
const lock = computed<string[]>({
    get() { return store.state.filter.lock },
    set(v) { store.commit('setFilter', { key: 'lock', value: v }) }
})
// 等级
const lvRange = computed<number[]>({
    get() { return store.state.filter.lvRange },
    set(v) { store.commit('setFilter', { key: 'lvRange', value: v }) }
})
// 得分
const score = computed<number[]>({
    get() { return store.state.filter.score },
    set(v) { store.commit('setFilter', { key: 'score', value: v }) }
})
// 佩戴角色
const charOptions = computed(() => {
    let c = countArtifactAttr('location')
    return ['', 'Traveler'].concat(Object.keys(CharacterData))
        .filter(key => key in c)
        .map(key => ({
            key,
            tip: c[key].toString(),
        }))
})
const char = computed<string[]>({
    get() { return store.state.filter.location },
    set(v) { store.commit('setFilter', { key: 'location', value: v }) }
})
// 必须包含和不得包含的副词条
const minorOptions = ArtfactData.minorKeys.map(key => ({
    key,
    label: chs.affix[key]
}))
const minorMustHave = computed<string[]>({
    get() { return store.state.filter.minorMustHave },
    set(v) { store.commit('setFilter', { key: 'minorMustHave', value: v }) }
})
const minorMustNotHave = computed<string[]>({
    get() { return store.state.filter.minorMustNotHave },
    set(v) { store.commit('setFilter', { key: 'minorMustNotHave', value: v }) }
})
// 更新，填充
watch(() => store.state.nResetFilter, () => {
    store.commit('setFilter', { key: 'set', value: setOptions.value.map(o => o.key) })
    store.commit('setFilter', { key: 'slot', value: slotOptions.value.map(o => o.key) })
    store.commit('setFilter', { key: 'main', value: mainOptions.value.map(o => o.key) })
    store.commit('setFilter', { key: 'lock', value: lockOptions.value.map(o => o.key) })
    store.commit('setFilter', { key: 'lvRange', value: [0, 20] })
    store.commit('setFilter', { key: 'location', value: charOptions.value.map(o => o.key) })
})
const disableFilterBatch = () => {
    store.commit('filterBatchIndex', -1)
    ElNotification({
        type: 'success',
        title: '取消过滤规则成功',
    })
}
</script>


<template>
    <div class="section">
        <section-title title="筛选">
            <span v-show="pro && store.state.useFilterBatch == -1" @click="pro = false">基本</span>
            <span v-show="!pro && store.state.useFilterBatch == -1" @click="pro = true">高级</span>
        </section-title>
        <div class="filter-detail" v-show="store.state.useFilterBatch != -1">
            {{ store.state.useFilterBatch != -1 ? '当前过滤规则：' + (store.state.filterBatch[store.state.useFilterBatch].comment ? store.state.filterBatch[store.state.useFilterBatch].comment : '无名称注释') : '' }}
        </div>
        <div class="section-content" v-show="store.state.useFilterBatch == -1">
            <drop-select-plus class="filter" title="套装" :options="setOptions" v-model="set" :use-icon="true" />
            <drop-select-plus class="filter" title="部位" :options="slotOptions" v-model="slot" :use-icon="true" />
            <range-slider class="filter" title="等级" v-model="lvRange" />
            <div v-show="pro">            
                <drop-select-plus class="filter" title="主词条" :options="mainOptions" v-model="main" />
                <char-select class="filter" title="角色" :options="charOptions" v-model="char" />
                <range-slider class="filter" title="当前排序得分" v-model="score" v-show='store.state.sort.by!="index"'/>                    
                <drop-select-plus class="filter" title="锁" :options="lockOptions" v-model="lock" />
                <drop-select-plus class="filter" title="必须包含的副词条" :options="minorOptions" v-model="minorMustHave" />
                <drop-select-plus class="filter" title="不得包含的副词条" :options="minorOptions" v-model="minorMustNotHave" />
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.filter {
    margin-top: 15px;
}
.check {
    --el-checkbox-font-size: 16px;
    // --el-checkbox-font-weight: bold;
    // --el-checkbox-text-color: #444;
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
.filter-detail {
    display: flex;
    justify-content: center;
    padding: 10px 0px;
    color: #A00008
}
</style>