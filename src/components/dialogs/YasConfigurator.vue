<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useStore } from "@/store";

const props = defineProps<{
    modelValue: boolean
}>()
const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
}>()
const store = useStore();

const show = computed<boolean>({
    get() { return props.modelValue },
    set(value) { emit('update:modelValue', value) }
})

const config = computed(() => store.state.yas.config)

const confirm = () => {
    store.commit('setYasConfig', { config: config.value })
    show.value = false
}
</script>

<template>
    <el-dialog title="Yas-lock 配置" v-model="show" top="2vh">
        <el-form :model="config" label-width="auto" label-position="left">
            <el-divider>扫描</el-divider>
            <el-form-item label="最大扫描行数">
                <el-input-number v-model="config.max_row" :min="1" :max="1000" />
            </el-form-item>
            <el-form-item label="最小星级">
                <el-input-number v-model="config.min_star" :min="1" :max="5" />
            </el-form-item>
            <el-form-item label="最小等级">
                <el-input-number v-model="config.min_level" :min="0" :max="20" />
            </el-form-item>
            <el-form-item label="速度（如提示大量重复尝试降低速度）">
                <el-input-number v-model="config.speed" :min="1" :max="5" />
            </el-form-item>
            <el-form-item label="指定圣遗物数量（在自动识别数量不准确时使用）">
                <el-input-number v-model="config.number" :min="0" :max="2000" />
            </el-form-item>
            <el-divider>加解锁</el-divider>
            <el-form-item label="加解锁停顿时间">
                <el-input-number v-model="config.lock_stop" :min="0" />
                <el-tag style="margin-left: 10px;">毫秒</el-tag>
            </el-form-item>
            <el-divider>通用</el-divider>
            <el-form-item label="等待动画、鼠标点击等操作的默认停顿时间">
                <el-input-number v-model="config.default_stop" :min="0" />
                <el-tag style="margin-left: 10px;">毫秒</el-tag>
            </el-form-item>
            <el-form-item label="页面滚动停顿时间">
                <el-input-number v-model="config.scroll_stop" :min="0" />
                <el-tag style="margin-left: 10px;">毫秒</el-tag>
            </el-form-item>
            <el-form-item label="切换圣遗物最大等待时间">
                <el-input-number v-model="config.max_wait_switch_artifact" :min="0" />
                <el-tag style="margin-left: 10px;">毫秒</el-tag>
            </el-form-item>
            <el-form-item label="翻页的最大等待时间（翻页不正确可以考虑加大该选项）">
                <el-input-number v-model="config.max_wait_scroll" :min="0" />
                <el-tag style="margin-left: 10px;">毫秒</el-tag>
            </el-form-item>
            <el-form-item label="不检测是否已打开背包等">
                <el-switch v-model="config.no_check" />
            </el-form-item>
            <el-form-item label="使用dxgcap捕获屏幕">
                <el-switch v-model="config.dxgcap" />
            </el-form-item>
        </el-form>
        <el-row justify="center" style="margin-top: 30px;">
            <el-button type="primary" @click="confirm">确认</el-button>
        </el-row>
    </el-dialog>
</template>

<style lang="scss" scoped>

</style>