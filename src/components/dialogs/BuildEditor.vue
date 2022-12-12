<script lang="ts" setup>
import { ref, computed } from 'vue';
import CharBuilds from "@/ys/data/character"
import chs from '@/ys/locale/chs';

const props = defineProps<{
    modelValue: boolean
}>()
const emit = defineEmits<{
    (e: 'update:modelValue', v: boolean): void
}>()

const show = computed<boolean>({
    get() { return props.modelValue },
    set(v) { emit('update:modelValue', v) }
})

// left
const elements = ['pyro', 'hydro', 'cryo', 'electro', 'anemo', 'geo', 'dendro']
    .map(e => ({
        element: e,
        icon: `./assets/game_icons/${e}.webp`,
        text: chs.element[e],
    }))
// const avatars = <{
//     [k: string]: Array<{
//         text: string
//         icon: string
//         rarity: string
//     }>
// }>{}
const avatars = (() => {
    let ret: any = {}
    for (let c in CharBuilds) {
        let b = CharBuilds[c]
        if (!(b.element in ret)) ret[b.element] = []
        ret[b.element].push({
            text: chs.character[c],
            icon: c.startsWith('Traveler') ? './assets/char_faces/Traveler.webp' : `./assets/char_faces/${c}.webp`,
            rarity: b.rarity,
        })
    }
    for (let e in ret) {
        ret[e].sort((a: any, b: any) => b.rarity - a.rarity)
    }
    return ret
})()
</script>

<template>
    <el-dialog v-model="show" title="修改角色配装" top="2vh" bottom="2vh" width="90%">
        <div id="root">
            <div id="left">
                <el-scrollbar>
                    <div class="char-group" v-for="e in elements">
                        <div class="group-hdr">
                            <img class="element-icon" :src="e.icon" :alt="e.text">
                            <span class="element-text">{{ e.text }}</span>
                        </div>
                        <span class="avatar" v-for="a in avatars[e.element]">
                            <span :class="`icon r${a.rarity}`">
                                <img :src="a.icon" :alt="a.text">
                            </span>
                            <span>{{ a.text }}</span>
                        </span>
                    </div>
                </el-scrollbar>
            </div>
            <div id="right">right</div>
        </div>
    </el-dialog>
</template>

<style lang="scss" scoped>
#root {
    display: flex;
    align-items: stretch;
    height: 80vh;
    overflow: hidden;
    // box-shadow: 0 0 1px 0 black;

    #left {
        box-shadow: 0 0 1px 0 black;
        flex: 0.5;

        .char-group {
            .group-hdr {
                // box-shadow: 0 0 1px 0 black;
                display: flex;
                align-items: center;
                background: rgb(255, 249, 238);
                background: linear-gradient(90deg, rgba(255, 249, 238, 1) 0%, rgba(255, 255, 255, 1) 100%);

                .element-icon {
                    width: 30px;
                }

                .element-text {
                    margin-left: 10px;
                }
            }

            .avatar {
                display: inline-flex;
                flex-direction: column;
                align-items: center;
                margin: 5px;
                cursor: pointer;

                .icon {
                    width: 60px;
                    height: 60px;
                    border-radius: 5px;
                    overflow: hidden;
                    background-size: cover;
                    text-align: center;

                    &.r4 {
                        background-image: url(./assets/bg4.webp);
                    }

                    &.r5 {
                        background-image: url(./assets/bg5.webp);
                    }

                    img {
                        height: 100%;
                        transition: scale 100ms ease;
                    }
                }

                &:hover>.icon>img {
                    scale: 1.1;
                }
            }
        }
    }

    #right {
        box-shadow: 0 0 1px 0 black;
        flex: 0.5;
    }
}
</style>