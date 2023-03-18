<script lang="ts" setup>
import SectionTitle from "@/components/sections/SectionTitle.vue";
import SingleSelect from "@/components/widgets/SingleSelect.vue";
import MultiSelect from "@/components/widgets/MultiSelect.vue";
import CharSelect from "@/components/widgets/CharSelect.vue";
import PresetLoader from "@/components/dialogs/PresetLoader.vue";
import BuildLoader from "@/components/dialogs/BuildLoader.vue";
import BuildEditor from "@/components/dialogs/BuildEditor.vue";
import ValueButton from "@/components/widgets/ValueButton.vue";
import AffnumTable from "../dialogs/AffnumTable.vue";
import { computed, ref } from "vue";
import { useArtifactStore } from "@/store";
import { ArtifactData } from "@/ys/data";
import { i18n } from "@/i18n";

const artStore = useArtifactStore();

// 排序方式
const sortByOptions = [
    "avg",
    "avgpro",
    "pmulti",
    "psingle",
    "defeat",
    "set",
    "index",
].map((key) => ({
    key,
    label: i18n.global.t(`sort.${key}.name`),
}));

// 按满级期望词条数
const showPresetLoader = ref(false);
const openPresetLoader = () => (showPresetLoader.value = true);
const multiplierOptions = [
    {
        key: "1",
        label: i18n.global.t("ui.multiplier_max"),
    },
    {
        key: "1/0.85",
        label: i18n.global.t("ui.multiplier_avg"),
    },
    {
        key: "7.8",
        label: i18n.global.t("ui.multiplier_crit"),
    },
];

// 按角色适配概率（多人）
const charOptions = computed(() => {
    return artStore.builds.map((b) => ({ key: b.key, name: b.name }));
});
// 按角色适配概率（单人）
const setsOptions = ArtifactData.setKeys.map((key) => ({
    key,
    label: i18n.global.t("artifact.set." + key),
    icon: `./assets/artifacts/${key}/flower.webp`,
}));
const sandsOptions = ArtifactData.mainKeys.sands.map((m) => ({
    key: m,
    label: i18n.global.t("artifact.affix." + m),
}));
const gobletOptions = ArtifactData.mainKeys.goblet.map((m) => ({
    key: m,
    label: i18n.global.t("artifact.affix." + m),
}));
const circletOptions = ArtifactData.mainKeys.circlet.map((m) => ({
    key: m,
    label: i18n.global.t("artifact.affix." + m),
}));
// 按上位替代数
// 不排序
// *词条数

// 配装加载窗口
const showBuildLoader = ref(false);
const openBuildLoader = () => (showBuildLoader.value = true);

const showBuildEditor = ref(false);
const openBuildEditor = () => (showBuildEditor.value = true);

const showAffnumTable = ref(false);
const openAffnumTable = () => (showAffnumTable.value = true);
</script>

<template>
    <div class="section">
        <section-title :title="$t('ui.sort')" />
        <div class="content">
            <single-select
                class="row"
                v-model="artStore.sort.by"
                :options="sortByOptions"
                :title="$t('ui.sortby')"
            />
            <div v-if="artStore.sort.by == 'avg'">
                <p class="row small" v-text="$t('sort.avg.desc')" />
                <p class="row small">
                    <span
                        class="text-btn"
                        @click="openPresetLoader"
                        v-text="$t('ui.load_preset')"
                        role="button"
                    />
                </p>
                <p
                    class="info"
                    style="margin-top: 10px"
                    v-text="$t('ui.weight_btn_help')"
                />
                <value-button
                    class="weight-button"
                    v-for="(_, key) in artStore.sort.weight"
                    v-model="artStore.sort.weight[key]"
                >
                    {{ $t("artifact.affix." + key) }}
                </value-button>
                <single-select
                    :title="$t('ui.multiplier')"
                    :options="multiplierOptions"
                    v-model="artStore.affnumMultiplierKey"
                    style="margin-top: 10px"
                />
            </div>
            <div v-else-if="artStore.sort.by == 'avgpro'">
                <p class="row small" v-text="$t('sort.avg.desc')" />
                <p class="row small" v-text="$t('sort.avgpro.desc')" />
                <p class="row small">
                    <span
                        class="text-btn"
                        v-text="$t('ui.edit_table')"
                        @click="openAffnumTable"
                    />
                </p>
                <single-select
                    :title="$t('ui.multiplier')"
                    :options="multiplierOptions"
                    v-model="artStore.affnumMultiplierKey"
                    style="margin-top: 10px"
                />
            </div>
            <div v-else-if="artStore.sort.by == 'pmulti'">
                <p class="row small" v-text="$t('sort.pmulti.desc')" />
                <p class="row small" v-html="$t('sort.pmulti.desc2')" />
                <p class="row small">
                    <span
                        class="text-btn"
                        @click="openBuildEditor"
                        v-text="$t('ui.edit_builds')"
                        role="button"
                    />
                </p>
                <char-select
                    class="row"
                    :title="$t('ui.build')"
                    :options="charOptions"
                    v-model="artStore.sort.buildKeys"
                />
            </div>
            <div v-else-if="artStore.sort.by == 'psingle'">
                <p class="row small" v-text="$t('sort.pmulti.desc')" />
                <p class="row small">
                    <span
                        class="text-btn"
                        @click="openBuildEditor"
                        style="margin-right: 8px"
                        v-text="$t('ui.edit_builds')"
                        role="button"
                    />
                    <span
                        class="text-btn"
                        @click="openBuildLoader"
                        v-text="$t('ui.load_build')"
                        role="button"
                    />
                </p>
                <p
                    class="info"
                    style="margin-top: 10px"
                    v-text="$t('ui.weight_btn_help')"
                />
                <value-button
                    class="weight-button"
                    v-for="(_, key) in artStore.sort.weight"
                    v-model="artStore.sort.weight[key]"
                >
                    {{ $t("artifact.affix." + key) }}
                </value-button>
                <multi-select
                    class="row"
                    v-model="artStore.sort.set"
                    :options="setsOptions"
                    :title="$t('sort.psingle.set')"
                    :use-icon="true"
                />
                <multi-select
                    class="row"
                    v-model="artStore.sort.sands"
                    :options="sandsOptions"
                    :title="$t('sort.psingle.sands')"
                />
                <multi-select
                    class="row"
                    v-model="artStore.sort.goblet"
                    :options="gobletOptions"
                    :title="$t('sort.psingle.goblet')"
                />
                <multi-select
                    class="row"
                    v-model="artStore.sort.circlet"
                    :options="circletOptions"
                    :title="$t('sort.psingle.circlet')"
                />
            </div>
            <div v-else-if="artStore.sort.by == 'defeat'">
                <p class="row small" v-text="$t('sort.defeat.desc')" />
            </div>
        </div>
    </div>
    <preset-loader v-model="showPresetLoader" />
    <build-loader v-model="showBuildLoader" />
    <build-editor v-model="showBuildEditor" />
    <affnum-table v-model="showAffnumTable" />
</template>

<style lang="scss" scoped>
.info-wrapper {
    font-size: 12px;

    p {
        margin: 4px;
    }
}

.content {
    margin-top: 24px;
    padding: 0 10px;

    .row {
        margin-top: 15px;
    }

    .small {
        font-size: 12px;
        color: gray;
        margin-top: 10px;
        text-align: center;
    }

    .text-btn {
        color: $primary-color;
        cursor: pointer;

        &:hover {
            text-decoration: underline;
        }
    }

    .weight-button {
        margin: 10px 10px 0 0;
    }
}
</style>
