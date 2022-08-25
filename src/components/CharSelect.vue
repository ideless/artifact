<script lang="ts" setup>
import { computed, nextTick, ref } from 'vue';
import { ICharOption } from '@/store/types';
import chs from '@/ys/locale/chs';
import CharacterData from '@/ys/data/character';

const props = defineProps<{
    options: ICharOption[]
    modelValue: string[]
    title?: string
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

// display
const text = (o: ICharOption) => {
    return o.key ? chs.character[o.key] || o.key : '未佩戴'
}
const icon = (o: ICharOption) => {
    return o.key ? `./assets/char_faces/${o.key}.webp` : './assets/forbidden.webp'
}
const color = (o: ICharOption) => {
    if (o.key) {
        return CharacterData[o.key].rarity == 5 ? 'gold' : 'purple'
    } else {
        return 'black'
    }
}

// 未佩戴
const unequiped = computed(() => {
    return props.options.filter(o => o.key == '')[0]
})

// 排序分组后的选项
const optionGroups = computed(() => {
    let omap = Object.fromEntries(props.options.filter(o => o.key).map(o => [o.key, o])),
        g: { [e: string]: ICharOption[] } = {}
    Object.keys(CharacterData)
        .filter(key => key in omap)
        .sort((k1, k2) => CharacterData[k2].rarity - CharacterData[k1].rarity)
        .forEach(key => {
            let e = CharacterData[key].element
            if (e in g) {
                g[e].push(omap[key])
            } else {
                g[e] = [omap[key]]
            }
        })
    return ['pyro', 'hydro', 'cryo', 'electro', 'anemo', 'geo', 'dendro']
        .filter(e => e in g)
        .map(e => ({
            icon: `./assets/game_icons/${e}.webp`,
            text: chs.element[e],
            options: g[e],
        }))
})

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
        <transition-group class="selected-options-wrapper" name="list" tag="div">
            <img class="tag" v-for="o in selectedOptions" :src="icon(o)" alt="" :key="o.key">
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
                        <div class="option" v-if="unequiped">
                            <el-checkbox :label="unequiped.key">
                                <div class="option-content">
                                    <img class="icon" :src="icon(unequiped)" alt="">
                                    <span class="label">{{ text(unequiped) }}</span>
                                    <span class="tip">{{ unequiped.tip }}</span>
                                </div>
                            </el-checkbox>
                        </div>
                        <div class="option-group" v-for="g in optionGroups">
                            <div class="group-header">
                                <img :src="g.icon" alt="" class="icon">
                                <span class="label">{{ g.text }}</span>
                            </div>
                            <div class="option" v-for="o in g.options">
                                <el-checkbox :label="o.key">
                                    <div class="option-content">
                                        <img class="icon" :src="icon(o)" alt="">
                                        <span :class="`label ${color(o)}`">{{ text(o) }}</span>
                                        <span class="tip">{{ o.tip }}</span>
                                    </div>
                                </el-checkbox>
                            </div>
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

        .group-header {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 5px;
            background-color: #fff9ee;
            box-shadow: inset 0 0 4px 0 #ddd;

            .icon {
                width: 26px;
                height: 26px;
                object-fit: contain;
                margin-right: 5px;
            }

            .label {
                color: #b78249;
                font-size: 12px;
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
                color: black;

                &.gold {
                    color: #bd600e;
                }

                &.purple {
                    color: purple;
                }
            }

            .tip {
                color: gray;
                font-family: Arial, Helvetica, sans-serif;
            }
        }
    }
}
</style>