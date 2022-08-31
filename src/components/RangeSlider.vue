<script lang="ts" setup>import { computed, ref } from 'vue';

const props = defineProps<{
    modelValue: number[]
    title?: string
}>()
const emit = defineEmits<{
    (e: 'update:modelValue', range: number[]): void
}>()
const range = computed({
    get() {
        return props.modelValue
    },
    set(r: number[]) {
        emit('update:modelValue', r)
    }
})
</script>

<template>
    <div class="range-slider">
        <span class="title">{{ title }}</span>
        <span class="val">{{ modelValue[0] }}</span>
        <el-slider class="slider" v-model="range" range show-stops :max="20" />
        <span class="val">{{ modelValue[1] }}</span>
    </div>
</template>

<style lang="scss" scoped>
.range-slider {
    height: 28px;
    position: relative;
    display: inline-block;
    // height: $widget-height;
    box-shadow: 0 0 0 0 $primary-color;
    border: 2px solid $primary-color;
    // background-color: white;
    color: $primary-color;
    display: flex;
    align-items: center;
    padding: 8px;
    font-weight: bold;
    // border-radius: 3px;
    user-select: none;
    cursor: pointer;
    .val {
        width: 38px;
        text-align: center;
        line-height: 0;
        font-family: Arial, Helvetica, sans-serif;
    }
    .slider {
        flex: 1;
        margin: 0 10px;
    }
    .title {
        position: absolute;
        top: 0;
        left: 5px;
        font-size: 12px;
        font-weight: 100;
        transform: translateY(-50%);
        background-color: $right-bgcolor;
        line-height: 1;
        padding: 0 5px;
    }
}
</style>