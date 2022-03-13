<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import data from '../ys/data';
import chs from '../ys/locale/chs'
import { useStore } from '../store';
import { Affix, Artifact } from '../ys/artifact';
import ArtifactCard from './ArtifactCard.vue';
import preset from '../ys/preset';
const props = defineProps<{
    modelValue: boolean,
    index: number
}>()
const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
}>()
const store = useStore()
const show = computed({
    get() { return props.modelValue },
    set(value: boolean) { emit('update:modelValue', value) }
})
const characters = computed(() => {
    let tmp: { [key: string]: string[] } = {}
    for (let c of preset.characters) {
        if (c.element in tmp) {
            tmp[c.element].push(c.key)
        } else {
            tmp[c.element] = [c.key]
        }
    }
    let ret = [{
        label: '',
        options: [{ value: '', label: '闲置' }]
    }]
    for (let element in tmp) {
        ret.push({
            label: chs.element[element] || '',
            options: tmp[element].map(key => ({
                value: key,
                label: chs.character[key]
            }))
        })
    }
    return ret
})
const affixes = data.minorKeys.map(key => ({
    value: key,
    label: chs.affix[key]
}))
let equiped: { [key: string]: { [key: string]: boolean } } = {}
const modified = ref(false)
const newArt = ref<Artifact>(new Artifact())
const updNewArtAffnum = () => {
    modified.value = true
    newArt.value.updateAffnum(store.state.weight)
}
const oldArt = computed<Artifact>(() => {
    // reset equiped
    for (let c of preset.characters) {
        equiped[c.key] = { flower: false, plume: false, sands: false, goblet: false, circlet: false }
    }
    let ret = new Artifact()
    for (let a of store.state.artifacts) {
        if (a.data.index === props.index) {
            newArt.value = new Artifact(a)
            newArt.value.data.affnum = { ...a.data.affnum }
            ret = a
        }
        if (a.location in equiped) {
            equiped[a.location][a.slot] = true
        }
    }
    modified.value = false
    return ret
})
const location = computed<string>({
    get() { return newArt.value.location },
    set(value) {
        newArt.value.location = value
        modified.value = true
    }
})
const level = computed<number>({
    get() { return newArt.value.level },
    set(value) {
        newArt.value.level = value
        updNewArtAffnum()
    }
})
const minor1key = computed<string>({
    get() {
        return newArt.value.minors.length >= 1 ? newArt.value.minors[0].key : ''
    },
    set(key) {
        if (newArt.value.minors.length >= 1) newArt.value.minors[0].key = key
        else newArt.value.minors.push(new Affix({ key, value: 0 }))
        updNewArtAffnum()
    }
})
const minor1value = computed<number>({
    get() { return newArt.value.minors.length >= 1 ? newArt.value.minors[0].value : 0 },
    set(value) {
        if (newArt.value.minors.length >= 1) newArt.value.minors[0].value = value
        else newArt.value.minors.push(new Affix({ key: 'atk', value }))
        updNewArtAffnum()
    }
})
const minor2key = computed<string>({
    get() { return newArt.value.minors.length >= 2 ? newArt.value.minors[1].key : '' },
    set(key) {
        if (newArt.value.minors.length >= 2) newArt.value.minors[1].key = key
        else newArt.value.minors.push(new Affix({ key, value: 0 }))
        updNewArtAffnum()
    }
})
const minor2value = computed<number>({
    get() { return newArt.value.minors.length >= 2 ? newArt.value.minors[1].value : 0 },
    set(value) {
        if (newArt.value.minors.length >= 2) newArt.value.minors[1].value = value
        else newArt.value.minors.push(new Affix({ key: 'atk', value }))
        updNewArtAffnum()
    }
})
const minor3key = computed<string>({
    get() { return newArt.value.minors.length >= 3 ? newArt.value.minors[2].key : '' },
    set(key) {
        if (newArt.value.minors.length >= 3) newArt.value.minors[2].key = key
        else newArt.value.minors.push(new Affix({ key, value: 0 }))
        updNewArtAffnum()
    }
})
const minor3value = computed<number>({
    get() { return newArt.value.minors.length >= 3 ? newArt.value.minors[2].value : 0 },
    set(value) {
        if (newArt.value.minors.length >= 3) newArt.value.minors[2].value = value
        else newArt.value.minors.push(new Affix({ key: 'atk', value }))
        updNewArtAffnum()
    }
})
const minor4key = computed<string>({
    get() { return newArt.value.minors.length >= 4 ? newArt.value.minors[3].key : '' },
    set(key) {
        if (newArt.value.minors.length >= 4) newArt.value.minors[3].key = key
        else newArt.value.minors.push(new Affix({ key, value: 0 }))
        updNewArtAffnum()
    }
})
const minor4value = computed<number>({
    get() { return newArt.value.minors.length >= 4 ? newArt.value.minors[3].value : 0 },
    set(value) {
        if (newArt.value.minors.length >= 4) newArt.value.minors[3].value = value
        else newArt.value.minors.push(new Affix({ key: 'atk', value }))
        updNewArtAffnum()
    }
})
const toSwap = computed(() => {
    return oldArt.value.location != newArt.value.location && newArt.value.location && equiped[newArt.value.location][newArt.value.slot]
})
const equipMsg = computed<string>(() => {
    if (toSwap.value) {
        let char_name = chs.character[newArt.value.location]
        if (oldArt.value.location) {
            return `将与 ${char_name} 的圣遗物对调`
        } else {
            return `将替换 ${char_name} 的圣遗物`
        }
    } else {
        return ''
    }
})
const save = () => {
    store.dispatch('updArtifact', { index: props.index, newArt: newArt.value, toSwap: toSwap.value })
    emit('update:modelValue', false)
}
</script>

<template>
    <el-dialog v-model="show" title="属性编辑器" top="8vh">
        <el-divider>属性</el-divider>
        <el-row :gutter="20">
            <el-col :span="12">
                <span>角色</span>
            </el-col>
            <el-col :span="12" style="text-align: right;">
                <el-select v-model="location">
                    <el-option-group v-for="g in characters" :label="g.label">
                        <el-option v-for="o in g.options" :value="o.value" :label="o.label" />
                    </el-option-group>
                </el-select>
            </el-col>
        </el-row>
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
        <el-divider>预览</el-divider>
        <el-row justify="center">
            <artifact-card :artifact="oldArt" :disabled="true" />
            <div class="art-preview-split" v-show="modified">⇒</div>
            <artifact-card :artifact="newArt" :disabled="true" v-show="modified" />
        </el-row>
        <p class="equip-msg">{{ equipMsg }}</p>
        <el-row justify="center" style="margin-top: 30px;">
            <el-button type="primary" @click="save">保存</el-button>
        </el-row>
    </el-dialog>
</template>

<style lang="scss">
.el-row {
    margin: 10px 0;
    align-items: center;
}
.art-preview-split {
    margin: 20px;
}
.equip-msg {
    text-align: center;
    font-weight: normal;
    font-size: smaller;
}
</style>