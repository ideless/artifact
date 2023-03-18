<script lang="ts" setup>
import { computed, ref } from "vue";
import { useYasStore } from "@/store";

const props = defineProps<{
    modelValue: boolean;
}>();
const emit = defineEmits<{
    (e: "update:modelValue", value: boolean): void;
}>();

const yasStore = useYasStore();

const show = computed<boolean>({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit("update:modelValue", value);
    },
});

const config = computed(() => yasStore.config);

const confirm = () => {
    yasStore.config = config.value;
    show.value = false;
};
</script>

<template>
    <el-dialog
        :title="$t('ui.yas_configurator_title')"
        v-model="show"
        top="2vh"
    >
        <el-form :model="config" label-width="auto" label-position="left">
            <el-divider>{{ $t("yas.scan.name") }}</el-divider>
            <el-form-item :label="$t('yas.config.max_row')">
                <el-input-number
                    v-model="config.max_row"
                    :min="1"
                    :max="1000"
                />
            </el-form-item>
            <el-form-item :label="$t('yas.config.min_star')">
                <el-input-number v-model="config.min_star" :min="1" :max="5" />
            </el-form-item>
            <el-form-item :label="$t('yas.config.min_level')">
                <el-input-number
                    v-model="config.min_level"
                    :min="0"
                    :max="20"
                />
            </el-form-item>
            <el-form-item :label="$t('yas.config.speed')">
                <el-input-number v-model="config.speed" :min="1" :max="5" />
            </el-form-item>
            <el-form-item :label="$t('yas.config.number')">
                <el-input-number v-model="config.number" :min="0" :max="2000" />
            </el-form-item>
            <el-divider>{{ $t("yas.lock.name") }}</el-divider>
            <el-form-item :label="$t('yas.config.lock_stop')">
                <el-input-number v-model="config.lock_stop" :min="0" />
                <el-tag style="margin-left: 10px">
                    {{ $t("ui.millisecond") }}
                </el-tag>
            </el-form-item>
            <el-divider>{{ $t("ui.general") }}</el-divider>
            <el-form-item :label="$t('yas.config.default_stop')">
                <el-input-number v-model="config.default_stop" :min="0" />
                <el-tag style="margin-left: 10px">{{
                    $t("ui.millisecond")
                }}</el-tag>
            </el-form-item>
            <el-form-item :label="$t('yas.config.scroll_stop')">
                <el-input-number v-model="config.scroll_stop" :min="0" />
                <el-tag style="margin-left: 10px">{{
                    $t("ui.millisecond")
                }}</el-tag>
            </el-form-item>
            <el-form-item :label="$t('yas.config.max_wait_switch_artifact')">
                <el-input-number
                    v-model="config.max_wait_switch_artifact"
                    :min="0"
                />
                <el-tag style="margin-left: 10px">{{
                    $t("ui.millisecond")
                }}</el-tag>
            </el-form-item>
            <el-form-item :label="$t('yas.config.max_wait_scroll')">
                <el-input-number v-model="config.max_wait_scroll" :min="0" />
                <el-tag style="margin-left: 10px">{{
                    $t("ui.millisecond")
                }}</el-tag>
            </el-form-item>
            <el-form-item :label="$t('yas.config.no_check')">
                <el-switch v-model="config.no_check" />
            </el-form-item>
            <el-form-item :label="$t('yas.config.dxgcap')">
                <el-switch v-model="config.dxgcap" />
            </el-form-item>
        </el-form>
        <el-row justify="center" style="margin-top: 30px">
            <el-button
                type="primary"
                @click="confirm"
                v-text="$t('ui.confirm')"
            />
        </el-row>
    </el-dialog>
</template>

<style lang="scss" scoped></style>
