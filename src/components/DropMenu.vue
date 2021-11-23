<template>
    <div class="drop-menu" @click="show = !show">
        <span>{{ selected }}</span>
        <img :class="{ show }" src="@/assets/arrow.png" alt="" />
        <transition name="pop">
            <div class="menu" v-show="show">
                <div
                    class="menu-item"
                    v-for="item in items"
                    :key="item.key"
                    @click="select(item.key)"
                >
                    <div class="item-name">{{ item.value }}</div>
                    <div class="item-tip">{{ item.tip }}</div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    props: {
        items: {
            type: Array,
            required: true,
        },
        modelValue: {
            type: String,
            required: true,
        },
    },
    emits: ["update:modelValue"],
    data: () => ({
        show: false,
    }),
    computed: {
        selected() {
            for (let i of this.items) {
                // @ts-ignore
                if (i.key == this.modelValue) {
                    // @ts-ignore
                    return i.value;
                }
            }
            return "";
        },
    },
    methods: {
        select(key) {
            this.$emit("update:modelValue", key);
        },
    },
};
</script>

<style scoped>
.drop-menu {
    position: relative;
    display: inline-block;
    height: 38px;
    box-shadow: 0 0 2px 0 #0007;
    background: white;
    display: flex;
    align-items: center;
    padding: 0 15px;
    border-radius: 3px;
    user-select: none;
    cursor: pointer;
}
.drop-menu > span {
    flex: 1;
}
.drop-menu > img {
    transform: rotate(0deg);
    transition: transform 200ms ease;
}
.drop-menu > img.show {
    transform: rotate(180deg);
}
.menu {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    max-height: 360px;
    overflow-y: auto;
    background: #f7f7f7;
    box-shadow: 0 0 4px 0 #0007;
    border-radius: 3px;
    z-index: 2;
}
.menu-item {
    padding: 10px;
    display: flex;
    align-items: center;
}
.menu-item:hover {
    background: #f0f0f0;
}
.item-name {
    flex: 1;
}
.item-tip {
    color: gray;
}
.pop-enter-active,
.pop-leave-active {
    transition: all 200ms ease;
}
.pop-enter-from,
.pop-leave-to {
    opacity: 0;
    transform: scale(0.9);
}
</style>