<script lang="ts" setup>
import { computed } from "vue";
import { Edit, Histogram } from "@element-plus/icons-vue";
import { Affix, Artifact } from "@/ys/artifact";
import { i18n } from "@/i18n";
import { ArtifactData, CharacterData } from "@/ys/data";
import { useArtifactStore } from "@/store";
import { IAffnumResult, IDefeatResult, IPBuildResult } from "@/ys/sort";

const props = defineProps<{
    artifact: Artifact;
    selected?: boolean;
    selectMode?: boolean;
    readonly?: boolean;
}>();
const emit = defineEmits<{
    (e: "flipSelect", shiftKey: boolean): void;
    (e: "flipLock"): void;
    (e: "edit"): void;
    (e: "stats"): void;
}>();

const artStore = useArtifactStore();

const pieceName = computed(() => {
    if (
        ArtifactData.setKeys.includes(props.artifact.set) &&
        ArtifactData.slotKeys.includes(props.artifact.slot)
    ) {
        let name = i18n.global.t("artifact.set." + props.artifact.set);
        let slot = i18n.global.t("artifact.slot_short." + props.artifact.slot);
        return `${name} · ${slot}`;
    } else {
        return i18n.global.t("ui.unknown");
    }
});
const pieceImgSrc = computed(() => {
    if (ArtifactData.setKeys.includes(props.artifact.set)) {
        return `./assets/artifacts/${props.artifact.set}/${props.artifact.slot}.webp`;
    } else {
        return "";
    }
});
const affixName = (key: string) => {
    let name = i18n.global.t("artifact.affix." + key);
    if (name.endsWith("%")) {
        name = name.substring(0, name.length - 1);
    }
    return name;
};
const main = computed(() => {
    if (props.artifact.mainKey in ArtifactData.mainStat) {
        let key = props.artifact.mainKey,
            value =
                ArtifactData.mainStat[props.artifact.mainKey][
                    props.artifact.level
                ];
        return {
            name: i18n.global.t("artifact.affix." + key),
            value: new Affix({ key, value }).valueString(),
        };
    } else {
        return { name: i18n.global.t("ui.unknown"), value: "0" };
    }
});
const level = computed(() => {
    return `+${props.artifact.level}`;
});
const minors = computed(() => {
    let ret = [];
    for (let a of props.artifact.minors) {
        let name = affixName(a.key),
            value,
            opacity = 1;
        if (artStore.artMode.normalize) {
            if (["atkp", "defp", "hpp"].includes(a.key)) {
                name += "%";
            }
            value = a.value / ArtifactData.minorStat[a.key];
            value = value.toFixed(1);
        } else {
            value = a.valueString();
        }
        // set affix opacity
        if (["atk", "hp", "def"].includes(a.key)) {
            opacity = 0.5;
        } else if (
            ["avg", "psingle"].includes(artStore.sort.by) &&
            !artStore.sort.weight[a.key as "hpp"]
        ) {
            opacity = 0.5;
        }
        ret.push({
            text: `${name}+${value}`,
            style: { opacity },
            count: Math.ceil(
                Math.round((a.value / ArtifactData.minorStat[a.key]) * 10) / 10
            ),
        });
    }
    return ret;
});
const lockImgSrc = computed(() => {
    return props.artifact.lock
        ? "./assets/game_icons/lock.webp"
        : "./assets/game_icons/unlock.webp";
});
const artifactCardClass = computed(() => ({
    "artifact-card": true,
    "select-mode": props.selectMode,
    selected: props.selected,
}));
const select = (evt: MouseEvent) => {
    emit("flipSelect", evt.shiftKey);
};
const starImgSrc = "./assets/stars.webp";
const charSrc = computed<string>(() => {
    if (props.artifact.location in CharacterData) {
        return `./assets/char_sides/${props.artifact.location}.webp`;
    } else {
        return "";
    }
});
const flipLock = () => {
    if (!props.readonly) {
        emit("flipLock");
    }
};

// display sort results according to current sort type
const sortResultDisplayType = computed(() => {
    if (!artStore.sortResults || !artStore.sortResults.has(props.artifact))
        return "";
    switch (artStore.sortResultType) {
        case "affnum":
            return props.artifact.level < 20 ? "affnum-mam" : "affnum-c";
        case "pbuild":
            return "pbuild";
        case "defeat":
            return "defeat";
        default:
            return "";
    }
});
const affnumResult = computed(
    () => artStore.sortResults!.get(props.artifact) as IAffnumResult
);
const formatAffnum = (n: number) => {
    n *= artStore.affnumMultiplier;
    return n.toFixed(1);
};
const pBuildResultStr = computed(() => {
    let result = artStore.sortResults!.get(props.artifact) as IPBuildResult;
    let probs: [string, number][] = [];
    for (let buildKey in result.buildProbs) {
        let b = artStore.builds.filter((b) => b.key == buildKey)[0];
        probs.push([b ? b.name : "", result.buildProbs[buildKey]]);
    }
    // sort in descending order
    probs.sort((a, b) => b[1] - a[1]);
    // formatting
    return (
        probs.map((x) => x[0] + (x[1] * 100).toFixed(1) + "%").join(" ") ||
        "<0.1%"
    );
});
const defeatResultStr = computed(() => {
    let result = artStore.sortResults!.get(props.artifact) as IDefeatResult;
    return result.defeat;
});
</script>

<template>
    <div :class="artifactCardClass">
        <div class="head">
            <div class="head-stat">
                <div class="piece-name">{{ pieceName }}</div>
                <div class="main-affix-name">{{ main.name }}</div>
                <div class="main-affix-value">{{ main.value }}</div>
                <img :src="starImgSrc" />
            </div>
            <div class="piece-img-wrapper">
                <img :src="pieceImgSrc" />
            </div>
        </div>
        <div class="body">
            <div class="body-head">
                <span
                    :class="{
                        level: true,
                        full: artifact.level == 20,
                    }"
                    v-text="level"
                />
                <div class="lock-img-container">
                    <img
                        :src="lockImgSrc"
                        @click="flipLock"
                        :class="{ readonly }"
                    />
                </div>
            </div>
            <div class="minor-affixes">
                <div class="minor-affix" v-for="a in minors" :style="a.style">
                    <span class="count">{{ a.count }}</span>
                    <span>{{ a.text }}</span>
                </div>
            </div>
            <div class="sort-result">
                <template v-if="sortResultDisplayType == 'affnum-mam'">
                    <div
                        class="min-an"
                        v-text="$t('ui.min') + formatAffnum(affnumResult.min)"
                    />
                    <div
                        class="avg-an"
                        v-text="$t('ui.avg') + formatAffnum(affnumResult.avg)"
                    />
                    <div
                        class="max-an"
                        v-text="$t('ui.max') + formatAffnum(affnumResult.max)"
                    />
                </template>
                <template v-else-if="sortResultDisplayType == 'affnum-c'">
                    <div
                        class="full-an"
                        v-text="
                            $t('ui.fullaffnum', {
                                n: formatAffnum(affnumResult.cur),
                            })
                        "
                    />
                </template>
                <template v-else-if="sortResultDisplayType == 'pbuild'">
                    <div class="pbuild" v-text="pBuildResultStr" />
                </template>
                <template v-else-if="sortResultDisplayType == 'defeat'">
                    <div class="defeat" v-text="defeatResultStr" />
                </template>
            </div>
        </div>
        <div class="location" v-show="charSrc">
            <img :src="charSrc" />
        </div>
        <div
            class="select-box"
            @click="select"
            v-show="!readonly"
            role="checkbox"
        />
        <div
            class="edit-box"
            @click="emit('edit')"
            v-show="!readonly"
            role="button"
        >
            <el-icon :size="16">
                <edit />
            </el-icon>
        </div>
        <div
            class="stats"
            @click="emit('stats')"
            v-show="!readonly"
            role="button"
        >
            <el-icon>
                <Histogram />
            </el-icon>
            <span v-text="$t('ui.more')" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
%tag {
    // line-height: 1;
    padding: 1px 4px;
    border-radius: 3px;
    background-color: black;
    color: white;
}

.artifact-card {
    user-select: none;
    box-shadow: 0 0 2px 0 #0007;
    font-weight: bold;
    width: 200px;
    height: 240px;
    background: #eae4d9;
    font-size: 12px;
    font-weight: bold;
    border-radius: 3px;
    position: relative;
    word-break: keep-all;

    .head {
        height: 100px;
        display: flex;
        justify-content: space-between;
        background: rgb(102, 87, 88);
        background: linear-gradient(
            165deg,
            rgba(102, 87, 88, 1) 0%,
            rgba(214, 169, 90, 1) 100%
        );

        .head-stat {
            display: flex;
            flex-direction: column;
            color: white;
            padding: 10px 15px;
            width: 100px;

            .piece-name {
                flex: 1;
                white-space: nowrap;
                z-index: 1;
            }

            .main-affix-name {
                color: #fff7;
                font-size: 10px;
            }

            .main-affix-value {
                font-size: 18px;
            }
        }

        .piece-img-wrapper {
            width: 100px;
            height: 100px;
            display: flex;
            align-items: center;
            justify-content: center;

            img {
                max-width: 100%;
                max-height: 100%;
            }
        }
    }

    .body {
        display: flex;
        flex-direction: column;

        .body-head {
            display: flex;
            padding: 8px 12px;
            align-items: center;

            .level {
                @extend %tag;
                background-color: #333;

                &.full {
                    background-color: #66c238;
                }
            }

            .lock-img-container {
                flex: 1;
                text-align: right;
                line-height: 0;

                img {
                    width: 20px;
                    height: 20px;
                    cursor: pointer;

                    &.readonly {
                        cursor: default;
                    }
                }
            }
        }

        .minor-affixes {
            color: #333;
            padding: 0 15px;

            .minor-affix {
                display: flex;
                align-items: center;

                .count {
                    display: inline-block;
                    width: 12px;
                    height: 12px;
                    border-radius: 2px;
                    text-align: center;
                    background-color: gray;
                    color: white;
                    font-family: "Courier New", Courier, monospace;
                    margin-right: 4px;
                    // vertical-align: text-top;
                }
            }
        }

        .sort-result {
            position: absolute;
            left: 0;
            bottom: 0;
            right: 0;
            height: 20px;
            color: white;
            text-align: center;
            line-height: 20px;
            display: flex;

            .min-an {
                background: #a6a6a6;
                width: 33.3%;
            }

            .avg-an {
                background: #2a82e4;
                width: 33.3%;
            }

            .max-an {
                background: #ff5733;
                width: 33.3%;
            }

            .full-an {
                background: #66c238;
                width: 100%;
            }

            .pbuild {
                background: cornflowerblue;
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .defeat {
                background: lightcoral;
                width: 100%;
            }
        }
    }

    .location {
        position: absolute;
        right: -8px;
        top: -8px;
        background-color: #333d51e0;
        border: 2px solid #e9e5dc;
        width: 40px;
        height: 40px;
        border-radius: 20px;
        display: flex;
        align-items: flex-end;
        justify-content: center;

        img {
            height: 44px;
        }
    }

    .select-box {
        position: absolute;
        right: 10px;
        top: 10px;
        width: 20px;
        height: 20px;
        border-radius: 3px;
        border: 1px solid gray;
        background-color: white;
        box-shadow: inset 0 0 0 2px white;
        cursor: pointer;
        display: none;
        transition: background-color 100ms ease;
    }

    &.selected > .select-box {
        background-color: $primary-color;
    }

    &:hover > .select-box,
    &.select-mode > .select-box {
        display: block;
    }

    .stats {
        position: absolute;
        width: 100%;
        height: 20px;
        left: 0;
        right: 0;
        bottom: 0;
        cursor: pointer;
        align-items: center;
        justify-content: center;
        color: white;
        background-color: #2a82e4;
        display: none;

        &:hover {
            filter: brightness(1.1);
        }

        span {
            margin-left: 5px;
        }
    }

    &:hover .stats {
        display: flex;
    }

    .edit-box {
        display: none;
        position: absolute;
        right: 10px;
        bottom: 30px;
        padding: 10px;
        line-height: 0;
        border-radius: 100px;
        color: white;
        box-shadow: 0 0 4px 0 gray;
        background-color: #2a82e4;
        cursor: pointer;

        &:hover {
            filter: brightness(1.1);
        }
    }

    &:hover .edit-box {
        display: block;
    }
}
</style>
