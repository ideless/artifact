<script lang="ts" setup>
import ImportSection from "@/components/sections/ImportSection.vue";
import FilterSection from "@/components/sections/FilterSection.vue";
import SortSection from "@/components/sections/SortSection.vue";
import TextButton from "@/components/widgets/TextButton.vue";
import { useArtifactStore } from "@/store";

const artStore = useArtifactStore();
</script>

<template>
    <div class="layout-right">
        <el-scrollbar>
            <import-section />
            <filter-section />
            <sort-section />
            <div class="start-container">
                <text-button
                    @click="artStore.filterAndSort()"
                    v-text="$t('ui.start_calc')"
                />
            </div>
        </el-scrollbar>
    </div>
</template>

<style lang="scss" scoped>
.layout-right {
    width: 500px;
    background-color: $right-bgcolor;
    box-shadow: 0 0 4px 0 #ccc;
    color: #444;
    overflow-y: auto;
    user-select: none;

    .start-container {
        padding: 20px 0;
        margin-top: 20px;
        text-align: center;
        background-color: $right-bgcolor-trsp;
        backdrop-filter: blur(22px);
        border-top: 1px solid #e7e7e7;
        position: sticky;
        bottom: 0;
        z-index: 1;
    }
}

@-moz-document url-prefix() {
    .layout-right .start-container {
        background-color: $right-bgcolor;
    }
}
</style>
