<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import data from '../ys/data';
import chs from '../ys/locale/chs'
import { useStore } from '../store';
import { Affix, Artifact } from '../ys/artifact';
const props = defineProps<{
    modelValue: boolean,
    index: number,
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
const set = ref('')
const slot = ref('')
const mainkey = ref('')
const level = ref(0)
const minor1key = ref('')
const minor1value = ref(0)
const minor2key = ref('')
const minor2value = ref(0)
const minor3key = ref('')
const minor3value = ref(0)
const minor4key = ref('')
const minor4value = ref(0)
const mains = data.mainKeys
const minors = data.minorKeys.map(key => ({
    value: key,
    label: chs.affix[key]
}))
const sets = data.set.map(key => ({
    value: key,
    label: chs.set[key].name
}))
const slots = data.slot.map(key => ({
    value: key,
    label: chs.slot[key]
}))
const affnum = computed(() => {
    let a=new Artifact
    a.set=set.value
    a.slot=slot.value
    a.main.key=mainkey.value
    a.level=level.value
    a.minors.push(new Affix({key:minor1key.value,value: minor1value.value}))
    a.minors.push(new Affix({key:minor2key.value,value: minor2value.value}))
    a.minors.push(new Affix({key:minor3key.value,value: minor3value.value}))
    if(minor4key.value!=''){a.minors.push(new Affix({key:minor4key.value,value: minor4value.value}))}
    a.updateAffnum(store.state.weight)
    return {
        cur: a.data.affnum.cur.toFixed(2),
        avg: a.data.affnum.avg.toFixed(2),
        max: a.data.affnum.max.toFixed(2),
        md:  a.data.affnum.md.toFixed(2),
        tot: a.data.affnum.tot.toFixed(2),
        atk: a.data.score.attack.toFixed(1),
        hp: a.data.score.life.toFixed(1),
        def: a.data.score.defend.toFixed(1),
        er: a.data.score.recharge.toFixed(1),
        em: a.data.score.elementalMastery.toFixed(1),
        crit: a.data.score.critical.toFixed(1),
    }
})

watch(() => props.index, (index) => {
    for (let a of store.state.artifacts) {
        if (a.data.index === index) {
            set.value = a.set
            slot.value = a.slot
            mainkey.value = a.main.key
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
})
const save = () => {
    for (let a of store.state.filteredArtifacts) {
        if (a.data.index === props.index) {
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
            store.dispatch('updArtifact', { index: props.index, set: set.value, slot: slot.value, mainkey: mainkey.value, level: level.value, minors })
            break
        }
    }
    emit('update:modelValue', false)
}
</script>

<template>
    <el-dialog v-model="show" title="属性编辑器">
        <el-divider>属性</el-divider>
        <el-row :gutter="20">
            <el-col :span="3">
                <span>套装</span>
            </el-col>
            <el-col :span="9">
                <el-select v-model="set">
                    <el-option v-for="o in sets" :label="o.label" :value="o.value" />
                </el-select>
            </el-col>
            <el-col :span="3">
                <span>部位</span>
            </el-col>
            <el-col :span="9">
                <el-select v-model="slot">
                    <el-option v-for="o in slots" :label="o.label" :value="o.value" />
                </el-select>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="3">
                <span>主词条</span>
            </el-col>
            <el-col :span="9">
                <el-select v-model="mainkey">
                    <el-option v-for="o in mains[slot]" :label="chs.affix[o]" :value="o" />
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
            <el-col :span="10">
                <el-select v-model="minor1key">
                    <el-option v-for="o in minors" :label="o.label" :value="o.value" />
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-input-number v-model="minor1value" :precision="1" />
            </el-col>
            <el-col :span="6" style="text-align: right;">
                <span>{{ affnum.atk}}攻 | {{ affnum.hp}}生 | {{ affnum.def}}防</span>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="10">
                <el-select v-model="minor2key">
                    <el-option v-for="o in minors" :label="o.label" :value="o.value" />
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-input-number v-model="minor2value" :precision="1" />
            </el-col>
            <el-col :span="6" style="text-align: right;">
                <span>{{ affnum.crit}}暴 | {{ affnum.er}}充 | {{ affnum.em}}精</span>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="10">
                <el-select v-model="minor3key">
                    <el-option v-for="o in minors" :label="o.label" :value="o.value" />
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-input-number v-model="minor3value" :precision="1" />
            </el-col>
            <el-col :span="6" style="text-align: right;">
                <span>当前{{ affnum.cur}} | 期望{{ affnum.avg}} | 最大{{ affnum.max}}</span>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="10">
                <el-select v-model="minor4key">
                    <el-option v-for="o in minors" :label="o.label" :value="o.value" />
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-input-number v-model="minor4value" :precision="1" />
            </el-col>
            <el-col :span="6" style="text-align: right;">
                <span>副词条得分 {{ affnum.md}} | 总分 {{ affnum.tot}}</span>
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