<script lang="ts" setup>
import { computed, nextTick, ref } from 'vue';
import { IOption } from '@/store/types';

const props = defineProps<{
    options: IOption[]
    modelValue: string
    title?: string
}>()
const emit = defineEmits<{
    (e: 'update:modelValue', v: string): void
}>()
// 下拉菜单：位置、弹出收起
const show = ref(false)
const top = ref(false)
const optionsEl = ref()
const drop = (e: MouseEvent) => {
    if (show.value) {
        show.value = false
    } else {
        show.value = true
        top.value = false
        nextTick(() => {
            let height = Math.min(360, optionsEl.value.clientHeight),
                rect = optionsEl.value.getBoundingClientRect()
            // console.log(rect)
            optionsEl.value.style.height = height + 'px'
            top.value = rect.top + height > window.innerHeight
        })
    }
}
const rootEl = ref()
const blur = (e: FocusEvent) => {
    if (!rootEl.value.contains(e.relatedTarget)) {
        show.value = false
    }
}
const optionsKey = computed(() => JSON.stringify(props.options))
// dom class
const rootClass = computed(() => ({
    'drop-select': true,
    show: show.value
}))
const optionsClass = computed(() => ({
    options: true,
    top: top.value
}))

// 显示被选中选项
const selectedLabel = computed(() => {
    for (let o of props.options)
        if (o.key == props.modelValue)
            return o.label
    return '错误：未知的选项'
})

// 选择
const select = (key: string) => {
    emit('update:modelValue', key)
}
</script>

<template>
    <div :class="rootClass" ref="rootEl" tabindex="-1" @click="drop" @focusout="blur">
        <div class="selected-option-wrapper">{{ selectedLabel }}</div>
        <img class="select-arrow" src="/assets/arrow.webp" />
        <span class="title">{{ title }}</span>
        <transition name="pop">
             <div :class="optionsClass" ref="optionsEl" v-show="show" :key="optionsKey">
                <el-scrollbar>
                    <div :class="{ option: true, selected: o.key == modelValue }" v-for="o in options"
                        @click="select(o.key)">
                        <span class="label">{{ o.label }}</span>
                        <span class="tip">{{ o.tip }}</span>
                    </div>
                </el-scrollbar>
            </div>
        </transition>
    </div>
</template>

<style lang="scss" scoped>
%tag {
    display: inline-block;
    transition: all 100ms ease;
    height: 32px;
    margin: 2px;
}
.drop-select {
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
    font-weight: unset;
    // border-radius: 3px;
    user-select: none;
    cursor: pointer;
    .selected-option-wrapper {
        flex: 1;
        line-height: 32px;
        padding-left: 10px;
    }
    .select-arrow {
        margin: 0 2px;
        transform: rotate(0deg);
        transition: transform 200ms ease;
    }
    &.show {
        box-shadow: 0 0 4px 0 $primary-color;
        transition: box-shadow 100ms ease;
        .select-arrow {
            transform: rotate(180deg);
        }
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
    .options {
        position: absolute;
        top: calc(100% + 6px);
        left: 0;
        width: 100%;
        // max-height: 360px;
        // overflow-y: auto;
        overflow-y: hidden;
        background-color: white;
        // background-color: $primary-color;
        // color: white;
        // box-shadow: 0 0 48px 2px #0003;
        box-shadow: 0 0 8px 0 $primary-color;
        border-radius: 5px;
        cursor: initial;
        z-index: 2;
        &.top {
            top: unset;
            bottom: calc(100% + 6px);
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
    }
}
</style>