import { createApp } from 'vue'
import App from '@/App.vue'
import { store, key } from "@/store"
// import router from "@/store/router"
import 'element-plus/dist/index.css'

import ECharts from 'vue-echarts'
import { use } from "echarts/core"
import {
    CanvasRenderer
} from 'echarts/renderers'
import {
    LineChart
} from 'echarts/charts'
import {
    GridComponent,
    TooltipComponent
} from 'echarts/components'

use([
    CanvasRenderer,
    LineChart,
    GridComponent,
    TooltipComponent
])

createApp(App)
    .use(store, key)
    // .use(router)
    .component('v-chart', ECharts)
    .mount('#app')
