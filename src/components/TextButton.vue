<template>
    <div :class="{ 'text-button': true, disabled }" @click="click">
        <slot />
    </div>
</template>

<script>
export default {
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    emits: ["click"],
    methods: {
        click() {
            if (!this.disabled) {
                this.$emit("click");
            }
        },
    },
};
</script>

<style scoped>
.text-button {
    width: 85px;
    height: 38px;
    display: inline-block;
    color: white;
    background: #3694ff;
    border-radius: 3px;
    box-shadow: 0 0 2px 0 #0007;
    line-height: 38px;
    text-align: center;
    cursor: pointer;
    user-select: none;
}
.text-button:hover {
    filter: brightness(110%);
}
.text-button.disabled {
    filter: none;
    opacity: 0.7;
    cursor: not-allowed;
}
</style>