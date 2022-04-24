<script lang="ts" setup>
const props = defineProps<{
    title: string
}>()
</script>

<template>
    <div class="section-title">
        <span>{{ title }}</span>
        <div class="section-opts">
            <slot />
        </div>
    </div>
</template>

<style lang="scss">
.section-title {
    color: #808080;
    display: flex;
    align-items: center;
    margin-top: 24px;
    > span {
        flex: 1;
    }
    .section-opts {
        >* {
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