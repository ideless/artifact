import { createApp } from "vue";
import App from "@/App.vue";

import { createPinia } from "pinia";

import { i18n } from "./i18n";

import "element-plus/dist/index.css";

import ECharts from "vue-echarts";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import { GridComponent, TooltipComponent } from "echarts/components";
import { fixStorage } from "./store/fixStorage";

use([CanvasRenderer, LineChart, GridComponent, TooltipComponent]);

fixStorage();

createApp(App)
    .use(createPinia())
    .use(i18n)
    .component("v-chart", ECharts)
    .mount("#app");
