<script lang="ts" setup>
import SectionTitle from "@/components/sections/SectionTitle.vue";
import TextButton from "@/components/widgets/TextButton.vue";
import ExportPreview from "@/components/dialogs/ExportPreview.vue";
import YasConfigurator from "../dialogs/YasConfigurator.vue";
import { computed, nextTick, ref } from "vue";
import mona from "@/ys/ext/mona";
import good from "@/ys/ext/good";
import genmo from "@/ys/ext/genmo";
import { useStore } from "@/store";
import { Artifact } from "@/ys/artifact";
// import pparser from "@/ys/p2p/pparser";
import { testArts } from "@/store/test";

const store = useStore();
const msg = ref("");
const ok = ref(false);
const importMsgClass = computed(() => ({
    "import-msg": true,
    ok: ok.value,
}));
const importArts = () => {
    if (store.state.ws.connected) {
        store.dispatch('sendScanReq')
        return
    }
    let finput = document.getElementById("file-input") as HTMLInputElement;
    finput.value = "";
    finput.onchange = () => {
        if (!finput.files || finput.files.length == 0) return;
        let file = finput.files[0];
        let reader = new FileReader();
        if (file.name.endsWith(".pcap")) {
            msg.value = "米哈游加强了数据包加密，暂不支持pcap文件解析";
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
                if (typeof reader.result !== "string") {
                    msg.value = "可能不是文本文件";
                    ok.value = false;
                    return;
                }
                let artifacts: Artifact[] = [],
                    canExport = false;
                try {
                    artifacts = good.loads(reader.result);
                    canExport =
                        artifacts.length > 0 &&
                        artifacts[0].data.source == "yas-lock/good";
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
                store.dispatch("setArtifacts", { artifacts, canExport });
            };
            reader.readAsText(file, "UTF-8");
        }
        reader.onerror = (evt) => {
            msg.value = "无法读取文件";
            ok.value = false;
        };
        finput.onchange = null;
    };
    finput.click();
};
const openTutorial = () => {
    window.open("./tutorial", "_blank");
};
// 预览对话框
const showPreview = ref(false);
// 预览Yas配置器
const showYasConfig = ref(false)
// 测试
nextTick(() => {
    store.dispatch("setArtifacts", {
        canExport: false,
        artifacts: testArts,
    });
});
</script>

<template>
    <div class="section">
        <section-title title="导入">
            <span @click="showYasConfig = true" v-if="store.state.ws.connected">Yas-lock配置</span>
            <span @click="openTutorial">教程</span>
        </section-title>
        <div class="section-content">
            <template v-if="store.state.ws.connected">
                <text-button @click="importArts">扫描</text-button>
                <text-button style="margin-left: 20px" @click="showPreview = true">落锁</text-button>
            </template>
            <template v-else>
                <text-button @click="importArts">导入</text-button>
                <text-button style="margin-left: 20px" @click="showPreview = true" :disabled="!store.state.canExport">导出
                </text-button>
            </template>
            <p :class="importMsgClass">{{ msg }}</p>
        </div>
    </div>
    <div class="hidden">
        <input type="file" id="file-input" accept=".json, .pcap" />
    </div>
    <export-preview v-model="showPreview" />
    <yas-configurator v-model="showYasConfig" />
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
