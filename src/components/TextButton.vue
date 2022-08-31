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
    @extend %button;
    &:not(.disabled):hover {
        filter: brightness(110%);
        background-color: $primary-color;
        color: white;
    }
    &.disabled {
        filter: none;
        opacity: 0.3;
        cursor: not-allowed;
    }
}
</style>