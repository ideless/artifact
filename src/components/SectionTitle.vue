<script lang="ts" setup>
const props = defineProps<{
    title: string
}>()
</script>

<template>
    <div class="section-title">
        <span class="marker" />
        <span class="title">{{ title }}</span>
        <div class="section-opts">
            <slot />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.section-title {
    color: gray;
    display: flex;
    align-items: center;
    margin-top: 24px;
    .marker {
        display: inline-block;
        width: 5px;
        height: 12px;
        border-radius: 6px;
        background-color: $primary-color;
    }
    .title {
        flex: 1;
        margin-left: 10px;
    }
    .section-opts {
        >:deep(*) {
            color: $primary-color;
            cursor: pointer;
            font-size: 12px;
            margin-left: 10px;
            &:hover {
                text-decoration: underline;
            }
        }
    }
}
// .section-content .section-title {
//     color: #444;
// }
</style>