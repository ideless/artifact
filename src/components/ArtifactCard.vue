<script lang="ts" setup>
import { computed } from 'vue'
import { Edit } from '@element-plus/icons-vue'
import { Affix, Artifact } from '../ys/artifact';
import chs from '../ys/locale/chs'
import data from '../ys/data';
import { useStore } from '../store';
const props = defineProps<{
    artifact: Artifact,
    selected?: boolean
    selectMode?: boolean
    readonly?: boolean
    showAffnum?: boolean // 展示词条数而不是数值
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
        let weight = store.state.weight
        if (store.state.useFilterBatch != -1)
            weight = store.state.filterBatch[store.state.useFilterBatch].filter.scoreWeight
        ret.push({
            text: `${name}+${a.valueString(props.showAffnum!)}`,
            style: `opacity: ${weight[a.key] > 0 ? 1 : 0.5};`,
            count: Math.ceil(Math.round(a.value / data.minorStat[a.key].v * 10) / 10),
        });
    }
    return ret;
})
const affnum = computed(() => {
    let a = props.artifact.data
    return {
        cur: a.affnum.cur.toFixed(2),
        md:  a.affnum.md.toFixed(2),
        tot: a.affnum.tot.toFixed(2),
        atk: a.score.attack.toFixed(1),
        hp: a.score.life.toFixed(1),
        def: a.score.defend.toFixed(1),
        er: a.score.recharge.toFixed(1),
        em: a.score.elementalMastery.toFixed(1),
        crit: a.score.critical.toFixed(1),
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
    if (!props.readonly) {
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
            <div class="picture" v-show='pieceImgSrc'>
                <img :src="pieceImgSrc" />
            </div> 
        </div>
        <div class="body">
            <div class="body-head">
                <span class="level">{{ level }}</span>
                <span class="score">{{ affnum.atk}}攻 | {{ affnum.hp}}生 | {{ affnum.def}}防<br/>
                {{ affnum.crit}}暴 | {{ affnum.er}}充 | {{ affnum.em}}精</span>
                <div class="lock-img-container">
                     <img :src="lockImgSrc" @click="flipLock" :class="readonly ? 'readonly' : ''" />
                </div>
            </div>
            <div class="minor-affixes">
                 <div class="minor-affix" v-for="a in minors" :style="a.style">
                    <span class="count">{{ a.count }}</span>
                    <span>{{ a.text }}</span>
                </div>
            </div>
            <div class="affix-numbers" v-if="artifact.level < 20">
                <div class="cur-an">当前{{ affnum.cur }}</div>
                <div class="md-an">期望{{ affnum.md }}</div>
                <div class="tot-an">总分{{ affnum.tot }}</div>
            </div>
            <div class="affix-full" v-else>
                <div class="md-an">已满级{{ affnum.md }}</div>
                <div class="tot-an">总分{{ affnum.tot }}</div>
            </div>
        </div>
       <div class="location" v-show="charSrc">
            <img :src="charSrc" />
        </div>
        <div class="select-box" @click="select" v-show="!readonly" />
        <div class="edit-box" @click="emit('edit')" v-show="!readonly">
            <el-icon :size="16">
                <edit />
            </el-icon>
            <span>编辑</span>
        </div>
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
* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
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
        background: linear-gradient(
            165deg,
            rgba(102, 87, 88, 1) 0%,
            rgba(214, 169, 90, 1) 100%
        );
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
        .picture{
            width:100px; 
            height:100px;
        } 
        .picture img{
            width:100px; 
            height:100px;
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
            .score {
                padding: 0px 5px;
                color: #2a82e4;
            }
            .lock-img-container {
                flex: 1;
                text-align: right;
                line-height: 0;
                img {
                    width: 20px;
                    height: 20px;
                    cursor: pointer;
                    &.readonly {
                        cursor: default;
                    }
                }
            }
        }
        .minor-affixes {
            color: #333;
            padding: 0 15px;
            .minor-affix {
                display: flex;
                align-items: center;
                .count {
                    display: inline-block;
                    width: 12px;
                    height: 12px;
                    border-radius: 2px;
                    text-align: center;
                    background-color: gray;
                    color: white;
                    font-family: 'Courier New', Courier, monospace;
                    margin-right: 4px;
                    // vertical-align: text-top;
                }
            }
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
            .cur-an {
                background: #a6a6a6;
                width: 33.3%;
            }
            .md-an {
                background: #2a82e4;
                width: 33.3%;
            }
            .tot-an {
                background: #66c238;
                width: 33.3%;
            }
        }
        .affix-full {
            position: absolute;
            left: 0;
            bottom: 0;
            right: 0;
            height: 20px;
            color: white;
            text-align: center;
            line-height: 20px;
            display: flex;
            .md-an {
                background: #2a82e4;
                width: 50%;
            }
            .tot-an {
                background: #66c238;
                width: 50%;
            }
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
        left: -5px;
        top: -5px;
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
    &.selected > .select-box {
        background-color: $primary-color;
    }
    &:hover > .select-box,
    &.select-mode > .select-box {
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
}
</style>