<script lang="ts" setup>
import MultiSelectBase from "@/components/widgets/MultiSelectBase.vue";
import { ICharOption } from "@/store/types";
import { i18n } from "@/i18n";
import { CharacterData } from "@/ys/data";
import { computed } from "vue";

const props = defineProps<{
    options: ICharOption[];
    modelValue: string[];
    title?: string;
}>();
const emit = defineEmits<{
    (e: "update:modelValue", v: string[]): void;
}>();

// display
const text = (o: ICharOption) => {
    if (o.name) return o.name;
    else
        return o.key
            ? i18n.global.t("character." + o.key) || o.key
            : i18n.global.t("ui.unequiped");
};
const icon = (o: ICharOption) => {
    if (o.key == "") {
        return "./assets/forbidden.webp";
    } else if (o.key.startsWith("0")) {
        return "./assets/char_faces/default.webp";
    } else if (o.key.startsWith("Traveler")) {
        return `./assets/char_faces/Traveler.webp`;
    } else {
        return `./assets/char_faces/${o.key}.webp`;
    }
};
const color = (o: ICharOption) => {
    if (o.key == "" || o.key.startsWith("0")) {
        return "black";
    } else {
        return CharacterData[o.key].rarity == 5 ? "gold" : "purple";
    }
};

// 未佩戴
const unequiped = computed(() => {
    return props.options.filter((o) => o.key == "")[0];
});

// 排序分组后的选项
const optionGroups = computed(() => {
    let omap = Object.fromEntries(
            props.options.filter((o) => o.key).map((o) => [o.key, o])
        ),
        g: { [e: string]: ICharOption[] } = {};
    Object.keys(CharacterData)
        .filter((key) => key in omap)
        .sort((k1, k2) => CharacterData[k2].rarity - CharacterData[k1].rarity)
        .forEach((key) => {
            let e = CharacterData[key].element;
            if (e in g) {
                g[e].push(omap[key]);
            } else {
                g[e] = [omap[key]];
            }
        });
    let ret = ["pyro", "hydro", "cryo", "electro", "anemo", "geo", "dendro"]
        .filter((e) => e in g)
        .map((e) => ({
            icon: `./assets/game_icons/${e}.webp`,
            text: i18n.global.t("element." + e),
            options: g[e],
        }));
    // 自定义角色
    let optionsCustom = props.options.filter((o) => o.key.startsWith("0"));
    if (optionsCustom.length) {
        ret.push({
            icon: "",
            text: i18n.global.t("ui.custom"),
            options: optionsCustom,
        });
    }

    return ret;
});

const selectedKeys = computed<string[]>({
    get() {
        return props.modelValue;
    },
    set(v) {
        emit("update:modelValue", v);
    },
});
// 显示被选中选项
const selectedOptions = computed(() => {
    return props.options.filter((o) => props.modelValue.includes(o.key));
});
</script>

<template>
    <multi-select-base :title="title" :options="options" v-model="selectedKeys">
        <template v-slot:selected>
            <transition-group
                class="selected-options-wrapper"
                name="list"
                tag="div"
            >
                <img
                    class="tag"
                    v-for="o in selectedOptions"
                    :src="icon(o)"
                    alt=""
                    :key="o.key"
                />
            </transition-group>
        </template>
        <template v-slot:options>
            <div class="option" v-if="unequiped">
                <el-checkbox :label="unequiped.key">
                    <div class="option-content">
                        <img class="icon" :src="icon(unequiped)" alt="" />
                        <span class="label">{{ text(unequiped) }}</span>
                        <span class="tip">{{ unequiped.tip }}</span>
                    </div>
                </el-checkbox>
            </div>
            <div class="option-group" v-for="g in optionGroups">
                <div class="group-header">
                    <img :src="g.icon" alt="" class="icon" v-if="g.icon" />
                    <span class="label">{{ g.text }}</span>
                </div>
                <div class="option" v-for="o in g.options">
                    <el-checkbox :label="o.key">
                        <div class="option-content">
                            <img class="icon" :src="icon(o)" alt="" />
                            <span :class="`label ${color(o)}`">{{
                                text(o)
                            }}</span>
                            <span class="tip">{{ o.tip }}</span>
                        </div>
                    </el-checkbox>
                </div>
            </div>
        </template>
    </multi-select-base>
</template>

<style lang="scss" scoped>
%tag {
    display: inline-block;
    transition: all 100ms ease;
    height: 32px;
    margin: 2px;
}

.selected-options-wrapper {
    flex: 1;
    line-height: 0;
    // box-shadow: 0 0 1px 0 black;

    img.tag {
        @extend %tag;
        width: 32px;
        object-fit: contain;
    }
}

.option {
    padding: 5px 12px;

    &:hover {
        background: #f0f0f0;
    }
}

.group-header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    background-color: #fff9ee;
    box-shadow: inset 0 0 4px 0 #ddd;

    .icon {
        width: 26px;
        height: 26px;
        object-fit: contain;
        margin-right: 5px;
    }

    .label {
        color: #b78249;
        font-size: 12px;
        line-height: 1;
    }
}

.option-content {
    display: flex;
    align-items: center;
    // box-shadow: 0 0 1px 0 black;

    .icon {
        width: 32px;
        height: 32px;
        object-fit: contain;
        margin-right: 5px;
    }

    .label {
        flex: 1;
        color: black;

        &.gold {
            color: #bd600e;
        }

        &.purple {
            color: purple;
        }
    }

    .tip {
        color: gray;
        font-family: Arial, Helvetica, sans-serif;
    }
}
</style>
