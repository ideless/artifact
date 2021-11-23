<template>
    <div class="root">
        <div class="layout-left">
            <artifact-card
                v-for="a in artifactsList"
                :key="a.data.id"
                :artifact="a"
            />
        </div>
        <div class="layout-right">
            <div class="section">导入</div>
            <div class="import">
                <text-button @click="importMona">导入</text-button>
                <span :class="{ 'import-msg': true, ok: importStatus }">{{
                    importMsg
                }}</span>
            </div>
            <div class="section">词条权重</div>
            <div class="affix-weights">
                <value-button
                    v-for="(val, key) in affixWeight"
                    :key="key"
                    v-model="affixWeight[key]"
                >
                    {{ affixName(key) }}
                </value-button>
            </div>
            <div class="section">筛选</div>
            <div class="filters">
                <div class="filter">
                    <span class="filter-name">套装：</span>
                    <drop-menu
                        class="filter-value"
                        :items="sets"
                        v-model="filter.set"
                    />
                </div>
                <div class="filter">
                    <span class="filter-name">部位：</span>
                    <drop-menu
                        class="filter-value"
                        :items="types"
                        v-model="filter.type"
                    />
                </div>
                <div class="filter">
                    <span class="filter-name">主词条：</span>
                    <drop-menu
                        class="filter-value"
                        :items="mainAffixes"
                        v-model="filter.mainAffix"
                    />
                </div>
                <div class="filter">
                    <span class="filter-name">等级：</span>
                    <range-slider
                        class="filter-value"
                        v-model="filter.lvRange"
                        :max="20"
                    />
                </div>
            </div>
            <div class="section">排序</div>
            <div class="orders">
                <el-radio
                    class="order"
                    v-model="orderBy"
                    label="currentAffixNumber"
                    >按当前词条数</el-radio
                >
                <el-radio
                    class="order"
                    v-model="orderBy"
                    label="minimumAffixNumber"
                    >按满级最小词条数</el-radio
                >
                <el-radio
                    class="order"
                    v-model="orderBy"
                    label="expectedAffixNumber"
                    >按满级期望词条数</el-radio
                >
                <el-radio
                    class="order"
                    v-model="orderBy"
                    label="maximumAffixNumber"
                    >按满级最大词条数</el-radio
                >
            </div>
            <div class="start">
                <text-button @click="updateArtifactsList">开始计算</text-button>
            </div>
        </div>
    </div>
    <div class="hidden">
        <input type="file" name="" ref="file-input" />
    </div>
</template>

<script>
import mona from "../ys/artifact/mona";
import useArtifacts from "../composables/useArtifacts";
import ArtifactCard from "../components/ArtifactCard.vue";
import TextButton from "../components/TextButton.vue";
import ValueButton from "../components/ValueButton.vue";
import DropMenu from "../components/DropMenu.vue";
import RangeSlider from "../components/RangeSlider.vue";

export default {
    components: {
        ArtifactCard,
        TextButton,
        ValueButton,
        DropMenu,
        RangeSlider,
    },
    setup() {
        const {
            artifacts,
            affixWeight,
            filter,
            orderBy,
            artifactsList,
            updateArtifactsList,
            affixName,
            sets,
            types,
            mainAffixes,
        } = useArtifacts();
        return {
            artifacts,
            affixWeight,
            filter,
            orderBy,
            artifactsList,
            updateArtifactsList,
            affixName,
            sets,
            types,
            mainAffixes,
        };
    },
    data: () => ({
        importStatus: false,
        importMsg: "",
    }),
    methods: {
        importMona() {
            let finput = this.$refs["file-input"];
            // @ts-ignore
            finput.value = "";
            // @ts-ignore
            finput.onchange = () => {
                // @ts-ignore
                let file = finput.files[0];
                var reader = new FileReader();
                reader.readAsText(file, "UTF-8");
                reader.onload = (evt) => {
                    try {
                        // @ts-ignore
                        this.artifacts = mona.loads(evt.target.result);
                        this.artifacts = this.artifacts.filter(
                            (a) => a.rarity == 5
                        );
                        let part = this.artifacts.length;
                        this.importStatus = true;
                        this.importMsg = `成功导入${part}个5星圣遗物`;
                        this.updateArtifactsList();
                    } catch (e) {
                        this.importStatus = false;
                        this.importMsg = "解析失败";
                    }
                };
                // @ts-ignore
                reader.onerror = (evt) => {
                    this.importStatus = false;
                    this.importMsg = "读取失败";
                };
                // @ts-ignore
                finput.onchange = undefined;
            };
            // @ts-ignore
            finput.click();
        },
    },
};
</script>

<style scoped>
.hidden {
    position: fixed;
    top: -999px;
}
.root {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    display: flex;
}
.layout-left {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-flow: wrap;
    padding: 30px 40px;
    position: relative;
}
.layout-left > * {
    margin: 10px 20px;
}
.layout-left > .busy-modal {
    position: absolute;
    margin: none;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    opacity: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff7;
    color: black;
}
.fade-enter-active,
.fade-leave-active {
    transition: all 200ms ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
.count {
    width: 100%;
    height: 20px;
    color: gray;
}
.layout-right {
    width: 500px;
    background: #d9d9d9;
    padding: 30px 40px;
    color: #444;
    font-size: 16px;
    font-weight: bold;
    overflow-y: auto;
    user-select: none;
}
/* Hide scrollbar for Chrome, Safari and Opera */
.layout-right::-webkit-scrollbar {
    display: none;
}
/* Hide scrollbar for IE, Edge and Firefox */
.layout-right {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
}
.layout-right > *:not(:last-child) {
    margin-bottom: 24px;
}
.section {
    color: #808080;
    font-size: 16px;
    font-weight: bold;
}
.import {
    padding: 0 10px;
    display: flex;
    align-items: center;
}
.import-msg {
    color: red;
    margin-left: 10px;
}
.import-msg.ok {
    color: #66c238;
}
.layout-right .affix-weights {
    margin-bottom: 14px;
}
.affix-weights > * {
    margin: 0 10px 10px 10px;
}
.filters {
    padding: 0 10px;
}
.filters > *:not(:last-child) {
    margin-bottom: 10px;
}
.filter {
    display: flex;
    align-items: center;
}
.filter-name {
    flex: 1;
    color: #444;
    font-size: 16px;
    font-weight: bold;
}
.filter-value {
    width: 300px;
}
.orders {
    padding: 0 10px;
}
.order {
    width: 160px;
    --el-radio-font-size: 16px;
    --el-radio-font-weight: bold;
    --el-radio-font-color: #444;
}
.start {
    display: flex;
    justify-content: center;
}
</style>
