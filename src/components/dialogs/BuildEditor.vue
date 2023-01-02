<script lang="ts" setup>
import { ref, computed, watch, reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import CharData from "@/ys/data/character"
import ArtifactData from '@/ys/data/artifact';
import chs from '@/ys/locale/chs';
import { useStore } from '@/store';

const props = defineProps<{
    modelValue: boolean
}>()
const emit = defineEmits<{
    (e: 'update:modelValue', v: boolean): void
}>()
const store = useStore()

const show = computed<boolean>({
    get() { return props.modelValue },
    set(v) { emit('update:modelValue', v) }
})

// left
const elements = ['pyro', 'hydro', 'cryo', 'electro', 'anemo', 'geo', 'dendro']
    .map(e => ({
        element: e,
        icon: `./assets/game_icons/${e}.webp`,
        text: chs.element[e],
    })).concat([{
        element: 'custom',
        icon: '',
        text: '自定义'
    }])
interface IAvatar {
    key: string
    text: string
    icon: string
    rarity: number
    bg: string
}
const avatars = computed(() => {
    let ret: { [e: string]: IAvatar[] } = {}
    for (let b of store.state.builds) {
        let element, icon, rarity;
        if (b.key.startsWith('0')) {
            element = 'custom'
            icon = './assets/char_faces/default.webp'
            rarity = 1
        } else {
            element = CharData[b.key].element
            icon = b.key.startsWith('Traveler') ? './assets/char_faces/Traveler.webp'
                : `./assets/char_faces/${b.key}.webp`
            rarity = CharData[b.key].rarity
        }
        if (!(element in ret)) ret[element] = [] as IAvatar[]
        ret[element].push({
            key: b.key,
            text: b.name,
            icon,
            rarity,
            bg: `./assets/bg${rarity}.webp`,
        })
    }
    for (let e in ret) {
        ret[e].sort((a: any, b: any) => b.rarity - a.rarity)
    }
    return ret
})

// build
const selectedBuildKey = ref('')
const isCustom = computed(() => selectedBuildKey.value.startsWith('0'))
const isNew = ref(false)
const avatarClass = (key: string) => ({ avatar: true, selected: key == selectedBuildKey.value })
const setOptions = Object.entries(chs.set).map(p => ({ key: p[0], label: p[1] }))
const sandsOptions = ArtifactData.mainKeys.sands.map(m => ({ key: m, label: chs.affix[m] }))
const gobletOptions = ArtifactData.mainKeys.goblet.map(m => ({ key: m, label: chs.affix[m] }))
const circletOptions = ArtifactData.mainKeys.circlet.map(m => ({ key: m, label: chs.affix[m] }))
const build = reactive({
    name: '',
    set: [] as string[],
    sands: [] as string[],
    goblet: [] as string[],
    circlet: [] as string[],
    weightJson: ''
})
/**
 * depends on key:
 * - null: select Diluc
 * - existing key: select corresponding build
 * - non-existing key: select blank build to edit
 */
const selectBuild = (key?: string) => {
    if (!key) key = 'Diluc'
    selectedBuildKey.value = key
    let b = store.state.builds.filter(b => b.key == key)[0]
    if (b) {
        isNew.value = false
        build.name = b.name
        build.set = [...b.set]
        build.sands = [...b.main.sands]
        build.goblet = [...b.main.goblet]
        build.circlet = [...b.main.circlet]
        build.weightJson = JSON.stringify(b.weight)
    } else {
        isNew.value = true
        build.name = ''
        build.set = []
        build.sands = []
        build.goblet = []
        build.circlet = []
        build.weightJson = '{"hp":0,"atk":0,"def":0,"hpp":0,"atkp":0,"defp":0,"em":0,"er":0,"cr":0,"cd":0}'
    }
}
selectBuild()
const rules = reactive({
    name: [{ required: true, message: '必填', trigger: 'blur' }],
    weightJson: [{
        required: true,
        validator: (rule: never, value: string, callback: any) => {
            try {
                let w = JSON.parse(value)
                if (typeof w != 'object') return callback(new Error('格式错误'))
                if (ArtifactData.minorKeys.length != Object.keys(w).length) return callback(new Error('键缺失或多余'))
                for (let key in w) {
                    if (!ArtifactData.minorKeys.includes(key)) return callback(new Error('不存在的键：' + key))
                    if (typeof w[key] != 'number') return callback(new Error(key + '的值不是数值'))
                    if (w[key] < 0 || w[key] > 1) return callback(new Error(key + '的值不在[0,1]内'))
                }
                callback()
            } catch {
                callback(new Error('语法错误'))
            }
        },
        trigger: 'blur',
    }],
})
const formEl = ref<any>(null)
// actions
const saveBuild = (formEl: any) => {
    if (!formEl) return
    formEl.validate((valid: boolean) => {
        if (valid && selectedBuildKey.value) {
            let builds = store.state.builds, idx = -1
            builds.forEach((b, i) => {
                if (b.key == selectedBuildKey.value)
                    idx = i
            })
            if (idx >= 0) {
                builds[idx].name = build.name
                builds[idx].main.sands = [...build.sands]
                builds[idx].main.goblet = [...build.goblet]
                builds[idx].main.circlet = [...build.circlet]
                builds[idx].set = [...build.set]
                builds[idx].weight = JSON.parse(build.weightJson)
            } else {
                isNew.value = false
                builds.push({
                    key: selectedBuildKey.value,
                    name: build.name,
                    set: [...build.set],
                    main: {
                        sands: [...build.sands],
                        goblet: [...build.goblet],
                        circlet: [...build.circlet],
                    },
                    weight: JSON.parse(build.weightJson),
                })
            }
            store.commit('setBuilds', { builds })
            ElMessage({ message: '保存成功', type: 'success' })
        }
    })
}
const addBuild = () => {
    selectBuild(Math.random().toString())
}
const _resetBuild = (key: string) => {
    let b = store.state.builds.filter(b => b.key == key)[0]
    if (!b) return
    let c = CharData[key]
    if (!c) return
    b.name = chs.character[key]
    b.set = [...c.build.set]
    b.main.sands = [...c.build.main.sands]
    b.main.goblet = [...c.build.main.goblet]
    b.main.circlet = [...c.build.main.circlet]
    b.weight = { ...c.build.weight }
}
const resetBuild = () => {
    if (selectedBuildKey.value) {
        _resetBuild(selectedBuildKey.value)
        selectBuild(selectedBuildKey.value)
        store.commit('setBuilds', { builds: store.state.builds })
        ElMessage({ message: '重置成功', type: 'success' })
    }
}
const resetAllBuilds = () => {
    ElMessageBox.confirm(
        '将会重置所有角色配装（自定义配装除外），是否继续？',
        '警告',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(() => {
        Object.keys(CharData).forEach(key => _resetBuild(key))
        store.commit('setBuilds', { builds: store.state.builds })
        ElMessage({ message: '重置成功', type: 'success' })
    })
}
const delCustomBuild = () => {
    ElMessageBox.confirm(
        `将会删除自定义配装：${build.name}，是否继续？`,
        '警告',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(() => {
        store.commit('setBuilds', { builds: store.state.builds.filter(b => b.key != selectedBuildKey.value) })
        ElMessage({ message: '删除成功', type: 'success' })
        selectBuild()
    })
}
const delCustomBuilds = () => {
    ElMessageBox.confirm(
        '将会删除所有自定义配装，是否继续？',
        '警告',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(() => {
        store.commit('setBuilds', { builds: store.state.builds.filter(b => !b.key.startsWith('0')) })
        ElMessage({ message: '删除成功', type: 'success' })
        if (selectedBuildKey.value.startsWith('0')) {
            selectBuild()
        }
    })
}
</script>

<template>
    <el-dialog v-model="show" title="修改角色配装" top="2vh" bottom="2vh" width="90%">
        <div id="root">
            <div id="left">
                <div id="left-top">
                    <span class="button" @click="addBuild">新增配装</span>
                    <span class="button" @click="resetAllBuilds">全部重置</span>
                    <span class="button" @click="delCustomBuilds">删除自定义配装</span>
                </div>
                <div id="left-body">
                    <el-scrollbar>
                        <div class="char-group" v-for="e in elements">
                            <div class="group-hdr">
                                <img class="element-icon" :src="e.icon" v-if="e.icon">
                                <span class="element-text">{{ e.text }}</span>
                            </div>
                            <template v-for="a in avatars[e.element]">
                                <span :class="avatarClass(a.key)" @click="selectBuild(a.key)">
                                    <span class="icon-wrapper">
                                        <img class="bg" :src="a.bg">
                                        <img class="icon" :src="a.icon" :alt="a.text">
                                    </span>
                                    <span>{{ a.text }}</span>
                                </span>
                            </template>
                        </div>
                    </el-scrollbar>
                </div>
            </div>
            <div id="right">
                <el-scrollbar>
                    <el-form ref="formEl" :model="build" :rules="rules" label-width="80px">
                        <el-form-item label="角色名" prop="name">
                            <el-input v-model="build.name" />
                        </el-form-item>
                        <el-form-item label="套装">
                            <el-select v-model="build.set" multiple style="width:100%;">
                                <el-option v-for="o in setOptions" :value="o.key" :label="o.label" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="时之沙">
                            <el-select v-model="build.sands" multiple style="width:100%;">
                                <el-option v-for="o in sandsOptions" :value="o.key" :label="o.label" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="空之杯">
                            <el-select v-model="build.goblet" multiple style="width:100%;">
                                <el-option v-for="o in gobletOptions" :value="o.key" :label="o.label" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="理之冠">
                            <el-select v-model="build.circlet" multiple style="width:100%;">
                                <el-option v-for="o in circletOptions" :value="o.key" :label="o.label" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="词条权重" prop="weightJson">
                            <el-input v-model="build.weightJson" autosize type="textarea" class="code" />
                        </el-form-item>
                        <el-form-item>
                            <el-alert type="info" show-icon :closable="false" style="line-height: 1.4;">
                                hp=小生命，hpp=大生命，atk=小攻击，atkp=大攻击，def=小防御，defp=大防御，em=精通，er=充能，cr=暴击，cd=爆伤
                            </el-alert>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="danger" @click="delCustomBuild" v-if="isCustom"
                                :disabled="isNew">删除</el-button>
                            <el-button @click="resetBuild" v-else>恢复默认</el-button>
                            <el-button type="primary" @click="saveBuild(formEl)">保存</el-button>
                        </el-form-item>
                    </el-form>
                    <el-alert title="关于默认配装" type="info" v-show="!isCustom">
                        默认配装是作者个人根据
                        <a href="https://ngabbs.com/read.php?tid=27859119">NGA推荐配装</a>
                        更新的。如有错漏或不及时之处欢迎提
                        <a href="https://github.com/ideless/artifact/issues">Issue</a>
                        ！
                    </el-alert>
                </el-scrollbar>
            </div>
        </div>
    </el-dialog>
</template>

<style lang="scss" scoped>
#root {
    display: flex;
    align-items: stretch;
    height: 80vh;
    // overflow: hidden;
    // box-shadow: 0 0 1px 0 black;

    #left {
        // box-shadow: 0 0 1px 0 black;
        border-right: 1px solid lightgray;
        flex: 0.5;
        display: flex;
        flex-flow: column;

        #left-top {
            height: 30px;

            .button {
                text-decoration: underline;
                margin-right: 10px;
                margin-bottom: 2px;
                cursor: pointer;

                &:hover {
                    color: #409eff;
                }
            }
        }

        #left-body {
            flex: 1;
            overflow: hidden;

            .char-group {
                padding-left: 2px;

                .group-hdr {
                    // box-shadow: 0 0 1px 0 black;
                    display: flex;
                    align-items: center;
                    background: rgb(255, 249, 238);
                    background: linear-gradient(90deg, rgba(255, 249, 238, 1) 0%, rgba(255, 255, 255, 1) 100%);

                    .element-icon {
                        width: 30px;
                    }

                    .element-text {
                        margin-left: 10px;
                    }
                }

                .avatar {
                    display: inline-flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 5px;
                    cursor: pointer;

                    &.selected {
                        background-color: #ffffeb;
                        box-shadow: 0 0 0 1px #ac9710;
                        border-radius: 5px;
                    }

                    .icon-wrapper {
                        width: 60px;
                        height: 60px;
                        border-radius: 5px;
                        overflow: hidden;
                        position: relative;

                        img {
                            position: absolute;
                            top: 0;
                            left: 0;
                            right: 0;
                            height: 100%;
                        }

                        img.icon {
                            margin-left: auto;
                            margin-right: auto;
                            transition: scale 100ms ease;
                        }
                    }

                    &:hover>.icon-wrapper>img.icon {
                        scale: 1.1;
                    }
                }
            }
        }
    }

    #right {
        // box-shadow: 0 0 1px 0 black;
        flex: 0.5;
        padding: 10px;
        overflow-y: hidden;

        .code {
            font-family: 'Courier New', Courier, monospace;
        }
    }
}
</style>