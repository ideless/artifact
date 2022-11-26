<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useStore } from '@/store';
import chs from '@/ys/locale/chs'
import CharacterData from '@/ys/data/character';

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
    for (let c in CharacterData) {
        if (CharacterData[c].element == element.value) {
            ret.push({
                value: c,
                label: chs.character[c]
            })
        }
    }
    return ret
})
const changeElement = () => {
    character.value = ""
}
const valid = computed(() => {
    return character.value in CharacterData
})
const apply = () => {
    store.commit('useBuild', { charKey: character.value })
    emit('update:modelValue', false)
}
</script>

<template>
    <el-dialog title="词条权重预设" v-model="show">
        <p class="info">
            数据来自
            <a href="https://ngabbs.com/read.php?tid=27859119">全角色圣遗物及武器搭配简述 [NGA]</a>
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
                <el-select v-model="character">
                    <el-option v-for="o in characters" :label="o.label" :value="o.value" />
                </el-select>
            </el-col>
        </el-row>
        <el-row justify="center" style="margin-top: 30px;">
            <el-button type="primary" @click="apply" :disabled="!valid">应用</el-button>
        </el-row>
    </el-dialog>
</template>