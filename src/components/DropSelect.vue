<script lang="ts" setup>
import { computed, ref } from 'vue';
import { IOption } from '../store/types';
const props = defineProps<{
    items: IOption[]
    modelValue: string
}>()
const emit = defineEmits<{
    (e: 'update:modelValue', key: string): void
}>()
const show = ref(false)
const top = ref(false)
const selectedValue = computed(() => {
    for (let i of props.items) {
        if (i.key == props.modelValue) {
            return i.value
        }
    }
    return ""
})
const select = (key: string) => {
    emit('update:modelValue', key)
}
const drop = (e: MouseEvent) => {
    if (show.value) {
        show.value = false
    } else {
        top.value = (e.clientY + 360 > window.innerHeight)
        show.value = true
    }
}
</script>

<template>
    <div class="drop-select" tabindex="-1" @click="drop" @blur="show = false">
        <span>{{ selectedValue }}</span>
        <img :class="{ show }" src="/assets/arrow.png" />
        <transition name="pop">
            <div :class="{ options: true, top }" v-show="show">
                <div class="option" v-for="i in items" @click="select(i.key)">
                    <div class="value">{{ i.value }}</div>
                    <div class="tip">{{ i.tip }}</div>
                </div>
            </div>
        </transition>
    </div>
</template>

<style lang="scss" scoped>
.drop-select {
    position: relative;
    display: inline-block;
    height: $widget-height;
    box-shadow: 0 0 2px 0 #0007;
    background: white;
    display: flex;
    align-items: center;
    padding: 0 15px;
    border-radius: 3px;
    user-select: none;
    cursor: pointer;
    span {
        flex: 1;
    }
    img {
        transform: rotate(0deg);
        transition: transform 200ms ease;
        &.show {
            transform: rotate(180deg);
        }
    }
    .options {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        max-height: 360px;
        overflow-y: auto;
        background: #f7f7f7;
        box-shadow: 0 0 4px 0 #0007;
        border-radius: 3px;
        z-index: 2;
        &.top {
            top: unset;
            bottom: 100%;
        }
        .option {
            padding: 10px;
            display: flex;
            align-items: center;
            &:hover {
                background: #f0f0f0;
            }
            .value {
                flex: 1;
            }
            .tip {
                color: gray;
            }
        }
    }
}
</style>