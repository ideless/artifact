<script lang="ts" setup>import { computed } from 'vue';

const props = defineProps<{
    modelValue: number[]
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
        <span class="val">{{ modelValue[0] }}</span>
        <el-slider class="slider" v-model="range" range show-stops :max="20" />
        <span class="val">{{ modelValue[1] }}</span>
    </div>
</template>

<style lang="scss" scoped>
.range-slider {
    display: flex;
    align-items: center;
    height: 38px;
    .val {
        width: 38px;
        text-align: center;
        line-height: 0;
    }
    .slider {
        flex: 1;
        margin: 0 10px;
    }
}
</style>