<script lang="ts" setup>
import { graphic } from 'echarts'
import { Artifact } from '@/ys/artifact';
import { getAffnumCDF, getIncrePDF } from '@/ys/gacha/artifact';
import { computed, nextTick, ref, watch } from 'vue'
import { useStore } from '@/store';
import { moment, toCDF, toPDF, zeros } from '@/ys/gacha/utils';
import AritfactData from '@/ys/data/artifact'

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

const toAffnum = (n: number) => store.state.artMode.useMaxAsUnit ? (n / 10).toFixed(1) : (n / 8.5).toFixed(1)
const toProb = (p: number) => (p * 100).toFixed(1) + '%'

let pdfs = ref<Array<{
    label: string
    data: number[]
}>>([])
let cdf: number[] = []
const level = ref('20')
const mean = ref('0.0')
const setLevel = (lvLabel: string) => {
    for (let p of pdfs.value) {
        if (p.label == lvLabel) {
            level.value = lvLabel;
            (option.value.series[0].data as any) = p.data
            cdf = toCDF(p.data)
            mean.value = toAffnum(moment(p.data))
            return
        }
    }
}

let option = ref({
    tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
            let { dataIndex, value } = params[0]
            return `<table>
                <tr><td>词条数：</td><td>${toAffnum(dataIndex)}</td><tr>
                <tr><td>概率：</td><td>${toProb(value)}</td><tr>
                <tr><td>1-累积概率：</td><td>${toProb((1 - cdf[dataIndex]))}</td><tr>
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


let pdfs2: Array<{
    label: string
    data: number[]
}> = []
let cdf2: number[] = []
const counts = ['5', '10', '20', '50', '100', '200']
const count = ref('100')
const mean2 = ref('0.0')
const prob = ref('0.0%')
const setCount = (c: string) => {
    for (let p of pdfs2) {
        if (p.label == c) {
            count.value = c;
            (option2.value.series[0].data as any) = p.data
            cdf2 = toCDF(p.data)
            mean2.value = toAffnum(moment(p.data))
            for (let q of pdfs.value) {
                if (q.label == '20') {
                    prob.value = toProb(q.data.reduce((a, b, c) => a + b * cdf2[c], 0))
                    break
                }
            }
            return
        }
    }
}

const option2 = ref({
    tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
            let { dataIndex, value } = params[0]
            return `<table>
                <tr><td>词条数：</td><td>${toAffnum(dataIndex)}</td><tr>
                <tr><td>概率：</td><td>${toProb(value)}</td><tr>
                <tr><td>1-累积概率：</td><td>${toProb((1 - cdf2[dataIndex]))}</td><tr>
            <table>`
        }
    },
    title: {
        left: 'center',
        text: '同类最佳满级圣遗物词条数分布'
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
    // calc pdfs2
    cdf2 = getAffnumCDF(
        props.art.mainKey,
        store.state.weightInUse,
        5
    )
    let p = AritfactData.mainDistr[props.art.slot][props.art.mainKey] / 5;
    pdfs2 = counts.map(c => {
        let n = parseInt(c)
        return {
            label: c,
            data: toPDF(cdf2.map(x => (p * x + 1 - p) ** n))
        }
    })
    // update xAxis
    let N = 90
    option.value.xAxis.data = []
    for (let i = 0; i < N; ++i) {
        option.value.xAxis.data.push(toAffnum(i))
    }
    option2.value.xAxis.data = option.value.xAxis.data
    // pad zeros
    pdfs.value.forEach(p => {
        while (p.data.length < N) {
            p.data.push(0)
        }
    })
    pdfs2.forEach(p => {
        while (p.data.length < N) {
            p.data.push(0)
        }
    })
    // update plot
    setLevel('20')
    setCount('100')
})
</script>

<template>
    <el-dialog title="统计" v-model="show" top="2vh" width="90%">
        <div class="num-wrapper">
            <div class="num">
                <div class="desc">当前圣遗物{{level}}级期望词条数</div>
                <div class="value">{{mean}}</div>
            </div>
            <div class="num">
                <div class="desc">{{count}}个圣遗物中最佳满级同类圣遗物期望词条数</div>
                <div class="value">{{mean2}}</div>
            </div>
            <div class="num">
                <div class="desc">{{count}}个圣遗物中当前圣遗物最佳的概率</div>
                <div class="value">{{prob}}</div>
            </div>
        </div>
        <el-divider />
        <v-chart :option="option" class="chart" autoresize />
        <div class="row">调整等级👇</div>
        <div class="row">
            <el-radio-group v-model="level" @change="setLevel">
                <el-radio-button :label="p.label" v-for="p in pdfs" />
            </el-radio-group>
        </div>
        <el-divider />
        <v-chart :option="option2" class="chart" autoresize />
        <div class="row">调整个数👇</div>
        <div class="row">
            <el-radio-group v-model="count" @change="setCount">
                <el-radio-button :label="c" v-for="c in counts" />
            </el-radio-group>
        </div>
        <el-divider />
        <div class="row">更多功能正在开发中...</div>
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