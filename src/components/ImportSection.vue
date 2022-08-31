<script lang="ts" setup>
import SectionTitle from './SectionTitle.vue';
import TextButton from './TextButton.vue';
import ExportPreview from './ExportPreview.vue';
import { computed, nextTick, ref } from "vue";
import mona from '@/ys/ext/mona';
import good from '@/ys/ext/good';
import genmo from '@/ys/ext/genmo';
import { useStore } from '@/store';
import { Artifact } from '@/ys/artifact';
// import pparser from '@/ys/p2p/pparser';
import { ArtifactFilter, FilterBatchOne } from '../ys/artifactFilter';
const store = useStore();
const msg = ref('');
const ok = ref(false);
const importMsgClass = computed(() => ({
    'import-msg': true,
    ok: ok.value,
}));
const importArts = () => {
    let finput = document.getElementById("file-input") as HTMLInputElement;
    finput.value = "";
    finput.onchange = () => {
        if (!finput.files || finput.files.length == 0) return;
        let file = finput.files[0];
        let reader = new FileReader();
        if (file.name.endsWith('.pcap')) {
            msg.value = '米哈游加强了数据包加密，暂不支持pcap文件解析';
            ok.value = false;
            // return;
            // reader.onload = async () => {
            //     try {
            //         let result = reader.result as ArrayBuffer;
            //         let GOOD = await pparser.parseArtifacts(
            //             new Uint8Array(result, 0, result.byteLength)
            //         );
            //         let artifacts = good.loads(JSON.stringify(GOOD));
            //         msg.value = `成功导入${artifacts.length}个5星圣遗物`;
            //         ok.value = true;
            //         store.dispatch("setArtifacts", {
            //             artifacts,
            //             canExport: true,
            //         });
            //     } catch (e) {
            //         msg.value = String(e);
            //         ok.value = false;
            //     }
            // };
            // reader.readAsArrayBuffer(file);
        } else {
            reader.onload = (evt) => {
                if (typeof reader.result !== 'string') {
                    msg.value = "可能不是文本文件";
                    ok.value = false;
                    return;
                }
                let artifacts: Artifact[] = [], 
                    canExport = false;
                try {
                    artifacts = good.loads(reader.result);
                    canExport = artifacts.length > 0
                        && artifacts[0].data.source == 'yas-lock/good';
                } catch (e) {
                    try {
                        artifacts = mona.loads(reader.result);
                    } catch (e) {
                        try {
                            artifacts = genmo.loads(reader.result);
                        } catch (e: any) {
                            console.error(e);
                            msg.value = String(e);
                            ok.value = false;
                            return;
                        }
                    }
                }
                msg.value = `成功导入${artifacts.length}个5星圣遗物`;
                ok.value = true;
                store.dispatch('setArtifacts', { artifacts, canExport });
            };
            reader.readAsText(file, "UTF-8");
        }
        reader.onerror = (evt) => {
            msg.value = '无法读取文件';
            ok.value = false;
        };
        finput.onchange = null;
    };
    finput.click();
};
const openTutorial = () => {
    window.open('./tutorial', '_blank');
};
// 预览对话框
const showPreview = ref(false);
// 批量过滤
let showFilter = ref(false);
let localStorageTried = false;
const useFilterBatch = () => {
    store.state.useFilterBatch = -1
    showFilter.value=true
    if (!localStorageTried) {
        localStorageTried = true
        try {
            const datastr = localStorage.getItem('filterBatchJSON')
            if (datastr) {
                const data = JSON.parse(datastr);
                store.state.filterBatch.splice(0);
                for (let i = 0; i < data.length; i ++ )
                    store.state.filterBatch.push(new FilterBatchOne(data[i]));
                ElNotification({
                    type: 'success',
                    title: '已成功读取本地过滤规则',
                    message: '为了防止丢失，推荐定期使用过滤规则导出功能备份',
                })
            }
        }
        catch (e) {
            console.log(e)
            ElNotification({
                type: 'error',
                title: '从本地恢复过滤规则出错',
                message: '可能是浏览器版本过低导致的，详细信息请F12打开控制台查看。'
            })
        }
    }
}
</script>

<template>
    <div class="section">
        <section-title title="导入">
            <span @click="openTutorial">教程</span>
        </section-title>
        <div class="section-content">
            <text-button @click="importArts">导入</text-button>
            <text-button style="margin-left: 20px;" @click="useFilterBatch">批量过滤</text-button>
            <text-button style="margin-left: 20px;" @click="showPreview = true">导出</text-button>
            <p :class="importMsgClass">{{ msg }}</p>
        </div>
    </div>
    <div class="hidden">
        <input type="file" id="file-input" accept=".json, .pcap" />
    </div>
    <export-preview v-model="showPreview" />
    <artifact-filter-batch-panel v-model:show="showFilter" />
</template>

<style lang="scss">
.import-msg {
    color: red;
    margin-top: 10px;
    &.ok {
        color: $green;
    }
}
.hidden {
    position: fixed;
    top: -999px;
}
</style>