<template>
    <div :class="btnClass" @click="click">
        <span class="blank">
            <slot />
        </span>
        <span class="fill">
            <slot />
        </span>
    </div>
</template>

<script>
export default {
    props: {
        modelValue: {
            type: Number,
            default: false,
        },
    },
    emits: ["update:modelValue"],
    computed: {
        btnClass() {
            return {
                "value-button": true,
                one: this.modelValue == 1,
                zero: this.modelValue == 0,
            };
        },
    },
    methods: {
        click() {
            if (this.modelValue == 0) {
                this.$emit("update:modelValue", 0.5);
            } else if (this.modelValue == 0.5) {
                this.$emit("update:modelValue", 1);
            } else {
                this.$emit("update:modelValue", 0);
            }
        },
    },
};
</script>

<style scoped>
.value-button {
    width: 85px;
    height: 38px;
    display: inline-block;
    border-radius: 3px;
    box-shadow: 0 0 2px 0 #0007;
    line-height: 38px;
    text-align: center;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    user-select: none;
}
.blank {
    background: white;
    color: #3694ff;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
}
.fill {
    background: #3694ff;
    color: white;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    clip-path: polygon(0 0, 60% 0, 40% 100%, 0 100%);
    transition: clip-path 200ms ease;
}
.value-button.one .fill {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
}
.value-button.zero .fill {
    clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
}
</style>