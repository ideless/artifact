<script lang="ts" setup>
import ArtifactCard from "./ArtifactCard.vue";
import { Artifact } from "@/ys/artifact";
import { ref, computed, watch } from "vue";

const props = defineProps<{
    arts: Artifact[];
}>();

const BATCH_SIZE = 10;
const loadedCount = ref(0);
const loadMore = () => {
    if (loadedCount.value < props.arts.length) {
        loadedCount.value = Math.min(
            props.arts.length,
            loadedCount.value + BATCH_SIZE
        );
    }
};
const loadDisabled = computed(() => loadedCount.value >= props.arts.length);
const listEl = ref<HTMLDivElement>();
const scrollPercent = ref(0);
const showProgressMsg = ref(false);
const progressMsg = computed(() => {
    if (props.arts.length == 0) {
        return "0%";
    } else {
        return (
            (
                scrollPercent.value *
                (loadedCount.value / props.arts.length) *
                100
            ).toFixed(0) + "%"
        );
    }
});
let timer: any;
const onScroll = ({ scrollLeft }: { scrollLeft: number }) => {
    if (!listEl.value) return;
    // update scroll percent
    scrollPercent.value =
        (scrollLeft + listEl.value.clientWidth) / listEl.value.scrollWidth;
    // show progress msg, and hide it after 1s of idle
    showProgressMsg.value = true;
    clearTimeout(timer);
    timer = setTimeout(() => {
        showProgressMsg.value = false;
    }, 1000);
};

function init() {
    loadedCount.value = Math.min(props.arts.length, BATCH_SIZE);
    scrollPercent.value = 0;
}

watch(
    () => props.arts,
    () => init()
);

init();
</script>

<template>
    <el-scrollbar style="position: relative" @scroll="onScroll">
        <div
            ref="listEl"
            class="artifact-list"
            v-infinite-scroll="loadMore"
            :infinite-scroll-immediate="false"
            :infinite-scroll-disabled="loadDisabled"
        >
            <artifact-card
                class="list-item"
                v-for="i in loadedCount"
                :artifact="arts[i - 1]"
                :key="arts[i - 1].data.index"
                :readonly="true"
            />
        </div>
        <transition name="fade">
            <div
                class="progress"
                v-text="progressMsg"
                v-show="showProgressMsg"
            />
        </transition>
    </el-scrollbar>
</template>

<style lang="scss" scoped>
.artifact-list {
    display: flex;
    position: relative;

    .list-item {
        margin: 10px;
        zoom: 70%;
    }
}

.progress {
    position: absolute;
    bottom: 10px;
    right: 5px;
    padding: 2px 4px;
    border-radius: 4px;
    background-color: black;
    color: white;
    font-size: small;
}
</style>
