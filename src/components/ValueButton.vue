<script lang="ts" setup>
import { computed, ref } from 'vue';
const props = defineProps<{
    modelValue: number
}>()
const emit = defineEmits<{
    (e: 'update:modelValue', value: number): void
}>()
const fillStyle = computed(() => {
    // 定义clip-path行内样式（略倾斜的进度条）
    let bottomPercentage = 0, topPercentage = 0
    bottomPercentage = topPercentage = 100 * props.modelValue
    // 分段线性
    // if (props.modelValue <= 0.5) {
    //     bottomPercentage = 80 * props.modelValue
    //     topPercentage = 120 * props.modelValue
    // } else {
    //     bottomPercentage = 120 * props.modelValue - 20
    //     topPercentage = 80 * props.modelValue + 20
    // }
    return `clip-path: polygon(0 0, ${topPercentage}% 0, ${bottomPercentage}% 100%, 0 100%);`
})
let startX = 0, timer: any = undefined, dragging = ref(false)
const btnClass = computed(() => {
    return {
        'value-button': true,
        'dragging': dragging.value
    }
})
const mousemove = (e: MouseEvent) => {
    dragging.value = true
    // 全局鼠标移动事件，用来拖动进度条
    let v = props.modelValue + e.movementX / 120 // 分母可以适当放大，越大调控越精细
    // let v = (e.clientX - startX) / 85
    // console.log(e.clientX, startX, e)
    v = Math.min(Math.max(v, 0), 1) // 新的value必须在0~1之间
    v = Math.round(v * 100) / 100 //新的value保留2位小数
    emit('update:modelValue', v)
}
const mouseup = () => {
    // clearTimeout(timer)
    window.removeEventListener('mousemove', mousemove)
    window.removeEventListener('mouseup', mouseup)
    if (!dragging.value) {
        //如果没有进入dragging状态就松开按键，value变成0/0.5/1
        if (props.modelValue >= 1) {
            emit('update:modelValue', 0)
        } else if (props.modelValue >= 0.5) {
            emit('update:modelValue', 1)
        } else if (props.modelValue >= 0) {
            emit('update:modelValue', 0.5)
        }
    }
    dragging.value = false
}
const mousedown = (e: MouseEvent) => {
    // timer = setTimeout(() => {
    // 添加draging类，显示value数字
    // dragging.value = true
    // 记录初始x坐标
    // startX = e.clientX
    // startX = (e.target as Element).getBoundingClientRect().left
    // 添加全局鼠标移动事件
    window.addEventListener('mousemove', mousemove)
    // }, 100)
    // 添加全局mouseup事件
    window.addEventListener('mouseup', mouseup)
}
const valueString = computed(() => {
    // 美化value，显示固定2位小数
    return props.modelValue.toFixed(2)
})
</script>

<template>
   <div :class="btnClass" @mousedown="mousedown" :title="valueString">

        <div class="blank">
            <transition name="switch" mode="out-in">
                <div v-if="!dragging" key="text-blank">
                    <slot />
                </div>
                <div v-else>{{ valueString }}</div>
            </transition>
        </div>
        <div class="full" :style="fillStyle" v-if="props.modelValue>1">
            <transition name="switch" mode="out-in">
                <div v-if="!dragging" key="text-fill">
                    <slot />
                </div>
                <div v-else>{{ valueString }}</div>
            </transition>
        </div>
        <div class="fill" :style="fillStyle" v-else>
            <transition name="switch" mode="out-in">
                <div v-if="!dragging" key="text-fill">
                    <slot />
                </div>
                <div v-else>{{ valueString }}</div>
            </transition>
        </div>
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
    transition: all 100ms ease;
    .blank {
        background: white;
        color: $primary-color;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
    }
    .full {
        background: red;
        color: white;
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
        &.dragging {
        cursor: grab;
        transform: scale(1.1);
        .fill {
            transition: none;
        }
    }
}
</style>