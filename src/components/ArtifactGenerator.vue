<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import ArtifactData from "@/ys/data/artifact"
import chs from '@/ys/locale/chs'
import { useStore } from '@/store';
import { Artifact } from '@/ys/artifact';
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
// 套装
const sets = Object.entries(chs.set).map(([key, label]) => ({
    value: key,
    label,
}))
const setCands = ref<string[]>([])
// 部位
const slots = Object.entries(chs.slot).map(([key, val]) => ({
    value: key,
    label: val
}))
const slot = ref('') // ''表示任意部位
watch(slot, () => {
    if (slot.value in ArtifactData.mainKeys) {
        if (!ArtifactData.mainKeys[slot.value].includes(mainKey.value))
            mainKey.value = ''
    } else {
        mainKey.value = ''
    }
})
// 主词条（可选项依赖部位）
const mains = computed(() => {
    if (slot.value in ArtifactData.mainKeys) {
        return ArtifactData.mainKeys[slot.value].map((key: string) => ({
            value: key,
            label: chs.affix[key]
        }))
    } else {
        return []
    }
})
const mainKey = ref('') // ''表示任意主词条
// 等级
const level = ref(0)
// 个数
const count = ref(1)
// 简单检查合法性
const valid = computed(() => {
    return setCands.value.length
})
const save = () => {
    let artifacts: Artifact[] = []
    for (let i = 0; i < count.value; ++i) {
        artifacts.push(Artifact.rand({
            sets: setCands.value,
            slot: slot.value,
            mainKey: mainKey.value,
            level: level.value,
        }))
    }
    store.dispatch('addArtifacts', { artifacts })
    emit('update:modelValue', false)
}
</script>

<template>
    <el-dialog v-model="show" title="随机圣遗物生成器" top="8vh">
        <el-row :gutter="20">
            <el-col :span="3">
                <span>套装</span>
            </el-col>
            <el-col :span="21">
                <el-select v-model="setCands" multiple clearable style="width:100%;">
                    <el-option v-for="o in sets" :value="o.value" :label="o.label" />
                </el-select>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="3">
                <span>部位</span>
            </el-col>
            <el-col :span="9">
                <el-select v-model="slot">
                    <el-option value="" label="任意" />
                    <el-option v-for="o in slots" :value="o.value" :label="o.label" />
                </el-select>
            </el-col>
            <el-col :span="3">
                <span>主词条</span>
            </el-col>
            <el-col :span="9">
                <el-select v-model="mainKey">
                    <el-option value="" label="任意" />
                    <el-option v-for="o in mains" :value="o.value" :label="o.label" />
                </el-select>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="3">
                <span>等级</span>
            </el-col>
            <el-col :span="9">
                <el-input-number v-model="level" :min="0" :max="20" />
            </el-col>
            <el-col :span="3">
                <span>个数</span>
            </el-col>
            <el-col :span="9">
                <el-input-number v-model="count" :min="1" />
            </el-col>
        </el-row>
        <el-row justify="center" style="margin-top: 30px;">
            <el-button type="primary" :disabled="!valid" @click="save">生成</el-button>
        </el-row>
    </el-dialog>
</template>

<style lang="scss">
</style>