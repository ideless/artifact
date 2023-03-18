<script lang="ts" setup>
import SelectSingleBase from "@/components/widgets/SingleSelectBase.vue";
import { computed } from "vue";
import { i18n } from "@/i18n";

const props = defineProps<{
    options: any[];
    modelValue: (string | number)[];
    title?: string;
}>();
const emit = defineEmits<{
    (e: "update:modelValue", v: (string | number)[]): void;
}>();

// 选项
const isAll = computed<boolean>({
    get() {
        return props.modelValue.length == props.options.length;
    },
    set(v) {
        emit(
            "update:modelValue",
            props.options.map((o) => o.key)
        );
    },
});
const isPartial = computed<boolean>(() => {
    return (
        props.modelValue.length > 0 &&
        props.modelValue.length < props.options.length
    );
});
const selectedKeys = computed<(string | number)[]>({
    get() {
        return props.modelValue;
    },
    set(v) {
        emit("update:modelValue", v);
    },
});
const onSelectAllChange = (v: boolean) => {
    if (v)
        emit(
            "update:modelValue",
            props.options.map((o) => o.key)
        );
    else emit("update:modelValue", []);
};

// 显示被选中选项个数
const selectedCount = computed(() => {
    return `${props.modelValue.length} / ${props.options.length}`;
});
</script>

<template>
    <select-single-base :title="title" :options="options" :persistant="true">
        <template v-slot:selected>
            <slot name="selected" />
        </template>
        <template v-slot:options>
            <div class="options-header">
                <el-checkbox
                    v-model="isAll"
                    :indeterminate="isPartial"
                    @change="onSelectAllChange"
                >
                    <div class="options-header-content">
                        <span class="label" v-text="$t('ui.sel_all')" />
                        <span class="tip">{{ selectedCount }}</span>
                    </div>
                </el-checkbox>
            </div>
            <div class="options">
                <el-checkbox-group v-model="selectedKeys">
                    <slot name="options" />
                </el-checkbox-group>
            </div>
        </template>
    </select-single-base>
</template>

<style lang="scss" scoped>
.options-header {
    padding: 10px 12px;
    border-bottom: 1px solid lightgray;
}

.options-header-content {
    display: flex;
    align-items: center;
    // box-shadow: 0 0 1px 0 black;

    .label {
        flex: 1;
        color: black;
    }

    .tip {
        color: gray;
        font-family: Arial, Helvetica, sans-serif;
    }
}

.options-header,
.options {
    :deep(.el-checkbox),
    :deep(.el-checkbox__label) {
        width: 100%;
    }
}
</style>
