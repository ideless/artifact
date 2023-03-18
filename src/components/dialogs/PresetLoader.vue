<script lang="ts" setup>
import { ref, computed } from "vue";
import { useArtifactStore } from "@/store";
import { PresetData, CharacterData } from "@/ys/data";
import { i18n } from "@/i18n";
import { MiscData } from "@/ys/data";

const artStore = useArtifactStore();

interface IOption {
    value: string | number;
    label: string;
}

const props = defineProps<{
    modelValue: boolean;
}>();
const emit = defineEmits<{
    (e: "update:modelValue", value: boolean): void;
}>();
const show = computed<boolean>({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit("update:modelValue", value);
    },
});
const element = ref("");
const character = ref("");
const characters = computed<IOption[]>(() => {
    let ret = [];
    for (let c in CharacterData) {
        if (CharacterData[c].element == element.value) {
            ret.push({
                value: c,
                label: i18n.global.t(`character.${c}`),
            });
        }
    }
    return ret;
});
const preset = ref("");
const presets = computed<IOption[]>(() => {
    let ret = [];
    for (let c in CharacterData) {
        if (c == character.value) {
            for (let i of CharacterData[c].presets) {
                ret.push({
                    value: i,
                    label: i,
                });
            }
            break;
        }
    }
    return ret;
});
const changeElement = () => {
    character.value = "";
    preset.value = "";
};
const changeCharacter = () => {
    preset.value = "";
};
const apply = () => {
    let w = PresetData[preset.value];
    if (w) {
        artStore.sort.weight = { ...w } as any;
    }
    emit("update:modelValue", false);
};
</script>

<template>
    <el-dialog :title="$t('ui.preset_loader_title')" v-model="show">
        <p class="info" v-html="$t('ui.preset_source')" />
        <el-row justify="space-between">
            <el-col :span="8" v-text="$t('ui.element')" />
            <el-col :span="8">
                <el-select v-model="element" @change="changeElement">
                    <el-option
                        v-for="e in MiscData.elementKeys"
                        :label="$t('element.' + e)"
                        :value="e"
                    />
                </el-select>
            </el-col>
        </el-row>
        <el-row justify="space-between">
            <el-col :span="8" v-text="$t('ui.character')" />
            <el-col :span="8">
                <el-select v-model="character" @change="changeCharacter">
                    <el-option
                        v-for="o in characters"
                        :label="o.label"
                        :value="o.value"
                    />
                </el-select>
            </el-col>
        </el-row>
        <el-row justify="space-between">
            <el-col :span="8" v-text="$t('ui.preset')" />
            <el-col :span="8">
                <el-select v-model="preset">
                    <el-option
                        v-for="o in presets"
                        :label="o.label"
                        :value="o.value"
                    />
                </el-select>
            </el-col>
        </el-row>
        <el-row justify="center" style="margin-top: 30px">
            <el-button
                type="primary"
                @click="apply"
                :disabled="!preset"
                v-text="$t('ui.confirm')"
            />
        </el-row>
    </el-dialog>
</template>
