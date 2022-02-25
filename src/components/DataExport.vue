<script lang="ts" setup>
import { computed, ref } from 'vue';
import { Artifact } from '../ys/artifact';
import { ElInput, ElMessage } from 'element-plus'
import { Download, CopyDocument } from '@element-plus/icons-vue'
import mona from '../ys/ext/mona';
import genmo from '../ys/ext/genmo';
import good from '../ys/ext/good';
import { download } from '../store/utils';
const props = defineProps<{
    modelValue: boolean,
    artifacts: Artifact[]
}>()
const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
}>()
const show = computed<boolean>({
    get() { return props.modelValue },
    set(value) { emit('update:modelValue', value) }
})
const format = ref('mona')
const json = computed<string>(() => {
    message.value = ''
    switch (format.value) {
        case 'mona': return mona.dumps(props.artifacts)
        case 'genmo': return genmo.dumps(props.artifacts)
        case 'good': return good.dumps(props.artifacts)
        default: return '未知格式'
    }
})
const message = ref('')
const downloadJson = () => { download(json.value, format.value + '.json') }
const copy = () => {
    navigator.clipboard.writeText(json.value).then(() => {
        message.value = '复制成功'
    }, () => {
        message.value = '复制失败'
    })
}
</script>

<template>
    <el-dialog title="导出圣遗物" v-model="show">
        <div>
            <el-radio-group v-model="format">
                <el-radio label="mona">莫娜占卜铺</el-radio>
                <el-radio label="genmo">原魔计算器</el-radio>
                <el-radio label="good">Genshin Optimizer</el-radio>
            </el-radio-group>
        </div>
        <div style="margin-top: 10px;">
            <el-input ref="exportArea" type="textarea" :rows="8" resize="none" v-model="json" />
        </div>
        <div style="margin-top: 10px;">{{ message }}</div>
        <div style="margin-top: 10px; text-align: center;">
            <el-button :icon="Download" @click="downloadJson">下载</el-button>
            <el-button :icon="CopyDocument" type="primary" @click="copy">复制</el-button>
        </div>
    </el-dialog>
</template>