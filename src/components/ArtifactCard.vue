<script lang="ts" setup>
import { computed } from 'vue';
import { Edit } from '@element-plus/icons-vue'
import { Affix, Artifact } from '../ys/artifact';
import chs from '../ys/locale/chs'
import data from '../ys/data';
import { useStore } from '../store';
const props = defineProps<{
    artifact: Artifact,
    selected?: boolean
    selectMode?: boolean
    disabled?: boolean
}>()
const emit = defineEmits<{
    (e: 'flipSelect', shiftKey: boolean): void,
    (e: 'flipLock'): void,
    (e: 'edit'): void
}>()
const store = useStore()
const pieceName = computed(() => {
    if (props.artifact.set in chs.set && props.artifact.slot in chs.slot) {
        let name = chs.set[props.artifact.set].name
        let slot = chs.slot[props.artifact.slot][2] // "花","羽"...
        return `${name} · ${slot}`
    } else {
        return '未知'
    }
})
const pieceImgSrc = computed(() => {
    if (props.artifact.set in chs.set) {
        return `./assets/artifacts/${props.artifact.set}/${props.artifact.slot}.png`
    } else {
        return ''
    }
})
const affixName = (key: string) => {
    let name: string = chs.affix[key]
    if (name.endsWith('%')) {
        name = name.substring(0, name.length - 1)
    }
    return name
}
const main = computed(() => {
    if (props.artifact.mainKey in data.mainStat) {
        let key = props.artifact.mainKey,
            value = data.mainStat[props.artifact.mainKey][props.artifact.level]
        return {
            name: chs.affix[key],
            value: new Affix({ key, value }).valueString()
        }
    } else {
        return { name: '未知', value: 0 }
    }
})
const level = computed(() => {
    return `+${props.artifact.level}`
})
const minors = computed(() => {
    let ret = []
    for (let a of props.artifact.minors) {
        let name = affixName(a.key)
        ret.push({
            text: `· ${name}+${a.valueString()}`,
            style: `opacity: ${store.state.weightInUse[a.key] > 0 ? 1 : 0.5};`
        });
    }
    return ret;
})
const affnum = computed(() => {
    let a = props.artifact.data.affnum
    return {
        cur: a.cur.toFixed(1),
        avg: a.avg.toFixed(1),
        max: a.max.toFixed(1),
        min: a.min.toFixed(1),
    }
})
const lockImgSrc = computed(() => {
    return props.artifact.lock ? './assets/lock.png' : './assets/unlock.png'
})
const artifactCardClass = computed(() => ({
    'artifact-card': true,
    'select-mode': props.selectMode,
    'selected': props.selected
}))
const select = (evt: MouseEvent) => {
    emit('flipSelect', evt.shiftKey)
}
const starImgSrc = './assets/stars.png'
const charSrc = computed<string>(() => {
    if (props.artifact.location in chs.character) {
        return `./assets/char_sides/${props.artifact.location}.png`
    } else {
        return ''
    }
})
const flipLock = () => {
    if (!props.disabled) {
        emit('flipLock')
    }
}
const charScore = computed<string>(() => {
    return props.artifact.data.charScores.map(cs => {
        return `${chs.character[cs.charKey]}${(cs.score * 100).toFixed(1)}%`
    }).join(' ')
})
</script>

<template>
    <div :class="artifactCardClass" :title="charScore">
        <div class="head">
            <div class="head-stat">
                <div class="piece-name">{{ pieceName }}</div>
                <div class="main-affix-name">{{ main.name }}</div>
                <div class="main-affix-value">{{ main.value }}</div>
                <img :src="starImgSrc" />
            </div>
            <img :src="pieceImgSrc" />
        </div>
        <div class="body">
            <div class="body-head">
                <span class="level">{{ level }}</span>
                <span class="cur-an">{{ affnum.cur }}</span>
                <div class="lock-img-container">
                    <img :src="lockImgSrc" @click="flipLock" :class="disabled ? 'disabled' : ''" />
                </div>
            </div>
            <div class="minor-affixes">
                <div class="minor-affix" v-for="a in minors" :style="a.style">{{ a.text }}</div>
            </div>
            <div class="affix-numbers" v-if="artifact.level < 20">
                <div class="min-an">最小{{ affnum.min }}</div>
                <div class="avg-an">期望{{ affnum.avg }}</div>
                <div class="max-an">最大{{ affnum.max }}</div>
            </div>
            <div class="full-an" v-else>已满级，{{ affnum.cur }}词条</div>
        </div>
        <div class="location" v-show="charSrc">
            <img :src="charSrc" />
        </div>
        <div class="select-box" @click="select" v-show="!disabled" />
        <div class="edit-box" @click="emit('edit')" v-show="!disabled">
            <el-icon :size="16">
                <edit />
            </el-icon>
            <span>编辑</span>
        </div>
        <div class="defeat-num" v-show="artifact.data.defeat">{{ -artifact.data.defeat }}</div>
    </div>
</template>

<style lang="scss" scoped>
%tag {
    line-height: 1;
    padding: 1px 4px;
    border-radius: 3px;
    background-color: black;
    color: white;
}

.artifact-card {
    user-select: none;
    box-shadow: 0 0 2px 0 #0007;
    font-weight: bold;
    width: 200px;
    height: 240px;
    background: #eae4d9;
    font-size: 12px;
    font-weight: bold;
    border-radius: 3px;
    position: relative;
    word-break: keep-all;

    .head {
        height: 100px;
        display: flex;
        justify-content: space-between;
        background: rgb(102, 87, 88);
        background: linear-gradient(165deg,
                rgba(102, 87, 88, 1) 0%,
                rgba(214, 169, 90, 1) 100%);

        .head-stat {
            display: flex;
            flex-direction: column;
            color: white;
            padding: 10px 15px;
            width: 100px;

            .piece-name {
                flex: 1;
                white-space: nowrap;
                z-index: 1;
            }

            .main-affix-name {
                color: #fff7;
                font-size: 10px;
            }

            .main-affix-value {
                font-size: 18px;
            }
        }
    }

    .body {
        display: flex;
        flex-direction: column;

        .body-head {
            display: flex;
            padding: 8px 12px;
            align-items: center;

            .level {
                @extend %tag;
                background-color: #333;
            }

            .cur-an {
                @extend %tag;
                background-color: #66c238;
                margin-left: 5px;
            }

            .lock-img-container {
                flex: 1;
                text-align: right;
                line-height: 0;

                img {
                    width: 20px;
                    height: 20px;
                    cursor: pointer;

                    &.disabled {
                        cursor: default;
                    }
                }
            }
        }

        .minor-affixes {
            color: #333;
            padding: 0 15px;
        }

        .affix-numbers {
            position: absolute;
            left: 0;
            bottom: 0;
            right: 0;
            height: 20px;
            color: white;
            text-align: center;
            line-height: 20px;
            display: flex;

            .min-an {
                background: #a6a6a6;
                width: 33.3%;
            }

            .avg-an {
                background: #2a82e4;
                width: 33.3%;
            }

            .max-an {
                background: #ff5733;
                width: 33.3%;
            }
        }

        .full-an {
            position: absolute;
            left: 0;
            bottom: 0;
            right: 0;
            height: 20px;
            color: white;
            text-align: center;
            line-height: 20px;
            background: #66c238;
        }
    }

    .location {
        position: absolute;
        right: -8px;
        top: -8px;
        background-color: #333d51e0;
        border: 2px solid #e9e5dc;
        width: 40px;
        height: 40px;
        border-radius: 20px;
        display: flex;
        align-items: flex-end;
        justify-content: center;

        img {
            height: 44px;
        }
    }

    .select-box {
        position: absolute;
        right: 10px;
        top: 10px;
        width: 20px;
        height: 20px;
        border-radius: 3px;
        border: 1px solid gray;
        background-color: white;
        box-shadow: inset 0 0 0 2px white;
        cursor: pointer;
        display: none;
        transition: background-color 100ms ease;
    }

    &.selected>.select-box {
        background-color: $primary-color;
    }

    &:hover>.select-box,
    &.select-mode>.select-box {
        display: block;
    }

    .edit-box {
        position: absolute;
        width: 100%;
        height: 20px;
        left: 0;
        right: 0;
        bottom: 0;
        cursor: pointer;
        align-items: center;
        justify-content: center;
        color: white;
        background-color: #2a82e4;
        display: none;

        &:hover {
            filter: brightness(1.1);
        }

        span {
            margin-left: 5px;
        }
    }

    &:hover .edit-box {
        display: flex;
    }

    .defeat-num {
        position: absolute;
        right: 20px;
        bottom: 40px;
        color: #ff5733;
        font-weight: bolder;
        font-family: fantasy;
        font-size: 20px;
        width: 36px;
        height: 36px;
        border: 4px solid #ff5733;
        border-radius: 18px;
        line-height: 28px;
        text-align: center;
        transform: rotate(15deg);
        opacity: 0.5;
    }
}
</style>