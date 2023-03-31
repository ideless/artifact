<script lang="ts" setup>
import MultiSelectBase from "@/components/widgets/MultiSelectBase.vue";
import { IOption } from "@/store/types";
import { computed } from "vue";

const props = defineProps<{
    options: IOption[];
    modelValue: (string | number)[];
    title?: string;
}>();
const emit = defineEmits<{
    (e: "update:modelValue", v: (string | number)[]): void;
}>();

const selectedKeys = computed<(string | number)[]>({
    get() {
        return props.modelValue;
    },
    set(v) {
        emit("update:modelValue", v);
    },
});
const selectedOptions = computed(() => {
    return props.options.filter((o) => props.modelValue.includes(o.key));
});
</script>

<template>
    <multi-select-base :title="title" :options="options" v-model="selectedKeys">
        <template v-slot:selected>
            <transition-group
                class="selected-options-wrapper"
                name="list"
                tag="div"
            >
                <span class="tag" v-for="o in selectedOptions" :key="o.key">
                    <img :src="o.icon" alt="" v-if="o.icon" />
                    <span v-else>{{ o.label }}</span>
                </span>
            </transition-group>
        </template>
        <template v-slot:options>
            <div class="option" v-for="o in options">
                <el-checkbox :label="o.key">
                    <div class="option-content">
                        <img class="icon" :src="o.icon" alt="" v-if="o.icon" />
                        <span class="label">{{ o.label }}</span>
                        <span class="tip">{{ o.tip }}</span>
                    </div>
                </el-checkbox>
            </div>
        </template>
    </multi-select-base>
</template>

<style lang="scss" scoped>
%tag {
    display: inline-block;
    transition: all 100ms ease;
    height: 32px;
    margin: 2px;
    vertical-align: middle;
}

.selected-options-wrapper {
    flex: 1;
    line-height: 0;
    // box-shadow: 0 0 1px 0 black;

    .tag {
        @extend %tag;

        img {
            height: 100%;
            width: 32px;
            object-fit: contain;
        }

        span {
            display: inline-block;
            line-height: 32px;
            font-weight: initial;
            background-color: $primary-color-light;
            border-radius: 5px;
            padding: 0 10px;
        }
    }
}

.option {
    padding: 5px 12px;

    &:hover {
        background: #f0f0f0;
    }

    .option-content {
        display: flex;
        align-items: center;
        // box-shadow: 0 0 1px 0 black;

        .icon {
            width: 32px;
            height: 32px;
            object-fit: contain;
            margin-right: 5px;
        }

        .label {
            flex: 1;
        }

        .tip {
            color: gray;
            font-family: Arial, Helvetica, sans-serif;
        }
    }
}
</style>
