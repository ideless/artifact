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
                    label: i,
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
    let w=Preset.presets[preset.value]
    w['hpprop']=0
    w['defprop']=0
    w['main']=1
    w['set']=1
    store.commit('usePreset', { charKey: character.value, weight: w })
    emit('update:modelValue', false)
}
</script>

<template>
    <el-dialog title="词条权重预设" v-model="show">
    <p class="info">
            配装数据来自
            <a href="https://ngabbs.com/read.php?tid=27859119">全角色圣遗物及武器搭配简述 [NGA]</a>
            ，权重由
            <a href="https://bbs.nga.cn/read.php?tid=25843014">全角色收益曲线 [NGA]</a>计算
        </p>
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