<script lang="ts" setup>
import { computed } from 'vue';
const props = defineProps<{
    modelValue: number
}>()
const emit = defineEmits<{
    (e: 'update:modelValue', value: number): void
}>()
const btnClass = computed(() => {
    return {
        "value-button": true,
        one: props.modelValue >= 1,
        zero: props.modelValue == 0
    }
})
const click = () => {
    if (props.modelValue == 0) {
        emit('update:modelValue', 0.5)
    } else if (props.modelValue == 0.5) {
        emit('update:modelValue', 1)
    } else {
        emit('update:modelValue', 0)
    }
}
</script>

<template>
    <div :class="btnClass" @click="click">
        <span class="blank">
            <slot />
        </span>
        <span class="fill">
            <slot />
        </span>
    </div>
</template>

<style lang="scss" scoped>
.value-button {
    width: 85px;
    height: $widget-height;
    display: inline-block;
    border-radius: 3px;
    box-shadow: 0 0 2px 0 #0007;
    line-height: $widget-height;
    text-align: center;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    user-select: none;
    .blank {
        background: white;
        color: $primary-color;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
    }
    .fill {
        background: $primary-color;
        color: white;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        clip-path: polygon(0 0, 60% 0, 40% 100%, 0 100%);
        transition: clip-path 200ms ease;
    }
    &.one .fill {
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    }
    &.zero .fill {
        clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
    }
}
</style>