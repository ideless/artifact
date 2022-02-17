<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import data from '../ys/data';
import chs from '../ys/locale/chs'
import { useStore } from '../store';
import { Affix, Artifact } from '../ys/artifact';
const props = defineProps<{
    modelValue: boolean,
    index: number
}>()
const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
}>()
const store = useStore()
const show = computed({
    get() {
        return props.modelValue
    },
    set(value: boolean) {
        emit('update:modelValue', value)
    }
})
const level = ref(0)
const minor1key = ref('')
const minor1value = ref(0)
const minor2key = ref('')
const minor2value = ref(0)
const minor3key = ref('')
const minor3value = ref(0)
const minor4key = ref('')
const minor4value = ref(0)
const affixes = data.minorKeys.map(key => ({
    value: key,
    label: chs.affix[key]
}))
watch(() => props.index, (index) => {
    if(index==-1){
        level.value=0
        minor1key.value = ''
        minor1value.value = 0
        minor2key.value = ''
        minor2value.value = 0
        minor3key.value = ''
        minor3value.value = 0
        minor4key.value = ''
        minor4value.value = 0
        return
    }else{
        for (let a of store.state.artifacts) {
            if (a.data.index === index) {
                level.value = a.level
                if (a.minors.length >= 1) {
                    minor1key.value = a.minors[0].key
                    minor1value.value = a.minors[0].value
                } else {
                    minor1key.value = ''
                    minor1value.value = 0
                }
                if (a.minors.length >= 2) {
                    minor2key.value = a.minors[1].key
                    minor2value.value = a.minors[1].value
                } else {
                    minor2key.value = ''
                    minor2value.value = 0
                }
                if (a.minors.length >= 3) {
                    minor3key.value = a.minors[2].key
                    minor3value.value = a.minors[2].value
                } else {
                    minor3key.value = ''
                    minor3value.value = 0
                }
                if (a.minors.length >= 4) {
                    minor4key.value = a.minors[3].key
                    minor4value.value = a.minors[3].value
                } else {
                    minor4key.value = ''
                    minor4value.value = 0
                }
                return
            }
        }
    }
})
const save = () => {
    if(props.index==-1){
        store.state.artifacts.push(new Artifact(
            //无圣遗物种类主词条等，待补充
        ))
    }else{
        for (let a of store.state.filteredArtifacts) {
            if (a.data.index === props.index) {
                let lv = level.value
                let minors = []
                if (minor1key.value && minor1value.value) {
                    minors.push(new Affix({
                        key: minor1key.value,
                        value: minor1value.value
                    }))
                }
                if (minor2key.value && minor2value.value) {
                    minors.push(new Affix({
                        key: minor2key.value,
                        value: minor2value.value
                    }))
                }
                if (minor3key.value && minor3value.value) {
                    minors.push(new Affix({
                        key: minor3key.value,
                        value: minor3value.value
                    }))
                }
                if (minor4key.value && minor4value.value) {
                    minors.push(new Affix({
                        key: minor4key.value,
                        value: minor4value.value
                    }))
                }
                store.dispatch('updArtifact', { index: props.index, level: lv, minors })
                break
            }
        }
    }
    emit('update:modelValue', false)
}
</script>

<template>
    <el-dialog v-model="show" title="属性编辑器">
        <el-divider>属性</el-divider>
        <el-row :gutter="20">
            <el-col :span="12">
                <span>等级</span>
            </el-col>
            <el-col :span="12" style="text-align: right;">
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
            <el-col :span="12" style="text-align: right;">
                <el-input-number v-model="minor1value" :precision="1" />
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-select v-model="minor2key">
                    <el-option v-for="o in affixes" :label="o.label" :value="o.value" />
                </el-select>
            </el-col>
            <el-col :span="12" style="text-align: right;">
                <el-input-number v-model="minor2value" :precision="1" />
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-select v-model="minor3key">
                    <el-option v-for="o in affixes" :label="o.label" :value="o.value" />
                </el-select>
            </el-col>
            <el-col :span="12" style="text-align: right;">
                <el-input-number v-model="minor3value" :precision="1" />
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-select v-model="minor4key">
                    <el-option v-for="o in affixes" :label="o.label" :value="o.value" />
                </el-select>
            </el-col>
            <el-col :span="12" style="text-align: right;">
                <el-input-number v-model="minor4value" :precision="1" />
            </el-col>
        </el-row>
        <el-row justify="center" style="margin-top: 30px;">
            <el-button type="primary" @click="save">保存</el-button>
        </el-row>
    </el-dialog>
</template>

<style lang="scss">
.el-row {
    margin: 10px 0;
}
</style>