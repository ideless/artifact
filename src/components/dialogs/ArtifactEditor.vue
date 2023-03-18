<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import { useArtifactStore } from "@/store";
import { Affix, Artifact } from "@/ys/artifact";
import ArtifactCard from "@/components/widgets/ArtifactCard.vue";
import { ArtifactData, CharacterData } from "@/ys/data";
import { i18n } from "@/i18n";

const props = defineProps<{
    modelValue: boolean;
    index: number;
}>();
const emit = defineEmits<{
    (e: "update:modelValue", value: boolean): void;
}>();

const artStore = useArtifactStore();

const show = computed({
    get() {
        return props.modelValue;
    },
    set(value: boolean) {
        emit("update:modelValue", value);
    },
});
const characters = computed(() => {
    let tmp: { [key: string]: string[] } = {};
    for (let c in CharacterData) {
        if (CharacterData[c].element in tmp) {
            tmp[CharacterData[c].element].push(c);
        } else {
            tmp[CharacterData[c].element] = [c];
        }
    }
    let ret = [
        {
            label: "",
            options: [{ value: "", label: i18n.global.t("ui.unequiped") }],
        },
    ];
    for (let element in tmp) {
        ret.push({
            label: i18n.global.t("element." + element),
            options: tmp[element].map((key) => ({
                value: key,
                label: i18n.global.t("character." + key),
            })),
        });
    }
    return ret;
});
const affixes = ArtifactData.minorKeys.map((key) => ({
    value: key,
    label: i18n.global.t("artifact.affix." + key),
}));
let equiped: { [key: string]: { [key: string]: boolean } } = {};
const modified = ref(false);
const newArt = ref<Artifact>(new Artifact());
const oldArt = ref<Artifact>(new Artifact());
watch(
    () => show.value,
    () => {
        if (!show.value) return;
        // reset equiped
        for (let c in CharacterData) {
            equiped[c] = {
                flower: false,
                plume: false,
                sands: false,
                goblet: false,
                circlet: false,
            };
        }
        for (let a of artStore.artifacts) {
            if (a.data.index === props.index) {
                newArt.value = new Artifact(a);
                oldArt.value = a;
            }
            if (a.location in equiped) {
                equiped[a.location][a.slot] = true;
            }
        }
        modified.value = false;
    }
);
const location = computed<string>({
    get() {
        return newArt.value.location;
    },
    set(value) {
        newArt.value.location = value;
        modified.value = true;
    },
});
const level = computed<number>({
    get() {
        return newArt.value.level;
    },
    set(value) {
        newArt.value.level = value;
        modified.value = true;
    },
});
const minor1key = computed<string>({
    get() {
        return newArt.value.minors.length >= 1
            ? newArt.value.minors[0].key
            : "";
    },
    set(key) {
        if (newArt.value.minors.length >= 1) newArt.value.minors[0].key = key;
        else newArt.value.minors.push(new Affix({ key, value: 0 }));
        modified.value = true;
    },
});
const minor1value = computed<number>({
    get() {
        return newArt.value.minors.length >= 1
            ? newArt.value.minors[0].value
            : 0;
    },
    set(value) {
        if (newArt.value.minors.length >= 1)
            newArt.value.minors[0].value = value;
        else newArt.value.minors.push(new Affix({ key: "atk", value }));
        modified.value = true;
    },
});
const minor2key = computed<string>({
    get() {
        return newArt.value.minors.length >= 2
            ? newArt.value.minors[1].key
            : "";
    },
    set(key) {
        if (newArt.value.minors.length >= 2) newArt.value.minors[1].key = key;
        else newArt.value.minors.push(new Affix({ key, value: 0 }));
        modified.value = true;
    },
});
const minor2value = computed<number>({
    get() {
        return newArt.value.minors.length >= 2
            ? newArt.value.minors[1].value
            : 0;
    },
    set(value) {
        if (newArt.value.minors.length >= 2)
            newArt.value.minors[1].value = value;
        else newArt.value.minors.push(new Affix({ key: "atk", value }));
        modified.value = true;
    },
});
const minor3key = computed<string>({
    get() {
        return newArt.value.minors.length >= 3
            ? newArt.value.minors[2].key
            : "";
    },
    set(key) {
        if (newArt.value.minors.length >= 3) newArt.value.minors[2].key = key;
        else newArt.value.minors.push(new Affix({ key, value: 0 }));
        modified.value = true;
    },
});
const minor3value = computed<number>({
    get() {
        return newArt.value.minors.length >= 3
            ? newArt.value.minors[2].value
            : 0;
    },
    set(value) {
        if (newArt.value.minors.length >= 3)
            newArt.value.minors[2].value = value;
        else newArt.value.minors.push(new Affix({ key: "atk", value }));
        modified.value = true;
    },
});
const minor4key = computed<string>({
    get() {
        return newArt.value.minors.length >= 4
            ? newArt.value.minors[3].key
            : "";
    },
    set(key) {
        if (key == "") {
            // 删除
            if (newArt.value.minors.length == 4) {
                newArt.value.minors.pop();
            }
        } else {
            if (newArt.value.minors.length >= 4)
                newArt.value.minors[3].key = key;
            else newArt.value.minors.push(new Affix({ key, value: 0 }));
        }
        modified.value = true;
    },
});
const minor4value = computed<number>({
    get() {
        return newArt.value.minors.length >= 4
            ? newArt.value.minors[3].value
            : 0;
    },
    set(value) {
        if (newArt.value.minors.length >= 4)
            newArt.value.minors[3].value = value;
        else newArt.value.minors.push(new Affix({ key: "atk", value }));
        modified.value = true;
    },
});
const toSwap = computed(() => {
    return (
        oldArt.value.location != newArt.value.location &&
        !!newArt.value.location &&
        equiped[newArt.value.location][newArt.value.slot]
    );
});
const equipMsg = computed<string>(() => {
    if (toSwap.value) {
        let char_name = i18n.global.t("character." + newArt.value.location);
        if (oldArt.value.location) {
            return i18n.global.t("ui.swap_art_of", { char_name });
        } else {
            return i18n.global.t("ui.replace_art_of", { char_name });
        }
    } else {
        return "";
    }
});
const save = () => {
    artStore.updArtifact(props.index, toSwap.value, newArt.value);
    emit("update:modelValue", false);
};
</script>

<template>
    <el-dialog v-model="show" :title="$t('ui.art_editor')" top="8vh">
        <el-divider>{{ $t("ui.main_attrs") }}</el-divider>
        <el-row :gutter="20">
            <el-col :span="3">
                <span>{{ $t("ui.art_location") }}</span>
            </el-col>
            <el-col :span="9">
                <el-select v-model="location">
                    <el-option-group v-for="g in characters" :label="g.label">
                        <el-option
                            v-for="o in g.options"
                            :value="o.value"
                            :label="o.label"
                        />
                    </el-option-group>
                </el-select>
            </el-col>
            <el-col :span="3">
                <span>{{ $t("ui.art_level") }}</span>
            </el-col>
            <el-col :span="9">
                <el-input-number v-model="level" :min="0" :max="20" />
            </el-col>
        </el-row>
        <el-divider>{{ $t("ui.minor_affixes") }}</el-divider>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-select v-model="minor1key">
                    <el-option
                        v-for="o in affixes"
                        :label="o.label"
                        :value="o.value"
                    />
                </el-select>
            </el-col>
            <el-col :span="12">
                <el-input-number v-model="minor1value" :precision="1" />
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-select v-model="minor2key">
                    <el-option
                        v-for="o in affixes"
                        :label="o.label"
                        :value="o.value"
                    />
                </el-select>
            </el-col>
            <el-col :span="12">
                <el-input-number v-model="minor2value" :precision="1" />
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-select v-model="minor3key">
                    <el-option
                        v-for="o in affixes"
                        :label="o.label"
                        :value="o.value"
                    />
                </el-select>
            </el-col>
            <el-col :span="12">
                <el-input-number v-model="minor3value" :precision="1" />
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-select v-model="minor4key">
                    <el-option :label="$t('ui.empty')" value="" />
                    <el-option
                        v-for="o in affixes"
                        :label="o.label"
                        :value="o.value"
                    />
                </el-select>
            </el-col>
            <el-col :span="12">
                <el-input-number v-model="minor4value" :precision="1" />
            </el-col>
        </el-row>
        <el-divider>{{ $t("ui.preview") }}</el-divider>
        <el-row justify="center">
            <artifact-card :artifact="oldArt" :readonly="true" />
            <div class="art-preview-split" v-show="modified">⇒</div>
            <artifact-card
                :artifact="newArt"
                :readonly="true"
                v-show="modified"
            />
        </el-row>
        <p class="equip-msg">{{ equipMsg }}</p>
        <el-row justify="center" style="margin-top: 30px">
            <el-button type="primary" @click="save">保存</el-button>
        </el-row>
    </el-dialog>
</template>

<style lang="scss">
.el-row {
    margin: 10px 0;
    align-items: center;
}

.art-preview-split {
    margin: 20px;
}

.equip-msg {
    text-align: center;
    font-weight: normal;
    font-size: smaller;
}
</style>
