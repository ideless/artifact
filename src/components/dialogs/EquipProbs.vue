<script lang="ts" setup>
import { computed, watch, ref } from "vue";
import { useArtifactStore } from "@/store";
import { Artifact } from "@/ys/artifact";
import { i18n } from "@/i18n";
import { IPEquipResult } from "@/ys/sort";
import ArtifactCard from "../widgets/ArtifactCard.vue";

const props = defineProps<{
    modelValue: boolean;
    art?: Artifact;
}>();
const emit = defineEmits<{
    (e: "update:modelValue", value: boolean): void;
}>();
const show = computed({
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value),
});

const artStore = useArtifactStore();

const equipProbsData = ref<
    Array<{
        art: Artifact;
        stats: string;
    }>
>([]);

function updEquipProbsData() {
    if (!props.art) return false;
    if (!artStore.sortResults) return false;
    if (artStore.sortResultType !== "pequip") return false;
    const result = artStore.sortResults.get(props.art) as IPEquipResult;
    if (!result) return false;
    let probs = [];
    for (let charKey in result.charProbs) {
        let b = artStore.builds.filter((b) => b.key == charKey)[0];
        probs.push({
            name: b ? b.name : i18n.global.t("ui.unknown"),
            prob: result.charProbs[charKey].prob,
            art: result.charProbs[charKey].art,
        });
    }
    probs.sort((a, b) => b.prob - a.prob);
    equipProbsData.value = probs.map((x) => ({
        art: x.art,
        stats: `超过此圣遗物的概率为${(x.prob * 100).toFixed(1) + "%"}`,
    }));
    return true;
}

watch(
    () => props.modelValue,
    (value) => {
        if (!value) return;
        if (!updEquipProbsData()) {
            show.value = false;
        }
    }
);
</script>

<template>
    <el-dialog v-model="show" :title="$t('ui.equip_probs_title')" top="5vh">
        <div class="arts-container">
            <div class="art-with-prob" v-for="e in equipProbsData">
                <artifact-card
                    :artifact="e.art"
                    :readonly="true"
                    :fixed-stats="e.stats"
                />
            </div>
        </div>
    </el-dialog>
</template>

<style scoped lang="scss">
.arts-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    height: 80vh;
    overflow-y: auto;

    .art-with-prob {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 5px;
    }
}
</style>
