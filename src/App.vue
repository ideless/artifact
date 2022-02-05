<script setup lang="ts">
import LayoutLeft from './components/LayoutLeft.vue';
import LayoutRight from './components/LayoutRight.vue';
</script>

<template>
    <div class="root">
        <layout-left />
        <layout-right />
    </div>
    <div class="hidden">
        <input type="file" ref="file-input" />
    </div>
</template>

<style lang="scss">
.root {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    display: flex;
    font-size: 16px;
    font-weight: bold;
}
</style>
