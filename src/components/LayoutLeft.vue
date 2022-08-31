<script lang="ts" setup>
import ArtifactCard from './ArtifactCard.vue';
import ArtifactEditor from './ArtifactEditor.vue';
import ArtifactCreator from './ArtifactCreator.vue';
import PartialExport from './PartialExport.vue';
import AlikeLocker from './AlikeLocker.vue';
import Grid from 'vue-virtual-scroll-grid'
import { useStore } from '@/store';
import { computed, ref, watch } from 'vue';
import type { ElScrollbar } from 'element-plus'
import { View, Sort, CirclePlus, Stopwatch } from '@element-plus/icons-vue';
import { Artifact } from '@/ys/artifact';
const store = useStore();
const stat = computed(() => {
    let nAll = store.state.filteredArtifacts.length;
    let nFull = 0, nLock = 0;
    for (let a of store.state.filteredArtifacts) {
        if (a.level == 20) nFull++;
        if (a.lock) nLock++;
    }
    return `共${nAll}个圣遗物，满级${nFull}个，加锁${nLock}个，解锁${nAll - nLock}个`;
});
const flipLock = (index: number) => {
    store.dispatch('flipLock', { index });
    if (alikeEnabled.value) {
        targetIndex.value = index;
        showAlike.value = true;
    }
};
const selectMode = ref(false);
const selection = ref([] as number[]);
const selectionSet = computed<Set<number>>(() => {
    return new Set(selection.value);
});
const selected = (index: number) => {
    return selectionSet.value.has(index);
};
const lastSelect = { index: 0, selected: true };
const flipSelect = (index: number, shiftKey: boolean) => {
    if (!selectMode.value) {
        selectMode.value = true;
        selection.value = [index];
        lastSelect.index = index;
        lastSelect.selected = true;
    } else if (!shiftKey) {
        let s = selectionSet.value, selected;
        if (s.has(index)) {
            s.delete(index);
            selected = false;
        } else {
            s.add(index);
            selected = true;
        }
        selection.value = Array.from(s);
        lastSelect.index = index;
        lastSelect.selected = selected;
    } else if (index !== lastSelect.index) {
        let s = selectionSet.value, state = 0, ends = [index, lastSelect.index];
        for (let a of store.state.filteredArtifacts) {
            let start = false;
            if (state == 0 && ends.includes(a.data.index)) {
                state = 1;
                start = true;
            }
            if (state == 1) {
                if (lastSelect.selected) {
                    s.add(a.data.index);
                } else {
                    s.delete(a.data.index);
                }
                if (!start && ends.includes(a.data.index)) {
                    break;
                }
            }
        }
        selection.value = Array.from(s);
    }
};
const selectAll = () => {
    selection.value = [];
    for (let a of store.state.filteredArtifacts) {
        selection.value.push(a.data.index);
    }
};
const deselectAll = () => {
    selection.value = [];
};
const invSelection = () => {
    let S: Set<number> = new Set();
    for (let a of store.state.filteredArtifacts) {
        S.add(a.data.index);
    }
    for (let i of selection.value) {
        S.delete(i);
    }
    selection.value = Array.from(S);
};
const lockSelection = () => {
    store.dispatch('setLock', { lock: true, indices: selection.value });
    selection.value = [];
}
const unlockSelection = () => {
    store.dispatch('setLock', { lock: false, indices: selection.value });
    selection.value = [];
}
const delSelection = () => {
    store.dispatch('delArtifacts', { indices: selection.value });
    selection.value = [];
}
const cancelSelect = () => {
    selectMode.value = false;
    setTimeout(() => {
        selection.value = [];
    }, 100);
};
const selectionStat = computed(() => {
    return `已选中 ${selection.value.length}/${store.state.filteredArtifacts.length}`;
})
// editor
const showEditor = ref(false);
const editorIndex = ref(-1);
const edit = (index: number) => {
    editorIndex.value = index;
    showEditor.value = true;
};
// export
const showExport = ref(false);
const artifactsToExport = ref<Artifact[]>([]);
const exportSelection = () => {
    artifactsToExport.value = store.state.filteredArtifacts.filter(a => selectionSet.value.has(a.data.index));
    showExport.value = true;
}
// scrollbar
// const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
// watch(() => store.state.nReload, () => {
//     selection.value = []
//     scrollbarRef.value!.setScrollTop(0)
// })
// 倒序
const reverseOrder = ref(false);
watch(reverseOrder, () => {
    store.dispatch('reload'); // 强制刷新virtual-scroll-grid
})
// 圣遗物列表
const artifacts = computed(() => {
    if (reverseOrder.value) {
        return store.state.filteredArtifacts.slice().reverse();
    } else {
        return store.state.filteredArtifacts;
    }
});
// 配置方法见https://vuejsexamples.com/virtual-scroll-grid-for-vue-3/
const pageProvider = async (pageNumber: number, pageSize: number) => {
    return artifacts.value.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);
};
// x0.85
const useMaxAsUnit = computed({
    get() {
        return store.state.artMode.useMaxAsUnit;
    },
    set(v) {
        store.commit("setArtMode", { useMaxAsUnit: v });
    },
});
// 显示词条数
const showAffnum = computed({
    get() {
        return store.state.artMode.showAffnum;
    },
    set(v) {
        store.commit("setArtMode", { showAffnum: v });
    },
});
// 手动添加
const showCreator = ref(false);
// 相似圣遗物
const alikeEnabled = ref(true);
const showAlike = ref(false);
const targetIndex = ref(-1);
</script>

<template>
    <div class="layout-left">
        <el-scrollbar ref="scrollbarRef">
            <div class="artifact-opts">
                <div class="stat">{{ stat }}</div>
                <div class="btns">
                    <div :class="{ btn: true, checked: reverseOrder }" @click="reverseOrder = !reverseOrder">
                        <el-icon>
                            <Sort />
                        </el-icon>
                        <span>倒序</span>
                    </div>
                    <div :class="{ btn: true, checked: useMaxAsUnit }" @click="useMaxAsUnit = !useMaxAsUnit"
                    >
                        <el-icon>
                            <View />
                        </el-icon>
                        <span>×0.85</span>
                    </div>
                    <div :class="{ btn: true, checked: alikeEnabled }" @click="alikeEnabled = !alikeEnabled">
                        <el-icon>
                            <Stopwatch />
                        </el-icon>
                        <span>加锁联想</span>
                    </div>
                    <div :class="{ btn: true, checked: showAffnum }" @click="showAffnum = !showAffnum"
                    >
                        <el-icon>
                            <View />
                        </el-icon>
                        <span>显示词条数</span>
                    </div>
                    <div class="btn" @click="showCreator = true" title="手动添加">
                        <el-icon>
                            <circle-plus />
                        </el-icon>
                        <span>手动添加</span>
                    </div>                    
                </div>
            </div>
            <Grid class="artifact-grid" :key="store.state.nReload" :length="artifacts.length" :page-size="50" :page-provider="pageProvider">
                <template v-slot:default="{ item, style, index }">
                    <div class="artifact-cell" :style="style">
                        <artifact-card 
                            :artifact="item" 
                            :select-mode="selectMode" 
                            :selected="selected(item.data.index)"
                            :show-affnum="showAffnum" 
                            @flip-select="flipSelect(item.data.index, $event)"
                            @flip-lock="flipLock(item.data.index)" 
                            @edit="edit(item.data.index)" />
                    </div>
                </template>
            </Grid>
            <transition name="pop">
                <div class="selection-bar" v-show="selectMode">
                    <div class="btn" @click="selectAll">全选</div>
                    <div class="btn" @click="deselectAll">全不选</div>
                    <div class="btn" @click="invSelection">反选</div>
                    <div class="split">|</div>
                    <div class="btn" @click="lockSelection">加锁</div>
                    <div class="btn" @click="unlockSelection">解锁</div>
                    <div class="split">|</div>
                    <div class="btn" @click="delSelection">删除</div>
                    <div class="btn" @click="exportSelection">部分导出</div>
                    <div class="split">|</div>
                    <div class="btn" @click="cancelSelect">取消</div>
                    <div class="selection-stat">{{ selectionStat }}</div>
                </div>
            </transition>
        </el-scrollbar>
    </div>
    <artifact-editor v-model="showEditor" :index="editorIndex" />
    <artifact-creator v-model="showCreator" />
    <partial-export v-model="showExport" :artifacts="artifactsToExport" />
    <alike-locker v-model="showAlike" :index="targetIndex" />
</template>

<style lang="scss" scoped>
.layout-left {
    flex: 1;
    position: relative;
    .artifact-opts {
        margin: 10px 20px;
        color: gray;
        height: 36px;
        font-size: 14px;
        font-weight: normal;
        border-bottom: 1px dashed lightgray;
        display: flex;
        align-items: center;
        .stat {
            flex: 1;
            line-height: 36px;
        }
        .btn {
            display: inline-flex;
            margin: 0 4px;
            cursor: pointer;
            align-items: center;
            // border-radius: 50px;
            // transition: all 100ms ease;
            .el-icon {
                margin-right: 2px;
            }
            &.checked {
                color: #409eff;
            }
            &:hover {
                color: #409eff;
                // box-shadow: 0 0 0 4px #409eff20;
                // background-color: #409eff20;
            }
        }
    }
    .artifact-grid {
        display: grid;
        margin: 0 20px 20px 20px;
        grid-gap: 10px;
        grid-template-columns: repeat(1, 1fr);
        grid-template-rows: 240px; // 图省事用了固定高度，因为圣遗物卡牌高度是240px
        // 动态列数
        // 圣遗物卡片的宽度200px，控制面板宽度500px，左右边距各20px，列间距10px
        // 公式：最小宽度 = 530 + 列数 * 210
        @media (min-width: 950px) {
            & {
                grid-template-columns: repeat(2, 1fr);
            }
        }
        @media (min-width: 1160px) {
            & {
                grid-template-columns: repeat(3, 1fr);
            }
        }
        @media (min-width: 1370px) {
            & {
                grid-template-columns: repeat(4, 1fr);
            }
        }
        @media (min-width: 1580px) {
            & {
                grid-template-columns: repeat(5, 1fr);
            }
        }
        @media (min-width: 1790px) {
            & {
                grid-template-columns: repeat(6, 1fr);
            }
        }
        @media (min-width: 2000px) {
            & {
                grid-template-columns: repeat(7, 1fr);
            }
        }
        @media (min-width: 2210px) {
            & {
                grid-template-columns: repeat(8, 1fr);
            }
        }
        .artifact-cell {
            // border: 1px solid lightgray;
            display: flex;
            justify-content: center;
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
         // overflow-x: auto;
        user-select: none;
        word-break: keep-all;
        white-space: nowrap;
        .btn {
            margin: 0 8px;
            cursor: pointer;
            transition: all 50ms ease;
            border-radius: 3px;
            &:hover {
                background-color: #adff2f44;
                box-shadow: 0 0 0 8px #adff2f44;
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