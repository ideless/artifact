<script lang="ts" setup>
import { computed, nextTick, ref } from 'vue';
import { IOption } from '@/store/types';

const props = defineProps<{
    options: IOption[]
    modelValue: string[]
    title?: string
    useIcon?: boolean
}>()
const emit = defineEmits<{
    (e: 'update:modelValue', v: string[]): void
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

// 选项
const isAll = computed<boolean>({
    get() { return props.modelValue.length == props.options.length },
    set(v) { emit("update:modelValue", props.options.map(o => o.key)) }
})
const isPartial = computed<boolean>(() => {
    return props.modelValue.length > 0
        && props.modelValue.length < props.options.length
})
const selectedKeys = computed<string[]>({
    get() { return props.modelValue },
    set(v) { emit("update:modelValue", v) }
})
const onSelectAllChange = (v: boolean) => {
    if (v)
        emit("update:modelValue", props.options.map(o => o.key))
    else
        emit("update:modelValue", [])
}

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
const selectedOptions = computed(() => {
    return props.options.filter(o => props.modelValue.includes(o.key))
})

// 显示被选中选项个数
const selectedCount = computed(() => {
    return `${props.modelValue.length} / ${props.options.length}`
})
</script>

<template>
    <div :class="rootClass" ref="rootEl" tabindex="-1" @click="drop" @focusout="blur">
        <transition-group class="selected-options-wrapper" name="list" tag="div" v-if="useIcon">
            <img class="tag" v-for="o in selectedOptions" :src="o.icon" alt="" :key="o.key">
        </transition-group>
        <transition-group class="selected-options-wrapper" name="list" tag="div" v-else>
            <span class="tag" v-for="o in selectedOptions" :key="o.key">{{ o.label }}</span>
        </transition-group>
        <img class="select-arrow" src="/assets/arrow.webp" />
        <span class="title">{{ title }}</span>
        <transition name="pop">
            <div :class="optionsClass" ref="optionsEl" v-show="show" @click.stop :key="optionsKey">
                <el-scrollbar>
                    <div class="options-header">
                        <el-checkbox v-model="isAll" :indeterminate="isPartial" @change="onSelectAllChange">
                            <div class="option-content">
                                <span class="label">全选</span>
                                <span class="tip">{{ selectedCount }}</span>
                            </div>
                        </el-checkbox>
                    </div>
                    <el-checkbox-group v-model="selectedKeys">
                        <div class="option" v-for="o in options">
                            <el-checkbox :label="o.key">
                                <div class="option-content">
                                    <img class="icon" :src="o.icon" alt="" v-if="useIcon">
                                    <span class="label">{{ o.label }}</span>
                                    <span class="tip">{{ o.tip }}</span>
                                </div>
                            </el-checkbox>
                        </div>
                    </el-checkbox-group>
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
    font-weight: bold;
    // border-radius: 3px;
    user-select: none;
    cursor: pointer;
    .selected-options-wrapper {
        flex: 1;
        line-height: 0;
        // box-shadow: 0 0 1px 0 black;

        img.tag {
            @extend %tag;
            width: 32px;
            object-fit: contain
        }

        span.tag {
            @extend %tag;
            line-height: 32px;
            font-weight: initial;
            background-color: #1058ac11;
            border-radius: 5px;
            padding: 0 10px;
        }
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

        :deep(.el-checkbox),
        :deep(.el-checkbox__label) {
            width: 100%;
        }
        .options-header {
            padding: 10px 12px;
            border-bottom: 1px solid lightgray;
        }
        .option {
            padding: 5px 12px;

            &:hover {
                background: #f0f0f0;
            }

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
}
</style>