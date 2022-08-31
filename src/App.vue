<script setup lang="ts">
import LayoutLeft from './components/LayoutLeft.vue';
import LayoutRight from './components/LayoutRight.vue';
import { useStore } from './store';
const store = useStore()
const loadingSrc = './assets/loading.gif'
</script>

<template>
    <layout-left />
    <layout-right />
    <transition name="fade">
        <div class="modal" v-show="store.state.loading">
            <img :src="loadingSrc" />
        </div>
    </transition>
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
    // font-weight: bold;
}
.modal {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fffa;
    color: black;
}
</style>
