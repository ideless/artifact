<script lang="ts" setup>
import ArtifactCard from './ArtifactCard.vue';
import ArtifactEditor from './ArtifactEditor.vue';
import { useStore } from '../store';
import { computed, ref, watch } from 'vue';

import type { ElScrollbar } from 'element-plus'
const store = useStore()
const stat = computed(() => {
    let nAll = store.state.filteredArtifacts.length
    let nFull = 0, nLock = 0
    for (let a of store.state.filteredArtifacts) {
        if (a.level == 20) nFull++
        if (a.data.lock) nLock++
    }
    return `共${nAll}个圣遗物，满级${nFull}个，加锁${nLock}个，解锁${nAll - nLock}个`
})
const flipLock = (index: number) => {
    store.commit('flipLock', { index })
}
const selectMode = ref(false)
const selection = ref([] as number[])
const selectionSet = computed<Set<number>>(() => {
    return new Set(selection.value)
})
const selected = (index: number) => {
    return selectionSet.value.has(index)
}
const lastSelect = { index: 0, selected: true }
const flipSelect = (index: number, shiftKey: boolean) => {
    if (!selectMode.value) {
        selectMode.value = true
        selection.value = [index]
        lastSelect.index = index
        lastSelect.selected = true
    } else if (!shiftKey) {
        let s = selectionSet.value, selected
        if (s.has(index)) {
            s.delete(index)
            selected = false
        } else {
            s.add(index)
            selected = true
        }
        selection.value = Array.from(s)
        lastSelect.index = index
        lastSelect.selected = selected
    } else if (index !== lastSelect.index) {
        let s = selectionSet.value, state = 0, ends = [index, lastSelect.index]
        for (let a of store.state.filteredArtifacts) {
            let start = false
            if (state == 0 && ends.includes(a.data.index)) {
                state = 1
                start = true
            }
            if (state == 1) {
                if (lastSelect.selected) {
                    s.add(a.data.index)
                } else {
                    s.delete(a.data.index)
                }
                if (!start && ends.includes(a.data.index)) {
                    break
                }
            }
        }
        selection.value = Array.from(s)
    }
}
const selectAll = () => {
    selection.value = []
    for (let a of store.state.filteredArtifacts) {
        selection.value.push(a.data.index)
    }
}
const deselectAll = () => {
    selection.value = []
}
const invSelection = () => {
    let S: Set<number> = new Set()
    for (let a of store.state.filteredArtifacts) {
        S.add(a.data.index)
    }
    for (let i of selection.value) {
        S.delete(i)
    }
    selection.value = Array.from(S)
}
const lockSelection = () => {
    store.commit('setLock', { lock: true, indices: selection.value })
    selection.value = []
}
const unlockSelection = () => {
    store.commit('setLock', { lock: false, indices: selection.value })
    selection.value = []
}
const deleteSelection = () => {
    store.commit('delete', { indices: selection.value })
    selection.value = []
}
const cancelSelect = () => {
    selectMode.value = false
    setTimeout(() => {
        selection.value = []
    }, 100)
}
const selectionStat = computed(() => {
    return `已选中 ${selection.value.length}/${store.state.filteredArtifacts.length}`
})
const showEditor = ref(false)
const editorIndex = ref(-1)
const edit = (index: number) => {
    editorIndex.value = index
    showEditor.value = true
}
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
watch(() => store.state.nReload, () => {
    scrollbarRef.value!.setScrollTop(0)
})
</script>

<template>
    <div class="layout-left">
        <el-scrollbar ref="scrollbarRef">
            <div class="artifact-stats">{{ stat }}</div>
            <div class="artifacts">
                <artifact-card
                    v-for="a in store.state.filteredArtifacts"
                    :artifact="a"
                    :select-mode="selectMode"
                    :selected="selected(a.data.index)"
                    @flip-select="flipSelect(a.data.index, $event)"
                    @flip-lock="flipLock(a.data.index)"
                    @edit="edit(a.data.index)"
                />
            </div>
            <transition name="pop">
                <div class="selection-bar" v-show="selectMode">
                    <span class="btn" @click="selectAll">全选</span>
                    <span class="btn" @click="deselectAll">全不选</span>
                    <span class="btn" @click="invSelection">反选</span>
                    <span class="split">|</span>
                    <span class="btn" @click="lockSelection">加锁</span>
                    <span class="btn" @click="unlockSelection">解锁</span>
                    <span class="split">|</span>
                    <span class="btn" @click="deleteSelection">删除</span>
                    <span class="split">|</span>
                    <span class="btn" @click="cancelSelect">取消</span>
                    <div class="selection-stat">{{ selectionStat }}</div>
                </div>
            </transition>
        </el-scrollbar>
    </div>
    <artifact-editor v-model="showEditor" :index="editorIndex" />
</template>

<style lang="scss" scoped>
.layout-left {
    flex: 1;
    position: relative;
    .artifact-stats {
        margin: 10px 20px;
        color: gray;
        height: 36px;
        line-height: 36px;
    }
    .artifacts {
        display: flex;
        flex-flow: wrap;
        justify-content: space-evenly;
        > * {
            margin: 10px;
        }
    }
    .selection-bar {
        position: absolute;
        top: 10px;
        left: 20px;
        right: 20px;
        height: 46px;
        background-color: #333;
        color: greenyellow;
        border-radius: 3px;
        box-shadow: 0 0 2px 0 #0007;
        display: flex;
        align-items: center;
        padding: 0 10px;
        line-height: 1;
        z-index: 2;
        .btn {
            margin: 0 2px;
            padding: 10px 5px;
            cursor: pointer;
            transition: background-color 100ms ease;
            border-radius: 3px;
            &:hover {
                background-color: #adff2f44;
            }
        }
        .split {
            margin: 0 5px;
        }
        .selection-stat {
            flex: 1;
            text-align: right;
        }
    }
}
</style>