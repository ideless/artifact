<script setup lang="ts">
import LayoutLeft from './components/LayoutLeft.vue';
import LayoutRight from './components/LayoutRight.vue';
</script>

<template>
    <layout-left />
    <layout-right />
</template>

<style lang="scss">
#app {
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
