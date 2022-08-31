<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import ArtifactData from "@/ys/data/artifact"
import chs from '@/ys/locale/chs'
import { useStore } from '@/store';
import { Affix, Artifact } from '@/ys/artifact';
import ArtifactCard from './ArtifactCard.vue';
const props = defineProps<{
    modelValue: boolean,
}>()
const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
}>()
const store = useStore()
const show = computed({
    get() { return props.modelValue },
    set(value: boolean) { emit('update:modelValue', value) }
})
const affixes = ArtifactData.minorKeys.map(key => ({
    value: key,
    label: chs.affix[key]
}))
// 圣遗物对象
const art = ref<Artifact>(new Artifact({
    slot: 'flower',
    mainKey: 'hp',
}))
const updartAffnum = () => {
    art.value.updateAffnum(store.state.weight)
}
// 套装
const sets = Object.entries(chs.set).map(([key, val]) => ({
    value: key,
    label: val.name
}))
// 部位
const slots = Object.entries(chs.slot).map(([key, val]) => ({
    value: key,
    label: val
}))
const slot = computed({
    get() { return art.value.slot },
    set(newSlot: string) {
        art.value.slot = newSlot
        // 自动纠正主词条
        if (!ArtifactData.mainKeys[newSlot].includes(art.value.mainKey)) {
            art.value.mainKey = ArtifactData.mainKeys[newSlot][0]
        }
    }
})
// 主词条（可选项依赖部位）
const mains = computed(() => {
    if (art.value.slot in ArtifactData.mainKeys) {
        return ArtifactData.mainKeys[art.value.slot].map((key: string) => ({
            value: key,
            label: chs.affix[key]
        }))
    } else {
        return []
    }
})
// 等级
const level = computed<number>({
    get() { return art.value.level },
    set(value) {
        art.value.level = value
        updartAffnum()
    }
})
// 副词条（这里就不检查合法性了，太麻烦）
const minor1key = computed<string>({
    get() {
        return art.value.minors.length >= 1 ? art.value.minors[0].key : ''
    },
    set(key) {
        if (art.value.minors.length >= 1) art.value.minors[0].key = key
        else art.value.minors.push(new Affix({ key, value: 0 }))
        updartAffnum()
    }
})
const minor1value = computed<number>({
    get() { return art.value.minors.length >= 1 ? art.value.minors[0].value : 0 },
    set(value) {
        if (art.value.minors.length >= 1) art.value.minors[0].value = value
        else art.value.minors.push(new Affix({ key: 'atk', value }))
        updartAffnum()
    }
})
const minor2key = computed<string>({
    get() { return art.value.minors.length >= 2 ? art.value.minors[1].key : '' },
    set(key) {
        if (art.value.minors.length >= 2) art.value.minors[1].key = key
        else art.value.minors.push(new Affix({ key, value: 0 }))
        updartAffnum()
    }
})
const minor2value = computed<number>({
    get() { return art.value.minors.length >= 2 ? art.value.minors[1].value : 0 },
    set(value) {
        if (art.value.minors.length >= 2) art.value.minors[1].value = value
        else art.value.minors.push(new Affix({ key: 'atk', value }))
        updartAffnum()
    }
})
const minor3key = computed<string>({
    get() { return art.value.minors.length >= 3 ? art.value.minors[2].key : '' },
    set(key) {
        if (art.value.minors.length >= 3) art.value.minors[2].key = key
        else art.value.minors.push(new Affix({ key, value: 0 }))
        updartAffnum()
    }
})
const minor3value = computed<number>({
    get() { return art.value.minors.length >= 3 ? art.value.minors[2].value : 0 },
    set(value) {
        if (art.value.minors.length >= 3) art.value.minors[2].value = value
        else art.value.minors.push(new Affix({ key: 'atk', value }))
        updartAffnum()
    }
})
const minor4key = computed<string>({
    get() { return art.value.minors.length >= 4 ? art.value.minors[3].key : '' },
    set(key) {
        if (key == '') {
            // 删除
            if (art.value.minors.length == 4) {
                art.value.minors.pop()
            }
        } else {
            if (art.value.minors.length >= 4) art.value.minors[3].key = key
            else art.value.minors.push(new Affix({ key, value: 0 }))
        }
        updartAffnum()
    }
})
const minor4value = computed<number>({
    get() { return art.value.minors.length >= 4 ? art.value.minors[3].value : 0 },
    set(value) {
        if (art.value.minors.length >= 4) art.value.minors[3].value = value
        else art.value.minors.push(new Affix({ key: 'atk', value }))
        updartAffnum()
    }
})
// 简单检查圣遗物合法性，如果合法就添加该圣遗物
const valid = computed(() => {
    return art.value.set in chs.set && art.value.minors.length >= 3
})
const save = () => {
    // 必须新建一个对象
    let artifact = new Artifact({
        set: art.value.set,
        slot: art.value.slot,
        level: art.value.level,
        mainKey: art.value.mainKey,
        minors: art.value.minors.map(m => new Affix(m))
    })
    store.dispatch('addArtifacts', { artifacts: [artifact] })
    emit('update:modelValue', false)
}
</script>

<template>
    <el-dialog v-model="show" title="手动添加圣遗物" top="8vh">
        <el-divider>主要属性</el-divider>
        <el-row :gutter="20">
            <el-col :span="3">
                <span>套装</span>
            </el-col>
            <el-col :span="9">
                <el-select v-model="art.set">
                    <el-option v-for="o in sets" :value="o.value" :label="o.label" />
                </el-select>
            </el-col>
            <el-col :span="3">
                <span>主词条</span>
            </el-col>
            <el-col :span="9">
                <el-select v-model="art.mainKey">
                    <el-option v-for="o in mains" :value="o.value" :label="o.label" />
                </el-select>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="3">
                <span>部位</span>
            </el-col>
            <el-col :span="9">
                <el-select v-model="slot">
                    <el-option v-for="o in slots" :value="o.value" :label="o.label" />
                </el-select>
            </el-col>
            <el-col :span="3">
                <span>等级</span>
            </el-col>
            <el-col :span="9">
                <el-input-number v-model="level" :min="0" :max="20" />
            </el-col>
        </el-row>
        <el-divider>副词条</el-divider>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-select v-model="minor1key">
                    <el-option v-for="o in affixes" :label="o.label" :value="o.value" />
                </el-select>
            </el-col>
            <el-col :span="12">
                <el-input-number v-model="minor1value" :precision="1" />
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-select v-model="minor2key">
                    <el-option v-for="o in affixes" :label="o.label" :value="o.value" />
                </el-select>
            </el-col>
            <el-col :span="12">
                <el-input-number v-model="minor2value" :precision="1" />
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-select v-model="minor3key">
                    <el-option v-for="o in affixes" :label="o.label" :value="o.value" />
                </el-select>
            </el-col>
            <el-col :span="12">
                <el-input-number v-model="minor3value" :precision="1" />
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-select v-model="minor4key">
                    <el-option label="空" value=""></el-option>
                    <el-option v-for="o in affixes" :label="o.label" :value="o.value" />
                </el-select>
            </el-col>
            <el-col :span="12">
                <el-input-number v-model="minor4value" :precision="1" />
            </el-col>
        </el-row>
        <el-divider>预览</el-divider>
        <el-row justify="center">
            <artifact-card :artifact="art" :readonly="true" />
        </el-row>
        <el-row justify="center" style="margin-top: 30px;">
            <el-button type="primary" :readonly="!valid" @click="save">添加</el-button>
        </el-row>
    </el-dialog>
</template>

<style lang="scss">
</style>