<script lang="ts" setup>
import ArtifactCard from "@/components/widgets/ArtifactCard.vue";
import ArtifactEditor from "@/components/dialogs/ArtifactEditor.vue";
import AffnumDistr from "@/components/dialogs/AffnumDistr.vue";
import ArtifactCreator from "@/components/dialogs/ArtifactCreator.vue";
import ArtifactGenerator from "@/components/dialogs/ArtifactGenerator.vue";
import PartialExport from "@/components/dialogs/PartialExport.vue";
import AlikeLocker from "@/components/dialogs/AlikeLocker.vue";
import DefeatList from "@/components/dialogs/DefeatList.vue";
import BuildProbs from "@/components/dialogs/BuildProbs.vue";
import EquipProbs from "@/components/dialogs/EquipProbs.vue";
import DatabaseLoader from "@/components/dialogs/DatabaseLoader.vue";
import QuickFilter from "@/components/dialogs/QuickFilter.vue";
import Grid from "vue-virtual-scroll-grid";
import { useArtifactStore, useUiStore } from "@/store";
import { computed, ref, watch } from "vue";
// import type { ElScrollbar } from "element-plus";
import {
    View,
    Sort,
    CirclePlus,
    MagicStick,
    Stopwatch,
    Coin,
} from "@element-plus/icons-vue";
import { Artifact } from "@/ys/artifact";

const artStore = useArtifactStore();
const uiStore = useUiStore();

const count = computed(() => {
    let all = artStore.processedArtifacts.length;
    let full = 0,
        lock = 0;
    for (let a of artStore.processedArtifacts) {
        if (a.level == 20) full++;
        if (a.lock) lock++;
    }
    return {
        all,
        full,
        lock,
        unlock: all - lock,
    };
});

const flipLock = (index: number) => {
    artStore.flipLock(index);
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
let onboardingSelectArtsShowed = false;
const flipSelect = (index: number, shiftKey: boolean) => {
    if (!onboardingSelectArtsShowed) {
        onboardingSelectArtsShowed = true;
        uiStore.popOnboardingDialog("selectArts");
    }
    if (!selectMode.value) {
        selectMode.value = true;
        selection.value = [index];
        lastSelect.index = index;
        lastSelect.selected = true;
    } else if (!shiftKey) {
        let s = selectionSet.value,
            selected;
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
        let s = selectionSet.value,
            state = 0,
            ends = [index, lastSelect.index];
        for (let a of artStore.processedArtifacts) {
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
    for (let a of artStore.processedArtifacts) {
        selection.value.push(a.data.index);
    }
};
const deselectAll = () => {
    selection.value = [];
};
const invSelection = () => {
    let S: Set<number> = new Set();
    for (let a of artStore.processedArtifacts) {
        S.add(a.data.index);
    }
    for (let i of selection.value) {
        S.delete(i);
    }
    selection.value = Array.from(S);
};
const lockSelection = () => {
    artStore.setLocks(selection.value, true);
    selection.value = [];
};
const unlockSelection = () => {
    artStore.setLocks(selection.value, false);
    selection.value = [];
};
const delSelection = () => {
    artStore.delArtifacts(selection.value);
    selection.value = [];
};
const cancelSelect = () => {
    selectMode.value = false;
    setTimeout(() => {
        selection.value = [];
    }, 100);
};
const selcount = computed(() => ({
    all: artStore.processedArtifacts.length,
    sel: selection.value.length,
}));
// target artifact
const tgtArt = ref<Artifact>();
// editor
const showEditor = ref(false);
const editorIndex = ref(-1);
const edit = (index: number) => {
    editorIndex.value = index;
    showEditor.value = true;
};
// filter
const showQuickFilter = ref(false);
const filter = (art: Artifact) => {
    tgtArt.value = art;
    showQuickFilter.value = true;
};
// stats
const showAffnumDistr = ref(false);
const showDefeatList = ref(false);
const showBuildProbs = ref(false);
const showEquipProbs = ref(false);
const stats = (art: Artifact) => {
    tgtArt.value = art;
    switch (artStore.sortResultType) {
        case "affnum":
            showAffnumDistr.value = true;
            break;
        case "defeat":
            showDefeatList.value = true;
            break;
        case "pbuild":
            showBuildProbs.value = true;
            break;
        case "pequip":
            showEquipProbs.value = true;
            break;
    }
};
// export
const showExport = ref(false);
const artifactsToExport = ref<Artifact[]>([]);
const exportSelection = () => {
    artifactsToExport.value = artStore.processedArtifacts.filter((a) =>
        selectionSet.value.has(a.data.index)
    );
    showExport.value = true;
};
// 倒序
const reverseOrder = computed({
    get() {
        return artStore.artMode.reverseOrder;
    },
    set(v) {
        artStore.artMode.reverseOrder = v;
        uiStore.run(() => {}); // 强制刷新virtual-scroll-grid
    },
});
// 圣遗物列表
const artifacts = computed(() => {
    if (reverseOrder.value) {
        return artStore.processedArtifacts.slice().reverse();
    } else {
        return artStore.processedArtifacts;
    }
});
// 配置方法见https://vuejsexamples.com/virtual-scroll-grid-for-vue-3/
const pageProvider = async (pageNumber: number, pageSize: number) => {
    return artifacts.value.slice(
        pageNumber * pageSize,
        (pageNumber + 1) * pageSize
    );
};
// 手动添加
const showCreator = ref(false);
// 随机生成
const showGenerator = ref(false);
// 相似圣遗物
const alikeEnabled = computed({
    get() {
        return artStore.artMode.alikeEnabled;
    },
    set(v) {
        artStore.artMode.alikeEnabled = v;
    },
});
const showAlike = ref(false);
const targetIndex = ref(-1);
// 数据库导入/导出
const showDatabaseLoader = ref(false);
</script>

<template>
    <div class="layout-left">
        <el-scrollbar ref="scrollbarRef">
            <div class="artifact-opts">
                <div class="count" v-text="$t('ui.art_count', count)" />
                <div class="btns">
                    <div
                        :class="{ btn: true, checked: reverseOrder }"
                        @click="reverseOrder = !reverseOrder"
                        role="button"
                    >
                        <el-icon>
                            <Sort />
                        </el-icon>
                        <span v-text="$t('ui.rev_ord')" />
                    </div>
                    <div
                        :class="{ btn: true, checked: alikeEnabled }"
                        @click="alikeEnabled = !alikeEnabled"
                        :title="$t('ui.alike_desc')"
                        role="button"
                    >
                        <el-icon>
                            <Stopwatch />
                        </el-icon>
                        <span v-text="$t('ui.alike')" />
                    </div>
                    <div
                        :class="{
                            btn: true,
                            checked: artStore.artMode.normalize,
                        }"
                        @click="
                            artStore.artMode.normalize =
                                !artStore.artMode.normalize
                        "
                        role="button"
                    >
                        <el-icon>
                            <View />
                        </el-icon>
                        <span v-text="$t('ui.normalize_affixes')" />
                    </div>
                    <div
                        class="btn"
                        @click="showCreator = true"
                        :title="$t('ui.add_art')"
                        role="button"
                    >
                        <el-icon>
                            <circle-plus />
                        </el-icon>
                    </div>
                    <div
                        class="btn"
                        @click="showGenerator = true"
                        :title="$t('ui.gen_rand_art')"
                        role="button"
                    >
                        <el-icon>
                            <magic-stick />
                        </el-icon>
                    </div>
                    <div
                        class="btn"
                        @click="showDatabaseLoader = true"
                        :title="$t('ui.database_loader_title')"
                        role="button"
                    >
                        <el-icon>
                            <Coin />
                        </el-icon>
                    </div>
                </div>
            </div>
            <Grid
                class="artifact-grid"
                :key="uiStore.nReload"
                :length="artifacts.length"
                :page-size="50"
                :page-provider="pageProvider"
            >
                <template v-slot:default="{ item, style, _index }">
                    <div class="artifact-cell" :style="style">
                        <artifact-card
                            :artifact="item"
                            :select-mode="selectMode"
                            :selected="selected(item.data.index)"
                            @flip-select="flipSelect(item.data.index, $event)"
                            @flip-lock="flipLock(item.data.index)"
                            @edit="edit(item.data.index)"
                            @filter="filter(item)"
                            @stats="stats(item)"
                        />
                    </div>
                </template>
            </Grid>
            <transition name="pop">
                <div class="selection-bar" v-show="selectMode">
                    <div
                        class="btn"
                        @click="selectAll"
                        v-text="$t('ui.sel_all')"
                    />
                    <div
                        class="btn"
                        @click="invSelection"
                        v-text="$t('ui.inv_sel')"
                    />
                    <div class="split">|</div>
                    <div
                        class="btn"
                        @click="lockSelection"
                        v-text="$t('ui.lock')"
                    />
                    <div
                        class="btn"
                        @click="unlockSelection"
                        v-text="$t('ui.unlock')"
                    />
                    <div class="split">|</div>
                    <div
                        class="btn"
                        @click="delSelection"
                        v-text="$t('ui.del')"
                    />
                    <div
                        class="btn"
                        @click="exportSelection"
                        v-text="$t('ui.partial_expo')"
                    />
                    <div class="split">|</div>
                    <div
                        class="btn"
                        @click="cancelSelect"
                        v-text="$t('ui.cancel')"
                    />
                    <div
                        class="selection-stat"
                        v-text="$t('ui.sel_count', selcount)"
                    />
                </div>
            </transition>
        </el-scrollbar>
    </div>
    <artifact-editor v-model="showEditor" :index="editorIndex" />
    <quick-filter v-model="showQuickFilter" :art="tgtArt" />
    <artifact-creator v-model="showCreator" />
    <artifact-generator v-model="showGenerator" />
    <partial-export v-model="showExport" :artifacts="artifactsToExport" />
    <alike-locker v-model="showAlike" :index="targetIndex" />
    <affnum-distr v-model="showAffnumDistr" :art="tgtArt" />
    <defeat-list v-model="showDefeatList" :art="tgtArt" />
    <build-probs v-model="showBuildProbs" :art="tgtArt" />
    <equip-probs v-model="showEquipProbs" :art="tgtArt" />
    <database-loader v-model="showDatabaseLoader" />
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

        .count {
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
