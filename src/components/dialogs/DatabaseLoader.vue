<script lang="ts" setup>
import { computed } from "vue";
import { Upload, Download } from "@element-plus/icons-vue";
import { useUiStore } from "@/store";
import { i18n } from "@/i18n";
import { fixStorage } from "@/store/fixStorage";

const props = defineProps<{
    modelValue: boolean;
}>();
const emit = defineEmits<{
    (e: "update:modelValue", value: boolean): void;
}>();
const show = computed({
    get: () => props.modelValue,
    set: (value: boolean) => emit("update:modelValue", value),
});

const uiStore = useUiStore();

function importDatabase() {
    uiStore
        .importFile("text")
        .then((text) => {
            let data = JSON.parse(text as string);
            localStorage.clear();
            for (let key in data) localStorage.setItem(key, data[key]);
            fixStorage();
            uiStore.alert(i18n.global.t("ui.database_imported"), "success");
        })
        .catch((e) => {
            uiStore.alert(String(e), "error");
        });
}

function exportDatabase() {
    uiStore.exportFile("database.json", JSON.stringify(localStorage));
}
</script>

<template>
    <el-dialog :title="$t('ui.database_loader_title')" v-model="show">
        <p v-text="$t('ui.database_loader_help')" />
        <el-row justify="center">
            <el-button :icon="Upload" @click="importDatabase">
                {{ $t("ui.import") }}
            </el-button>
            <el-button :icon="Download" @click="exportDatabase">
                {{ $t("ui.export") }}
            </el-button>
        </el-row>
    </el-dialog>
</template>
