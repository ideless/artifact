<script lang="ts" setup>
import { SuccessFilled, CircleCloseFilled } from "@element-plus/icons-vue";
import { useYasStore } from "@/store";

const yasStore = useYasStore();
</script>

<template>
    <div class="layout-top" v-show="yasStore.socketUrl">
        <div class="msg-wrapper success" v-if="yasStore.connected">
            <el-icon>
                <SuccessFilled />
            </el-icon>
            <span
                style="margin-left: 5px"
                v-text="$t('yas.socket.connected')"
            />
        </div>
        <div class="msg-wrapper error" v-else>
            <el-icon>
                <CircleCloseFilled />
            </el-icon>
            <span
                style="margin-left: 5px"
                v-text="$t('yas.socket.disconnected')"
            />
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
            background-color: #d8fbd3;
            color: #00a305;
        }

        &.error {
            background-color: #ffd5d5;
            color: #bb0d0d;
        }
    }
}
</style>
