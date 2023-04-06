<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import { ArtifactData } from "@/ys/data";
import { useArtifactStore } from "@/store";
import { Artifact } from "@/ys/artifact";
import { i18n } from "@/i18n";
import { choice } from "@/ys/utils";
import type { ISlotKey } from "@/ys/types";

const props = defineProps<{
    modelValue: boolean;
}>();
const emit = defineEmits<{
    (e: "update:modelValue", value: boolean): void;
}>();

const artStore = useArtifactStore();

const show = computed({
    get() {
        return props.modelValue;
    },
    set(value: boolean) {
        emit("update:modelValue", value);
    },
});
// 套装
const sets = ArtifactData.setKeys.map((key) => ({
    value: key,
    label: i18n.global.t("artifact.set." + key),
}));
const setCands = ref<string[]>([]);
// 部位
const slots = ArtifactData.slotKeys.map((key) => ({
    value: key,
    label: i18n.global.t("artifact.slot." + key),
}));
const slot = ref(""); // ''表示任意部位
watch(slot, () => {
    if (slot.value in ArtifactData.mainKeys) {
        if (
            !ArtifactData.mainKeys[slot.value as ISlotKey].includes(
                mainKey.value
            )
        )
            mainKey.value = "";
    } else {
        mainKey.value = "";
    }
});
// 主词条（可选项依赖部位）
const mains = computed(() => {
    if (slot.value in ArtifactData.mainKeys) {
        return ArtifactData.mainKeys[slot.value as ISlotKey].map(
            (key: string) => ({
                value: key,
                label: i18n.global.t("artifact.affix." + key),
            })
        );
    } else {
        return [];
    }
});
const mainKey = ref(""); // ''表示任意主词条
// 等级
const level = ref(0);
// 个数
const count = ref(1);
// 简单检查合法性
const valid = computed(() => {
    return setCands.value.length;
});
const save = () => {
    let artifacts: Artifact[] = [];
    for (let i = 0; i < count.value; ++i) {
        let set = choice(setCands.value),
            rarity = ArtifactData.setKeysR4.includes(set) ? 4 : 5;
        artifacts.push(
            Artifact.rand({
                set,
                slot: slot.value,
                mainKey: mainKey.value,
                rarity,
                level: level.value,
            })
        );
    }
    artStore.addArtifacts(artifacts);
    emit("update:modelValue", false);
};
</script>

<template>
    <el-dialog v-model="show" :title="$t('ui.rand_art_generator')" top="8vh">
        <el-row :gutter="20">
            <el-col :span="3">
                <span>{{ $t("ui.art_set") }}</span>
            </el-col>
            <el-col :span="21">
                <el-select
                    v-model="setCands"
                    multiple
                    clearable
                    style="width: 100%"
                >
                    <el-option
                        v-for="o in sets"
                        :value="o.value"
                        :label="o.label"
                    />
                </el-select>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="3">
                <span>{{ $t("ui.art_slot") }}</span>
            </el-col>
            <el-col :span="9">
                <el-select v-model="slot">
                    <el-option value="" :label="$t('ui.any')" />
                    <el-option
                        v-for="o in slots"
                        :value="o.value"
                        :label="o.label"
                    />
                </el-select>
            </el-col>
            <el-col :span="3">
                <span>{{ $t("ui.art_main") }}</span>
            </el-col>
            <el-col :span="9">
                <el-select v-model="mainKey">
                    <el-option value="" :label="$t('ui.any')" />
                    <el-option
                        v-for="o in mains"
                        :value="o.value"
                        :label="o.label"
                    />
                </el-select>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="3">
                <span>{{ $t("ui.art_level") }}</span>
            </el-col>
            <el-col :span="9">
                <el-input-number v-model="level" :min="0" :max="20" />
            </el-col>
            <el-col :span="3">
                <span>{{ $t("ui.count") }}</span>
            </el-col>
            <el-col :span="9">
                <el-input-number v-model="count" :min="1" />
            </el-col>
        </el-row>
        <el-row justify="center" style="margin-top: 30px">
            <el-button
                type="primary"
                :disabled="!valid"
                @click="save"
                v-text="$t('ui.confirm')"
            />
        </el-row>
    </el-dialog>
</template>

<style lang="scss"></style>
