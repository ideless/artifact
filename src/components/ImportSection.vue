<script lang="ts" setup>
import SectionTitle from './SectionTitle.vue';
import TextButton from './TextButton.vue';
import ExportPreview from './ExportPreview.vue'
import { computed, ref } from "vue"
import mona from '../ys/ext/mona';
import good from '../ys/ext/good';
import genmo from '../ys/ext/genmo';
import { useStore } from '../store';
const store = useStore()
const msg = ref('')
const ok = ref(false)
const importMsgClass = computed(() => ({
    'import-msg': true,
    ok: ok.value
}))
const importArts = () => {
    let finput = document.getElementById("file-input") as HTMLInputElement
    finput.value = "";
    finput.onchange = () => {
        if (!finput.files || finput.files.length == 0) return
        let file = finput.files[0];
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = (evt) => {
            if (typeof reader.result !== 'string') {
                msg.value = '可能不是文本文件'
                ok.value = false
                return
            }
            let artifacts: any[] = [], format = ''
            try {
                artifacts = good.loads(reader.result)
                format = 'GOOD'
            } catch (e) {
                try {
                    artifacts = mona.loads(reader.result)
                    format = 'mona-urani'
                } catch (e) {
                    try {
                        artifacts = genmo.loads(reader.result)
                        format = 'genmo'
                    } catch (e: any) {
                        if (typeof e == 'object' && e.message) {
                            msg.value = e.message
                        } else {
                            msg.value = '解析失败'
                        }
                        ok.value = false
                        return
                    }
                }
            }
            msg.value = `成功导入${artifacts.length}个5星圣遗物`
            ok.value = true
            store.dispatch('setArtifacts', { artifacts, format })
        };
        reader.onerror = (evt) => {
            msg.value = '无法读取文件'
            ok.value = false
        };
        finput.onchange = null;
    };
    finput.click();
}
const openTutorial = () => {
    window.open('./tutorial', '_blank')
}
// 预览对话框
const showPreview = ref(false)
</script>

<template>
    <div class="section">
        <section-title title="导入">
            <span @click="openTutorial">教程</span>
        </section-title>
        <div class="section-content">
            <text-button @click="importArts">导入</text-button>
            <text-button style="margin-left: 20px;" @click="showPreview = true" :disabled="!store.state.canExport">导出</text-button>
            <p :class="importMsgClass">{{ msg }}</p>
        </div>
    </div>
    <div class="hidden">
        <input type="file" id="file-input" />
    </div>
    <export-preview v-model="showPreview" />
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