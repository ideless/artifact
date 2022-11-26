<script lang="ts" setup>
import { SuccessFilled, CircleCloseFilled } from "@element-plus/icons-vue";
import { useStore } from "@/store"

const store = useStore()
</script>

<template>
    <div class="layout-top" v-show="store.state.ws.server">
        <div class="msg-wrapper success" v-if="store.state.ws.connected">
            <el-icon>
                <SuccessFilled />
            </el-icon>
            <span style="margin-left: 5px;">已连接</span>
        </div>
        <div class="msg-wrapper error" v-else>
            <el-icon>
                <CircleCloseFilled />
            </el-icon>
            <span style="margin-left: 5px;">已断开</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.layout-top {
    width: 100%;
    height: 28px;
    z-index: 1;

    .msg-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        font-weight: bold;
        font-size: smaller;
        background-color: white;
        color: black;
        transition: all 100ms ease;

        &.success {
            background-color: #D8FBD3;
            color: #00A305;
        }

        &.error {
            background-color: #FFD5D5;
            color: #BB0D0D;
        }
    }

}
</style>