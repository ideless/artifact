<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useStore } from '../store';
import chs from '../ys/locale/chs'
import Preset from '../ys/preset';

const store = useStore()

interface IOption {
    value: string | number
    label: string
}

const props = defineProps<{
    modelValue: boolean
}>()
const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
}>()
const show = computed<boolean>({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})
const element = ref("")
const character = ref("")
const characters = computed<IOption[]>(() => {
    let ret = []
    for (let c of Preset.characters) {
        if (c.element == element.value) {
            ret.push({
                value: c.key,
                label: chs.character[c.key]
            })
        }
    }
    return ret
})
const preset = ref("")
const presets = computed<IOption[]>(() => {
    let ret = []
    for (let c of Preset.characters) {
        if (c.key == character.value) {
            for (let i of c.presets) {
                ret.push({
                    value: i,
                    label: chs.preset[i]
                })
            }
            break
        }
    }
    return ret
})
const changeElement = () => {
    character.value = ""
    preset.value = ""
}
const changeCharacter = () => {
    preset.value = ""
}
const applyDisabled = computed(() => {
    return preset.value == ""
})
const apply = () => {
    if (typeof preset.value == 'number') {
        let w=Preset.presets[preset.value]
        w['hpprop']=0.5
        w['defprop']=0.5
        w['main']=0.5
        w['set']=0.3
        store.commit('usePreset', { weight: w })
        emit('update:modelValue', false)
    }
}
</script>

<template>
    <el-dialog title="词条权重预设" v-model="show">
        <el-row justify="space-between">
            <el-col :span="8">元素类型</el-col>
            <el-col :span="8">
                <el-select v-model="element" @change="changeElement">
                    <el-option v-for="(label, value) in chs.element" :label="label" :value="value" />
                </el-select>
            </el-col>
        </el-row>
        <el-row justify="space-between">
            <el-col :span="8">角色</el-col>
            <el-col :span="8">
                <el-select v-model="character" @change="changeCharacter">
                    <el-option v-for="o in characters" :label="o.label" :value="o.value" />
                </el-select>
            </el-col>
        </el-row>
        <el-row justify="space-between">
            <el-col :span="8">预设</el-col>
            <el-col :span="8">
                <el-select v-model="preset">
                    <el-option v-for="o in presets" :label="o.label" :value="o.value" />
                </el-select>
            </el-col>
        </el-row>
        <el-row justify="center" style="margin-top: 30px;">
            <el-button type="primary" @click="apply" :disabled="applyDisabled">应用</el-button>
        </el-row>
    </el-dialog>
</template>