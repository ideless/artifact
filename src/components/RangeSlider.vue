<template>
    <div class="range-slider">
        <span class="val">{{ modelValue[0] }}</span>
        <el-slider class="slider" v-model="range" range show-stops :max="max" />
        <span class="val">{{ modelValue[1] }}</span>
    </div>
</template>

<script>
export default {
    props: {
        modelValue: {
            type: Array,
            required: true,
        },
        max: {
            type: Number,
            required: true,
        },
    },
    emits: ["update:modelValue"],
    data: () => ({
        range: [0, 0],
    }),
    watch: {
        modelValue() {
            // @ts-ignore
            this.range = this.modelValue;
        },
        range() {
            this.$emit("update:modelValue", this.range);
        },
    },
    mounted() {
        // @ts-ignore
        this.range = this.modelValue;
    },
};
</script>

<style scoped>
.range-slider {
    display: flex;
    align-items: center;
}
.val {
    width: 38px;
    text-align: center;
    line-height: 0;
}
.slider {
    flex: 1;
    margin: 0 10px;
}
</style>