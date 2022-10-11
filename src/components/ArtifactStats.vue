<script lang="ts" setup>
import { graphic } from 'echarts'
import { Artifact } from '@/ys/artifact';
import { getIncrePDF } from '@/ys/gacha/artifact';
import { computed, nextTick, ref, watch } from 'vue'
import { useStore } from '@/store';
import { toCDF, zeros } from '@/ys/gacha/utils';

const props = defineProps<{
    modelValue: boolean
    art?: Artifact
}>()
const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
}>()
const show = computed({
    get() { return props.modelValue },
    set(value: boolean) { emit('update:modelValue', value) }
})
const store = useStore()

let pdfs = ref<Array<{
    label: string
    data: number[]
}>>([])
let cdf: number[] = []

let option = ref({
    tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
            let { dataIndex, value } = params[0]
            let affnum = store.state.artMode.useMaxAsUnit ? (dataIndex / 10).toFixed(1) : (dataIndex / 8.5).toFixed(1)
            return `<table>
                <tr><td>词条数：</td><td>${affnum}</td><tr>
                <tr><td>概率：</td><td>${(value * 100).toFixed(1)}%</td><tr>
                <tr><td>1-累积概率：</td><td>${((1 - cdf[dataIndex]) * 100).toFixed(1)}%</td><tr>
            <table>`
        }
    },
    title: {
        left: 'center',
        text: '词条数概率分布'
    },
    toolbox: {
        feature: {
            saveAsImage: {},
            dataView: {},
        }
    },
    xAxis: {
        type: 'category',
        name: '词条数',
        nameLocation: 'middle',
        nameGap: 25,
        boundaryGap: false,
        data: [] as string[],
    },
    yAxis: {
        type: 'value',
        name: '概率',
    },
    series: [
        {
            name: '概率',
            type: 'line',
            symbol: 'none',
            smooth: true,
            itemStyle: {
                color: 'rgb(255, 70, 131)'
            },
            areaStyle: {
                color: new graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgb(255, 136, 175)'
                    },
                    {
                        offset: 1,
                        color: '#fff'
                    }
                ])
            },
            data: []
        }
    ]
});

// const chart = ref<VueEcharts>()

const level = ref('20')
const setLevel = (lvLabel: string) => {
    for (let p of pdfs.value) {
        if (p.label == lvLabel /*&& chart.value*/) {
            level.value = lvLabel;
            (option.value.series[0].data as any) = p.data
            cdf = toCDF(p.data)
            // chart.value!.refreshOption()
            return
        }
    }
}

watch(() => props.modelValue, (show) => {
    if (!show || !props.art) return
    // calc PDFs
    pdfs.value = []
    let curLv = Math.floor(props.art.level / 4),
        cur = Math.round(props.art.data.affnum.cur * 8.5)
    for (let i = curLv; i <= 5; ++i) {
        let label = i < 5 ? `${i * 4} +` : `20`
        let data = getIncrePDF(
            props.art.mainKey,
            store.state.weightInUse,
            props.art.minors.map(m => m.key),
            i - curLv,
        )
        data = zeros(cur).concat(data)
        pdfs.value.push({ label, data })
    }
    // update xAxis
    let N = pdfs.value.reduce((a, b) => Math.max(b.data.length, a), 0)
    option.value.xAxis.data = []
    for (let i = 0; i < N; ++i) {
        option.value.xAxis.data.push(store.state.artMode.useMaxAsUnit ? (i / 10).toFixed(1) : (i / 8.5).toFixed(1))
    }
    // pad zeros
    pdfs.value.forEach(p => {
        while (p.data.length < N) {
            p.data.push(0)
        }
    })
    // update plot
    nextTick(() => {
        setLevel('20')
    })
})
</script>

<template>
    <el-dialog title="统计" v-model="show" top="8vh">
        <v-chart :option="option" style="width: 100%; height: 300px;" autoresize ref="chart" />
        <div style="margin-top: 10px; text-align: center;">调整等级👇</div>
        <div style="margin-top: 10px; text-align: center;">
            <el-radio-group v-model="level" @change="setLevel">
                <el-radio-button :label="p.label" v-for="p in pdfs" />
            </el-radio-group>
        </div>
        <div style="margin-top: 10px; text-align: center;">更多功能正在开发中...</div>
    </el-dialog>
</template>

<style lang="scss">

</style>