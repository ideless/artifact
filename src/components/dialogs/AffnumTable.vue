<script lang="ts" setup>
import { computed, ref, reactive } from "vue";
import { useArtifactStore, useUiStore } from "@/store";
import { Delete, Edit, Plus, InfoFilled } from "@element-plus/icons-vue";
import { ArtifactData } from "@/ys/data";
import { i18n } from "@/i18n";
import type { ISlotKey } from "@/ys/types";

const props = defineProps<{
    modelValue: boolean;
}>();
const emit = defineEmits<{
    (e: "update:modelValue", value: boolean): void;
}>();
const show = computed({
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value),
});

const activeTab = ref("set_bonus");
const artStore = useArtifactStore();
const uiStore = useUiStore();

// set bonus
const setBonusTableData = computed(() => {
    return Object.entries(artStore.setBonusTable).map(([key, value]) => ({
        set: key,
        types: value,
    }));
});
const setBonusActiveSet = ref("");
const showSetBonusEditor = ref(false);
const setBonusFormEl = ref();
const setBonusForm = reactive({
    set: "",
    types: [] as string[],
});
const setBonusFormRules = {
    set: uiStore.getFormRule(),
    types: uiStore.getFormRule(),
};
const setBonusSetKeys = computed(() => {
    if (setBonusActiveSet.value) return [setBonusActiveSet.value];
    else
        return ["*"].concat(
            ArtifactData.setKeys.filter(
                (key) => !(key in artStore.setBonusTable)
            )
        );
});
function editSetBonusRule(setKey: string) {
    setBonusActiveSet.value = setKey;
    setBonusForm.set = setKey;
    setBonusForm.types = artStore.setBonusTable[setKey];
    showSetBonusEditor.value = true;
}
function delSetBonusRule(setKey: string) {
    if (!(setKey in artStore.setBonusTable)) return;
    uiStore
        .popConfirm(i18n.global.t("ui.confirm_del_set_bonus"))
        .then(() => {
            delete artStore.setBonusTable[setKey];
        })
        .catch(() => {});
}
function addSetBonusRule() {
    setBonusActiveSet.value = "";
    setBonusForm.set = "";
    setBonusForm.types = [];
    showSetBonusEditor.value = true;
}
async function submitSetBonusForm(formEl: any) {
    await formEl.validate((valid: boolean) => {
        if (!valid) return;
        artStore.setBonusTable[setBonusForm.set] = [...setBonusForm.types];
        showSetBonusEditor.value = false;
    });
}

// affix weight
const showAffixWeightEditor = ref(false);
const affixWeightFormEl = ref();
const affixWeightForm = reactive({
    set: "",
    type: "",
    label: "",
    weightJson: "",
});
const affixWeightFormRules = {
    set: uiStore.getFormRule(),
    type: uiStore.getFormRule(),
    label: uiStore.getFormRule(false),
    weightJson: uiStore.getFormRule(true, uiStore.affixWeightJsonValidator),
};
const affixWeightActiveIdx = ref(-1);
function editAffixWeightRule(idx: number) {
    affixWeightActiveIdx.value = idx;
    affixWeightForm.set = artStore.affixWeightTable[idx].set;
    affixWeightForm.type = artStore.affixWeightTable[idx].type;
    affixWeightForm.label = artStore.affixWeightTable[idx].label;
    affixWeightForm.weightJson = JSON.stringify(
        artStore.affixWeightTable[idx].weight
    );
    showAffixWeightEditor.value = true;
}
function delAffixWeightRule(idx: number) {
    uiStore
        .popConfirm(i18n.global.t("ui.confirm_del_affix_weight"))
        .then(() => {
            artStore.affixWeightTable.splice(idx, 1);
        })
        .catch(() => {});
}
function addAffixWeightRule() {
    affixWeightActiveIdx.value = -1;
    affixWeightForm.set = "";
    affixWeightForm.type = "";
    affixWeightForm.label = "";
    affixWeightForm.weightJson =
        '{"hp":0,"atk":0,"def":0,"hpp":0,"atkp":0,"defp":0,"em":0,"er":0,"cr":0,"cd":0}';
    showAffixWeightEditor.value = true;
}
function submitAffixWeightForm(formEl: any) {
    formEl.validate((valid: boolean) => {
        if (!valid) return;
        const weight = JSON.parse(affixWeightForm.weightJson);
        if (affixWeightActiveIdx.value >= 0) {
            artStore.affixWeightTable[affixWeightActiveIdx.value] = {
                set: affixWeightForm.set,
                type: affixWeightForm.type,
                label: affixWeightForm.label,
                weight,
            };
        } else {
            artStore.affixWeightTable.push({
                set: affixWeightForm.set,
                type: affixWeightForm.type,
                label: affixWeightForm.label,
                weight,
            });
        }
        showAffixWeightEditor.value = false;
    });
}

let typeKeys = [] as string[];
ArtifactData.slotKeys.forEach((slotKey) => {
    typeKeys = typeKeys.concat(
        ArtifactData.mainKeys[slotKey as ISlotKey].map(
            (mainKey) => `${slotKey}_${mainKey}`
        )
    );
});

// fmt
function fmtSet(set: string) {
    return set == "*"
        ? i18n.global.t("ui.any")
        : i18n.global.t("artifact.set." + set);
}
function fmtType(type: string) {
    return type == "*"
        ? i18n.global.t("ui.any")
        : i18n.global.t("artifact.type." + type);
}
function fmtSetAndType(set: string, type: string) {
    return fmtSet(set) + " - " + fmtType(type);
}
</script>

<template>
    <el-dialog v-model="show" :title="$t('ui.affnum_table_title')">
        <el-tabs v-model="activeTab">
            <!-- set bonus table tab -->
            <el-tab-pane :label="$t('ui.set_bonus')" name="set_bonus">
                <el-alert
                    type="info"
                    show-icon
                    :closable="false"
                    style="line-height: 1.4"
                    :description="$t('ui.set_bonus_table_help')"
                />
                <el-table :data="setBonusTableData" height="300">
                    <el-table-column :label="$t('ui.set')" width="150">
                        <template #default="scope">
                            {{ fmtSet(scope.row.set) }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('ui.art_type')" min-width="400">
                        <template #default="scope">
                            <el-tag v-for="k in scope.row.types" class="sp-tag">
                                {{ fmtType(k) }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" align="right" width="85">
                        <template #default="scope">
                            <el-button
                                :icon="Edit"
                                circle
                                plain
                                type="primary"
                                size="small"
                                @click="editSetBonusRule(scope.row.set)"
                            />
                            <el-button
                                :icon="Delete"
                                circle
                                plain
                                type="danger"
                                size="small"
                                @click="delSetBonusRule(scope.row.set)"
                            />
                        </template>
                    </el-table-column>
                </el-table>
                <el-row justify="center">
                    <el-button
                        :icon="Plus"
                        text
                        type="primary"
                        @click="addSetBonusRule()"
                        style="margin-top: 10px"
                    >
                        {{ $t("ui.add_rule") }}
                    </el-button>
                </el-row>
            </el-tab-pane>
            <!-- affix weight table tab -->
            <el-tab-pane :label="$t('ui.affix_weight')" name="affix_weight">
                <el-alert
                    type="info"
                    show-icon
                    :closable="false"
                    style="line-height: 1.4"
                    :description="$t('ui.affix_weight_table_help')"
                />
                <el-table :data="artStore.affixWeightTable" height="300">
                    <el-table-column :label="$t('ui.set_and_type')" width="150">
                        <template #default="scope">
                            <span
                                v-text="
                                    fmtSetAndType(scope.row.set, scope.row.type)
                                "
                            />
                            <el-tooltip
                                :content="scope.row.label"
                                v-if="scope.row.label"
                            >
                                <el-icon style="margin-left: 5px">
                                    <InfoFilled />
                                </el-icon>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :label="$t('ui.affix_weight')"
                        min-width="400"
                    >
                        <template #default="scope">
                            <template v-for="(v, k) in scope.row.weight">
                                <el-tag class="sp-tag" v-if="v">
                                    {{ $t("artifact.affix." + k) + "×" + v }}
                                </el-tag>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" align="right" width="85">
                        <template #default="scope">
                            <el-button
                                :icon="Edit"
                                circle
                                plain
                                type="primary"
                                size="small"
                                @click="editAffixWeightRule(scope.$index)"
                            />
                            <el-button
                                :icon="Delete"
                                circle
                                plain
                                type="danger"
                                size="small"
                                @click="delAffixWeightRule(scope.$index)"
                            />
                        </template>
                    </el-table-column>
                </el-table>
                <el-row justify="center">
                    <el-button
                        :icon="Plus"
                        text
                        type="primary"
                        @click="addAffixWeightRule()"
                        style="margin-top: 10px"
                    >
                        {{ $t("ui.add_rule") }}
                    </el-button>
                </el-row>
            </el-tab-pane>
        </el-tabs>
        <!-- set bonus editor dialog -->
        <el-dialog
            v-model="showSetBonusEditor"
            :title="$t('ui.set_bonus_editor_title')"
            append-to-body
        >
            <el-form
                :model="setBonusForm"
                label-width="100px"
                :rules="setBonusFormRules"
                ref="setBonusFormEl"
            >
                <el-form-item :label="$t('ui.set')" prop="set">
                    <el-select v-model="setBonusForm.set">
                        <el-option
                            v-for="s in setBonusSetKeys"
                            :label="fmtSet(s)"
                            :value="s"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('ui.art_type')" prop="types">
                    <el-select
                        v-model="setBonusForm.types"
                        multiple
                        clearable
                        style="width: 100%"
                    >
                        <el-option
                            v-for="k in typeKeys"
                            :label="$t('artifact.type.' + k)"
                            :value="k"
                        />
                    </el-select>
                </el-form-item>
            </el-form>
            <el-row justify="center">
                <el-button
                    v-text="$t('ui.confirm')"
                    type="primary"
                    @click="submitSetBonusForm(setBonusFormEl)"
                />
            </el-row>
        </el-dialog>
        <!-- affix weight editor dialog -->
        <el-dialog
            v-model="showAffixWeightEditor"
            :title="$t('ui.affix_weight_editor_title')"
            append-to-body
        >
            <el-form
                :model="affixWeightForm"
                label-width="100px"
                :rules="affixWeightFormRules"
                ref="affixWeightFormEl"
            >
                <el-form-item :label="$t('ui.set')" prop="set">
                    <el-select v-model="affixWeightForm.set">
                        <el-option :label="$t('ui.any')" value="*" />
                        <el-option
                            v-for="s in ArtifactData.setKeys"
                            :label="$t('artifact.set.' + s)"
                            :value="s"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('ui.art_type')" prop="type">
                    <el-select v-model="affixWeightForm.type">
                        <el-option :label="$t('ui.any')" value="*" />
                        <el-option
                            v-for="k in typeKeys"
                            :label="$t('artifact.type.' + k)"
                            :value="k"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('ui.label')" prop="label">
                    <el-input v-model="affixWeightForm.label" />
                </el-form-item>
                <el-form-item :label="$t('ui.affix_weight')" prop="weightJson">
                    <el-input
                        v-model="affixWeightForm.weightJson"
                        autosize
                        type="textarea"
                        class="code"
                    />
                </el-form-item>
                <el-form-item>
                    <el-alert
                        type="info"
                        show-icon
                        :closable="false"
                        style="line-height: 1.4"
                        :description="$t('ui.weight_json_help')"
                    />
                </el-form-item>
            </el-form>
            <el-row justify="center">
                <el-button
                    v-text="$t('ui.confirm')"
                    type="primary"
                    @click="submitAffixWeightForm(affixWeightFormEl)"
                />
            </el-row>
        </el-dialog>
    </el-dialog>
</template>

<style lang="scss" scoped>
.sp-tag {
    padding: 0 5px;
    margin: 2px;
}
.code {
    font-family: "Courier New", Courier, monospace;
}
</style>
