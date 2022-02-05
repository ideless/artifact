<script lang="ts" setup>
import { computed } from "vue"
const props = defineProps<{
    disabled?: boolean
}>()
const emit = defineEmits<{
    (e: 'click'): void
}>()
const btnClass = computed(() => {
    return {
        'text-button': true,
        disabled: props.disabled
    }
})
const click = () => {
    if (!props.disabled) {
        emit('click')
    }
}
</script>

<template>
    <div :class="btnClass" @click="click">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
.text-button {
    width: 85px;
    height: $widget-height;
    display: inline-block;
    color: white;
    background: $primary-color;
    border-radius: 3px;
    box-shadow: 0 0 2px 0 #0007;
    line-height: $widget-height;
    text-align: center;
    cursor: pointer;
    user-select: none;
    &:hover {
        filter: brightness(110%);
    }
    &.disabled {
        filter: none;
        opacity: 0.7;
        cursor: not-allowed;
    }
}
</style>