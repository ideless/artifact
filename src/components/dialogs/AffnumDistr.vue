<script lang="ts" setup>
import { graphic } from "echarts";
import { Artifact } from "@/ys/artifact";
import { getAffnumCDF, getIncrePDF } from "@/ys/gacha/artifact";
import { computed, ref, watch } from "vue";
import { useArtifactStore } from "@/store";
import { moment, toCDF, toPDF, zeros } from "@/ys/gacha/utils";
import { ArtifactData } from "@/ys/data";
import { IAffnumResult } from "@/ys/sort";
import { i18n } from "@/i18n";

const props = defineProps<{
    modelValue: boolean;
    art?: Artifact;
}>();
const emit = defineEmits<{
    (e: "update:modelValue", value: boolean): void;
}>();

const show = computed({
    get() {
        return props.modelValue;
    },
    set(value: boolean) {
        emit("update:modelValue", value);
    },
});

const artStore = useArtifactStore();

let setBonus = 0;
const fmtAffnum = (n: number) => {
    n = (n / 10 + setBonus) * artStore.affnumMultiplier;
    return n.toFixed(1);
};
const toProb = (p: number) => (p * 100).toFixed(1) + "%";
function tooltipFormatter(dataIndex: number, value: number, cdf: number[]) {
    return `<table>
        <tr><td>${i18n.global.t("ui.affnum")}: </td>
            <td>${fmtAffnum(dataIndex)}</td><tr>
        <tr><td>${i18n.global.t("ui.prob")}: </td>
            <td>${toProb(value)}</td><tr>
        <tr><td>1-${i18n.global.t("ui.cumprob")}: </td>
            <td>${toProb(1 - cdf[dataIndex])}</td><tr>
    <table>`;
}

let pdfs = ref<
    Array<{
        label: string;
        data: number[];
    }>
>([]);
let cdf: number[] = [];
const level = ref("20");
const mean = ref("0.0");
const setLevel = (lvLabel: string) => {
    for (let p of pdfs.value) {
        if (p.label == lvLabel) {
            level.value = lvLabel;
            (option.value.series[0].data as any) = p.data;
            cdf = toCDF(p.data);
            mean.value = fmtAffnum(moment(p.data));
            return;
        }
    }
};

let option = ref({
    tooltip: {
        trigger: "axis",
        formatter: (params: any) => {
            let { dataIndex, value } = params[0];
            return tooltipFormatter(dataIndex, value, cdf);
        },
    },
    title: {
        left: "center",
        text: i18n.global.t("ui.affnumdistr"),
    },
    toolbox: {
        feature: {
            saveAsImage: {},
            dataView: {},
        },
    },
    xAxis: {
        type: "category",
        name: i18n.global.t("ui.affnum"),
        nameLocation: "middle",
        nameGap: 25,
        boundaryGap: false,
        data: [] as string[],
    },
    yAxis: {
        type: "value",
        name: i18n.global.t("ui.prob"),
    },
    series: [
        {
            name: i18n.global.t("ui.prob"),
            type: "line",
            symbol: "none",
            smooth: true,
            itemStyle: {
                color: "rgb(255, 70, 131)",
            },
            areaStyle: {
                color: new graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: "rgb(255, 136, 175)",
                    },
                    {
                        offset: 1,
                        color: "#fff",
                    },
                ]),
            },
            data: [],
        },
    ],
});

let pdfs2: Array<{
    label: string;
    data: number[];
}> = [];
let cdf2: number[] = [];
const counts = ["5", "10", "20", "50", "100", "200"];
const count = ref("100");
const mean2 = ref("0.0");
const prob = ref("0.0%");
const setCount = (c: string) => {
    for (let p of pdfs2) {
        if (p.label == c) {
            count.value = c;
            (option2.value.series[0].data as any) = p.data;
            cdf2 = toCDF(p.data);
            mean2.value = fmtAffnum(moment(p.data));
            for (let q of pdfs.value) {
                if (q.label == "20") {
                    prob.value = toProb(
                        q.data.reduce((a, b, c) => a + b * cdf2[c], 0)
                    );
                    break;
                }
            }
            return;
        }
    }
};

const option2 = ref({
    tooltip: {
        trigger: "axis",
        formatter: (params: any) => {
            let { dataIndex, value } = params[0];
            return tooltipFormatter(dataIndex, value, cdf2);
        },
    },
    title: {
        left: "center",
        text: i18n.global.t("ui.bestoftype_affnumdistr"),
    },
    toolbox: {
        feature: {
            saveAsImage: {},
            dataView: {},
        },
    },
    xAxis: {
        type: "category",
        name: i18n.global.t("ui.affnum"),
        nameLocation: "middle",
        nameGap: 25,
        boundaryGap: false,
        data: [] as string[],
    },
    yAxis: {
        type: "value",
        name: i18n.global.t("ui.prob"),
    },
    series: [
        {
            name: i18n.global.t("ui.prob"),
            type: "line",
            symbol: "none",
            smooth: true,
            itemStyle: {
                color: "rgb(255, 70, 131)",
            },
            areaStyle: {
                color: new graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: "rgb(255, 136, 175)",
                    },
                    {
                        offset: 1,
                        color: "#fff",
                    },
                ]),
            },
            data: [],
        },
    ],
});

const updPlots = () => {
    if (!props.art) return false;
    if (!artStore.sortResults || artStore.sortResultType != "affnum")
        return false;
    let result = artStore.sortResults.get(props.art) as IAffnumResult;
    if (!result) return false;
    // update set bonus
    setBonus = result.setBonus;
    // calc PDFs
    pdfs.value = [];
    let curLv = Math.floor(props.art.level / 4),
        cur = Math.round((result.cur - result.setBonus) * 10);
    for (let i = curLv; i <= 5; ++i) {
        let label = i < 5 ? `${i * 4} +` : `20`;
        let data = getIncrePDF(
            props.art.mainKey,
            result.weight,
            props.art.minors.map((m) => m.key),
            i - curLv
        );
        data = zeros(cur).concat(data);
        pdfs.value.push({ label, data });
    }
    // calc pdfs2
    cdf2 = getAffnumCDF(props.art.mainKey, result.weight, 5);
    let p = ArtifactData.mainDistr[props.art.slot][props.art.mainKey] / 5;
    pdfs2 = counts.map((c) => {
        let n = parseInt(c);
        return {
            label: c,
            data: toPDF(cdf2.map((x) => (p * x + 1 - p) ** n)),
        };
    });
    // update xAxis
    const N = 90;
    option.value.xAxis.data = [];
    for (let i = 0; i < N; ++i) {
        option.value.xAxis.data.push(fmtAffnum(i));
    }
    option2.value.xAxis.data = option.value.xAxis.data;
    // pad zeros
    pdfs.value.forEach((p) => {
        while (p.data.length < N) {
            p.data.push(0);
        }
    });
    pdfs2.forEach((p) => {
        while (p.data.length < N) {
            p.data.push(0);
        }
    });
    // update plot
    setLevel("20");
    setCount("100");
    return true;
};

watch(
    () => props.modelValue,
    (value) => {
        if (!value) return;
        if (!updPlots()) {
            show.value = false;
        }
    }
);
</script>

<template>
    <el-dialog :title="$t('ui.affnumdistr')" v-model="show" top="2vh">
        <div class="num-wrapper">
            <div class="num">
                <div
                    class="desc"
                    v-text="$t('ui.avgaffnum_atlevel', { level })"
                />
                <div class="value">{{ mean }}</div>
            </div>
            <div class="num">
                <div
                    class="desc"
                    v-text="$t('ui.avgaffnum_bestofn', { count })"
                />
                <div class="value">{{ mean2 }}</div>
            </div>
            <div class="num">
                <div class="desc" v-text="$t('ui.prob_beatn', { count })" />
                <div class="value">{{ prob }}</div>
            </div>
        </div>
        <el-divider />
        <v-chart :option="option" class="chart" autoresize />
        <div class="row" v-text="$t('ui.set_level')" />
        <div class="row">
            <el-radio-group v-model="level" @change="setLevel">
                <el-radio-button :label="p.label" v-for="p in pdfs" />
            </el-radio-group>
        </div>
        <el-divider />
        <v-chart :option="option2" class="chart" autoresize />
        <div class="row" v-text="$t('ui.set_count')" />
        <div class="row">
            <el-radio-group v-model="count" @change="setCount">
                <el-radio-button :label="c" v-for="c in counts" />
            </el-radio-group>
        </div>
    </el-dialog>
</template>

<style lang="scss" scoped>
.row {
    margin: 10px 0;
    text-align: center;
}

.chart {
    width: 100%;
    height: 300px;
    margin-top: 20px;
}

.num-wrapper {
    display: flex;
    justify-content: space-evenly;

    .num {
        flex: 1;
        margin: 20px;
        text-align: center;

        .desc {
            font-size: 12px;
            color: #bbb;
        }

        .value {
            font-size: 28px;
            font-weight: bold;
            color: rgb(194, 36, 89);
        }
    }
}
</style>
