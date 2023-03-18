<script lang="ts" setup>
import SingleSelectBase from "@/components/widgets/SingleSelectBase.vue";
import { computed } from "vue";
import { IOption } from "@/store/types";

const props = defineProps<{
    options: IOption[];
    modelValue: string | number;
    title?: string;
}>();
const emit = defineEmits<{
    (e: "update:modelValue", v: string | number): void;
}>();

// 显示被选中选项
const selectedLabel = computed(() => {
    for (let o of props.options) if (o.key == props.modelValue) return o.label;
    return props.modelValue;
});

// 选择
const select = (key: string | number) => {
    emit("update:modelValue", key);
};
</script>

<template>
    <single-select-base :title="title" :options="options">
        <template v-slot:selected>
            <div class="selected">{{ selectedLabel }}</div>
        </template>
        <template v-slot:options>
            <div
                :class="{ option: true, selected: o.key == modelValue }"
                v-for="o in options"
                @click="select(o.key)"
                role="menuitem"
            >
                <span class="label">{{ o.label }}</span>
                <span class="tip">{{ o.tip }}</span>
            </div>
        </template>
    </single-select-base>
</template>

<style lang="scss" scoped>
.selected {
    line-height: 32px;
    padding-left: 10px;
}

.option {
    padding: 10px 20px;
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover {
        background: #f0f0f0;
    }

    &.selected {
        font-weight: bold;
    }

    .label {
        flex: 1;
    }

    .tip {
        color: gray;
        font-family: Arial, Helvetica, sans-serif;
    }
}
</style>
