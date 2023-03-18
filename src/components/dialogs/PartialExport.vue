<script lang="ts" setup>
import { computed, ref } from "vue";
import { Artifact } from "@/ys/artifact";
import { ElInput } from "element-plus";
import { Download, CopyDocument } from "@element-plus/icons-vue";
import mona from "@/ys/ext/mona";
import genmo from "@/ys/ext/genmo";
import good from "@/ys/ext/good";
import { i18n } from "@/i18n";
import { useUiStore } from "@/store";

const props = defineProps<{
    modelValue: boolean;
    artifacts: Artifact[];
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

const uiStore = useUiStore();

const format = ref("mona");
const json = computed<string>(() => {
    switch (format.value) {
        case "mona":
            return mona.dumps(props.artifacts);
        case "genmo":
            return genmo.dumps(props.artifacts);
        case "good":
            return good.dumps(props.artifacts);
        default:
            return i18n.global.t("ui.unknown_format");
    }
});
const downloadJson = () => {
    uiStore.exportFile(format.value + ".json", json.value);
};
const copy = () => {
    navigator.clipboard.writeText(json.value).then(
        () => {
            uiStore.alert(i18n.global.t("ui.copied", "success"));
        },
        () => {
            uiStore.alert(i18n.global.t("ui.copy_failed"), "error");
        }
    );
};
</script>

<template>
    <el-dialog :title="$t('ui.partial_export_title')" v-model="show">
        <div>
            <el-radio-group v-model="format">
                <el-radio label="mona">{{ $t("ui.mona_format") }}</el-radio>
                <el-radio label="genmo">{{ $t("ui.genmo_format") }}</el-radio>
                <el-radio label="good">{{ $t("ui.good_format") }}</el-radio>
            </el-radio-group>
        </div>
        <div style="margin-top: 10px">
            <el-input
                ref="exportArea"
                type="textarea"
                :rows="8"
                resize="none"
                v-model="json"
            />
        </div>
        <div style="margin-top: 10px; text-align: center">
            <el-button :icon="Download" @click="downloadJson">{{
                $t("ui.download")
            }}</el-button>
            <el-button :icon="CopyDocument" type="primary" @click="copy"
                >{{ $t("ui.copy") }}
            </el-button>
        </div>
    </el-dialog>
</template>
