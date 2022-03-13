<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { DeleteFilled } from '@element-plus/icons-vue'
import chs from '../ys/locale/chs'
import { useStore } from '../store';

let ArtifactParamTypes : string[] = [];
let ArtifactSubParamTypes : string[] = [];
let ArtifactPositionNames : string[] = [];
let ArtifactSetNames : string[] = [];
let CharacterNames : string[] = [];

function updateNames() {
    ArtifactParamTypes = ['hp', 'hpp', 'atk', 'atkp', 'defp' ,'em', 'er', 'hb', 'cr', 'cd'];
    for (let key in chs.affix)
        if (key.indexOf('DB') > -1)  // damage bonuses
            ArtifactParamTypes.push(key);
    ArtifactSubParamTypes = ['hp', 'hpp', 'atk', 'atkp', 'def', 'defp', 'em', 'er', 'cr', 'cd'];
    for (let key in chs.slot)
        ArtifactPositionNames.push(key);
    for (let key in chs.set)
        ArtifactSetNames.push(key);
    for (let key in chs.character)
        CharacterNames.push(key);
    //console.log(CharacterNames)
}

updateNames();

function __ (s: string) {
    return s;
}

import { scoreFilterNames, SubFilterEquation, SubFilter, ArtifactFilter } from '../ys/artifactFilter'
export default defineComponent({
    props: {
        filter: {
            type: ArtifactFilter,
            default: new ArtifactFilter()
        },
        show: Boolean,
        title: String,
    },
    emits: ['update:filter', 'update:show', 'update:onefilter'],
    data() {
        let availableSubFilterEquations: any[] = []
        for (let i in SubFilterEquation)
            if (isNaN(Number(i))) availableSubFilterEquations.push({ value: SubFilterEquation[i], label: i })
        return {
            ArtifactFilter,
            ArtifactParamTypes,
            ArtifactSubParamTypes,
            ArtifactSetNames,
            ArtifactPositionNames,
            scoreFilterNames,
            CharacterNames,
            availableSubFilterEquations,
            showLoadPanel: false,
            showWeightPanel: false,
            saveInput: '',
            chs,
            store: useStore()
        }
    },
    watch: {},
    created() {},
    methods: {
        __ (s: string) {
            return __(s);
        },
        doSave() {
            this.$emit('update:filter', this.filter)
            this.$emit('update:show', false)
        },
        doFilter() {
            this.$emit('update:onefilter')
            this.$emit('update:show', false)
        },
        doAddIncludeSub() {
            this.filter.includeSub.push(new SubFilter())
        },
        doAddExcludeSub() {
            this.filter.excludeSub.push(new SubFilter())
        },
        doDeleteIncludeSub(key: number) {
            this.filter.includeSub.splice(key, 1)
        },
        doDeleteExcludeSub(key: number) {
            this.filter.excludeSub.splice(key, 1)
        },
        onSubClick(sub: SubFilter) {
            sub.value = sub.value.replace('%', '')
            if (['hp', 'atk', 'def', 'em'].indexOf(sub.name) == -1)
                sub.value += '%'
        },
        showJSON(event: Event) {
            const trigger = event.target as Element;
            //console.log(trigger);
            navigator.clipboard.writeText(JSON.stringify(this.filter));
            //console.log(JSON.stringify(this.filter));
            ElNotification({
                type: 'success',
                title: __('导出过滤规则成功'),
                message: __('已复制到剪贴板'),
            })
        },
        loadJSON() {
            try {
                this.filter.loadFromJSON(this.saveInput);
                ElNotification({
                    type: 'success',
                    title: __('导入过滤规则成功'),
                })
            }
            catch (e) {
                ElNotification({
                    type: 'error',
                    title: __('导入过滤规则失败'),
                    message: __('请检查规则是否为合法JSON格式'),
                })
                console.log(e)
            }
        },
        doResetWeight() {
            this.filter.setScoreWeight(this.store.state.weight)
            this.$emit('update:filter', this.filter)
                ElNotification({
                    type: 'success',
                    title: __('已复制权重'),
                })
            return true
        }
    },
    components: {
        DeleteFilled
    }
})
</script>
<template>
    <el-dialog :title="title?.length ? title : '新规则'" width="800px" :model-value="show" @update:model-value="$emit('update:show', $event)">
        <article class="artifact-edit-panel">
            <el-select v-model="filter.set" multiple :placeholder="__('套装')" style="width: 100%;">
                <el-option v-for="(item, a) in ArtifactSetNames" :key="a" :label="chs.set[item].name" :value="item"> </el-option>
            </el-select>
            <el-select v-model="filter.position" multiple :placeholder="__('位置')" style="width: 50%;">
                <el-option v-for="(item, a) in ArtifactPositionNames" :key="a" :label="chs.slot[item]" :value="item"></el-option>
            </el-select>
            <el-select v-model="filter.main" multiple :placeholder="__('主词条')" style="width: 50%;">
                <el-option v-for="(item, a) in ArtifactParamTypes" :key="a" :label="chs.affix[item]" :value="item"></el-option>
            </el-select>
            <!-- <el-select v-model="filter.level" multiple :placeholder="__('等级')" style="width: 20%;">
                <el-option
                    v-for="(item, a) in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]"
                    :key="a"
                    :label="item"
                    :value="item"
                >
                </el-option>
            </el-select> -->
            <!-- <el-select v-model="filter.stars" multiple :placeholder="__('星级')" style="width: 20%;">
                <el-option v-for="(item, a) in [1, 2, 3, 4, 5]" :key="a" :label="item" :value="item"> </el-option>
            </el-select> -->
            <el-select v-model="filter.subCount" multiple :placeholder="__('副词条数量')" style="width: 40%;">
                <el-option v-for="(item, a) in [0, 1, 2, 3, 4]" :key="a" :label="item" :value="item"> </el-option>
            </el-select>
            <el-select v-model="filter.lock" multiple :placeholder="__('是否加锁')" style="width: 15%;">
                <el-option label="加锁" :value="true"> </el-option>
                <el-option label="未加锁" :value="false"> </el-option>
            </el-select>
            <el-select v-model="filter.character" multiple :placeholder="__('装备角色')" style="width: 45%;">
                <el-option label="未装备" :value="''"> </el-option>
                <el-option label="任意角色" :value="ArtifactFilter.anyCharacter"> </el-option>
                <el-option v-for="(item, a) in CharacterNames" :key="a" :label="chs.character[item]" :value="item"> </el-option>
            </el-select>
            <div class="scoreweightdiv">
                <span>分数权重</span>
                <el-dialog title="编辑权重" width="400px" :model-value="showWeightPanel" @update:model-value="showWeightPanel = false;">
                    <div class="scoreweightdialog">
                        <div v-for="(value, key) in filter.scoreWeight" :key="key" class="scoreweightdivone">
                            <span>{{  chs.affix[key] + (chs.affix[key].length >= 5 ? '' : '&emsp;'.repeat(5 - chs.affix[key].length)) }}</span>
                            <el-input class="numberinput" v-model.number="filter.scoreWeight[key]" type="number" step="0.1" style="width: 80px;">{{ key }}</el-input>
                        </div>
                    </div>
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button type="primary" @click="showWeightPanel = false;">{{ __('关闭') }}</el-button>
                        </span>
                    </template>
                </el-dialog>
                <el-button @click="showWeightPanel = true;">编辑权重</el-button>
                <el-popconfirm
                    confirmButtonText="确定"
                    cancelButtonText="算了"
                    title="确定使用词条权重面板当前设置的权重覆盖？"
                    confirmButtonType="danger"
                    @confirm="doResetWeight"
                >
                    <template #reference>
                        <el-button>复制当前</el-button>
                    </template>
                </el-popconfirm>
            </div>
            <div class="leveldiv">
                <span class="filter-name">等级</span>
                <range-slider
                    :model-value="filter.level"
                    @update:model-value="filter.level = $event"
                />
            </div>
            <div class="scorefilterdiv">
                <div v-for="(filterName, index) in scoreFilterNames" :key="index">
                    <span>{{ filterName[1] }}</span>
                    <el-input class="numberinput" v-model.number="filter.scoreFilters[filterName[0]].value" type="number">
                        <template #prepend>
                            <el-select v-model="filter.scoreFilters[filterName[0]].equation" style="width: 60px;">
                                <el-option
                                    v-for="(j, a) in availableSubFilterEquations"
                                    :key="a"
                                    :value="j.value"
                                    :label="j.label"
                                ></el-option>
                            </el-select>
                        </template>
                    </el-input>
                </div>
            </div>
            <hr/>
            <div class="sub-title-div">
                {{ __('需要包含的副词条') }}
            </div>
            <div class="sub-control-div">
                <el-button @click="doAddIncludeSub">
                    {{ __('添加想包含副词条') }}
                </el-button>
                {{ __('最少包含条数') }}
                <el-select v-model="filter.includeSubCount" style="margin-left: 5px">
                    <el-option v-for="(item, a) in [0, 1, 2, 3, 4]" :key="a" :label="item" :value="item"> </el-option>
                </el-select>
            </div>
            <el-empty v-if="filter.includeSub.length <= 0" :image-size="80" :description="__('暂无想包含副词条')"></el-empty>
            <ul v-else class="sub">
                <li v-for="(i, a) in filter.includeSub" :key="a">
                    <el-input v-model="i.value" :placeholder="__('属性值')">
                        <template #prepend>
                            <el-select v-model="i.name" :placeholder="__('属性名')" style="width: 150px;">
                                <el-option
                                    v-for="(j, a) in ArtifactSubParamTypes"
                                    :key="a"
                                    :value="j"
                                    :label="chs.affix[j]"
                                    @click="onSubClick(i)"
                                ></el-option>
                            </el-select>
                            <el-select v-model="i.equation" style="margin-left: 0px; width: 60px;">
                                <el-option
                                    v-for="(j, a) in availableSubFilterEquations"
                                    :key="a"
                                    :value="j.value"
                                    :label="j.label"
                                ></el-option>
                            </el-select>
                        </template>
                        <template #append>
                            <el-button @click="doDeleteIncludeSub(a)"><el-icon><delete-filled /></el-icon></el-button>
                        </template>
                    </el-input>
                </li>
            </ul>
            <hr />
            <div class="sub-title-div">
                {{ __('不想包含的副词条') }}
            </div>
            <div class="sub-control-div">
                <el-button @click="doAddExcludeSub">
                    {{ __('添加不包含副词条') }}
                </el-button>
                {{ __('最多包含条数') }}
                <el-select v-model="filter.excludeSubCount" style="margin-left: 5px">
                    <el-option v-for="item in [0, 1, 2, 3, 4]" :key="item" :label="item" :value="item"> </el-option>
                </el-select>
            </div>
            <el-empty v-if="filter.excludeSub.length <= 0" :image-size="80" :description="__('暂无不包含副词条')"></el-empty>
            <ul v-else class="sub">
                <li v-for="(i, a) in filter.excludeSub" :key="a">
                    <el-input v-model="i.value" :placeholder="__('属性值')">
                        <template #prepend>
                            <el-select v-model="i.name" :placeholder="__('属性名')" style="width: 150px;">
                                <el-option
                                    v-for="(j, a) in ArtifactSubParamTypes"
                                    :key="a"
                                    :value="j"
                                    :label="chs.affix[j]"
                                    @click="onSubClick(i)"
                                ></el-option>
                            </el-select>
                            <el-select v-model="i.equation" style="margin-left: 0px; width: 70px;">
                                <el-option
                                    v-for="(j, a) in availableSubFilterEquations"
                                    :key="a"
                                    :value="j.value"
                                    :label="j.label"
                                ></el-option>
                            </el-select>
                        </template>
                        <template #append>
                            <el-button @click="doDeleteExcludeSub(a)"><el-icon><delete-filled /></el-icon></el-button>
                        </template>
                    </el-input>
                </li>
            </ul>
            <hr />
            <el-tooltip class="item" effect="dark" content="提示：对过滤得到圣遗物分组并根据得分排名筛选。详见排名筛选逻辑。" placement="bottom">
                <div class="rank-div">
                    <div class="rank-title-div">
                        <el-checkbox v-model="filter.useRankFilter" style="height: auto"></el-checkbox>
                        <span style="margin-left: 5px;" :class="filter.useRankFilter ? '' : ''"> {{ __('根据排名筛选') }} </span>
                    </div>
                    <div style="width: 50%;">
                        <span :class="filter.useRankFilter ? '' : 'rank-disabled'">用于分组的属性&emsp;</span>
                        <el-checkbox v-model="filter.rankGroup.main" :disabled="!filter.useRankFilter">主词条</el-checkbox>
                        <el-checkbox v-model="filter.rankGroup.position" :disabled="!filter.useRankFilter">位置</el-checkbox>
                        <el-checkbox v-model="filter.rankGroup.set" :disabled="!filter.useRankFilter">套装</el-checkbox>
                    </div>
                    <div style="width: 50%;">
                        <span :class="filter.useRankFilter ? '' : 'rank-disabled'">排序方式&emsp;</span>
                        <el-radio v-model="filter.rankAscend" :label="false" :disabled="!filter.useRankFilter">先大后小</el-radio>
                        <el-radio v-model="filter.rankAscend" :label="true" :disabled="!filter.useRankFilter">先小后大</el-radio>
                    </div>
                    <div style="width: 40%;">
                        <span :class="filter.useRankFilter ? '' : 'rank-disabled'">排序分数&emsp;</span>
                        <el-radio v-model="filter.rankScoreName" label="cur" :disabled="!filter.useRankFilter">当前</el-radio>
                        <el-radio v-model="filter.rankScoreName" label="md" :disabled="!filter.useRankFilter">期望</el-radio>
                        <el-radio v-model="filter.rankScoreName" label="tot" :disabled="!filter.useRankFilter">总分</el-radio>
                    </div>
                    <div class="rank-input-div" style="width: 30%;">
                        <span :class="filter.useRankFilter ? '' : 'rank-disabled'">排名分界线x&emsp;</span>
                        <el-input class="numberinput" v-model.number="filter.rankSelectNumber" type="number" :disabled="!filter.useRankFilter" style="width: 30%;"></el-input>
                    </div>
                    <div style="width: 30%;">
                        <el-radio v-model="filter.rankReverseSelect" :label="false" :disabled="!filter.useRankFilter">筛选前x个</el-radio>
                        <el-radio v-model="filter.rankReverseSelect" :label="true" :disabled="!filter.useRankFilter">排除前x个</el-radio>
                    </div>
                </div>
            </el-tooltip>
        </article>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="showJSON">{{ __('导出') }}</el-button>
                <el-button @click="showLoadPanel = true;">{{ __('导入') }}</el-button>
                <el-button type="primary" @click="doFilter">{{ __('以此规则过滤') }}</el-button>
                <el-popover
                placement="top-start"
                width="600"
                trigger="hover">
                    <div id="filter-hint" style="width: 600px;">
                        <p>{{ __('主词条、位置、套装、副词条数量、是否加锁、装备角色为复选菜单，不选时不使用该数据过滤，选择后过滤满足所选项的圣遗物。星级通过滑块选择范围。') }}{{ __('如果装备角色中选择了任意角色选项，会选择所有已被角色装备的圣遗物。') }}</p>
                        <p>{{ __('需要根据分数过滤时，可以根据当前分、期望分、总分数值进行过滤。分数由规则中设置的分数权重计算得到，每个新规则初始分数权重为默认值，可以点击编辑权重修改。如果需要复制当前词条权重面板中设置的权重，点击复制当前并确认。') }}</p>
                        <p>{{ __('对于副词条，有想包含的副词条和不想包含的副词条两种。如果留空则不用于过滤。以想包含的副词条为例：') }}</p>
                        <ul>
                            <li>{{ __('最少包含条数：最少包含多少条所列的副词条。例如选择了攻充爆爆最少条数3，那么这四条中至少包含三条的圣遗物才会被过滤出来') }}</li>
                            <li>{{ __('添加想包含副词条：按钮位于窗口最下方，点击后添加新的一个副词条筛选数据') }}</li>
                            <li>{{ __('副词条：包含四部分，副词条名称、判断方式、数值、删除。名称选择副词条名，判断方式有') }}<code>&gt; &lt; =</code>{{ __('等，数值为数值阈值，删除为删除该副词条。') }}</li>
                        </ul>
                        <p>{{ __('不想包含的副词条和上述类似，不同在于：最多包含条数，圣遗物副词条最多只能包含多少条不想包含的副词条。添加不包含副词条，添加新的一条不想包含的副词条。') }}</p>
                        <p>{{ __('') }}</p>
                        <p>{{ __('点击以此规则过滤，会选择该过滤规则，之后点击开始计算展示过滤结果。') }}</p>
                    </div>

                    <template #reference>
                        <el-button plain style="float: left">
                            {{ __('过滤逻辑') }}
                        </el-button>
                    </template>
                </el-popover>
                <el-popover
                placement="top-start"
                width="600"
                trigger="hover">
                    <div id="filter-hint" style="width: 600px;">
                        <p>{{ __('根据排名筛选基于过滤结果，只会对过滤出的圣遗物进行排名筛选。使用该功能，请勾上根据排名筛选前的框。该功能主要用于对于同类圣遗物，选出该类中得分较高的加锁或较低的解锁。') }}</p>
                        <p>{{ __('用于分组的属性指选择哪些属性进行圣遗物划分，类似SQL中的GROUP BY。选择属性相同的所有圣遗物会被划为一组并每组分别进行排名筛选。例如全不勾选就只分为一组一起排名；勾选套装和位置则所有同套装同位置（即名称相同）为同一组。') }}</p>
                        <p>{{ __('排序方式包含先大后小（降序）和先小后大（升序）两类。排序结果从1开始编号。排序分数可以从三种分数中选择一种。') }}</p>
                        <p>{{ __('排名分界线用于在每组圣遗物中根据排名选择。包含筛选前x个（显示排序第1至第x的圣遗物）和排除前x个（显示排序第x+1至最后的圣遗物）。') }}</p>
                    </div>

                    <template #reference>
                        <el-button plain style="float: left">
                            {{ __('排名筛选逻辑') }}
                        </el-button>
                    </template>
                </el-popover>
                <el-button @click="doSave">{{ __('关闭') }}</el-button>
            </span>
        </template>
        <el-dialog :title="__('输入保存数据')" width="400px" :model-value="showLoadPanel" @update:model-value="showLoadPanel = false;">
            <textarea v-model="saveInput" style="width: 100%; height: 100px;"></textarea>
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="showLoadPanel = false; loadJSON();">{{ __('确定') }}</el-button>
                    <el-button @click="showLoadPanel = false;">{{ __('取消') }}</el-button>
                </span>
            </template>
        </el-dialog>
    </el-dialog>
</template>

<style lang="scss" scoped>
.artifact-edit-panel {
    position: relative;
    margin-top: -20px;
    // &::v-deep(.el-select) .el-input {
    //     width: 150px;
    // }
    .leveldiv {
        display: inline-flex;
        text-align: center;
        align-items: center;
        width: 65%;
        * {
            width: 90%;
        }
        span {
            width: 10%;
        }
    }
    .scorefilterdiv {
        display: inline-flex;
        > * {
            display: flex;
            width: 33%;
            text-align: center;
            align-items: center;
            margin-left: 10px;
            margin-right: 10px;
        }
        > *:first-child {
            margin-left: 0;
        }
        > *:last-child {
            margin-right: 0;
        }
        > * > span {
            min-width: 50px;
        }
    }
    .scoreweightdiv {
        display: inline-flex;
        width: 35%;
        text-align: center;
        align-items: center;
        justify-content: space-around;
        > * {
            text-align: center;
            align-items: center;
        }
        .scoreweightdialog {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            .scoreweightdivone {
                width: 40%;
                display: flex;
                text-align: center;
                align-items: center;
                span {
                    width: 60%;
                    margin: 10px 0;
                }
                el-input {
                    height: 100px;
                }
            }
        }
    }
    .title-select {
        width: 180px;
        white-space: nowrap;
    }
    .image {
        position: absolute;
        top: -10px;
        right: 30px;
        width: 120px;
        height: 120px;
        background: transparent no-repeat center;
        background-size: contain;
    }
    .stars {
        position: absolute;
        top: 105px;
        right: 27px;
        z-index: 2;
    }
    .sub {
        min-height: 128px;
        margin-bottom: 0;
    }
    .el-empty {
        padding: 0;
        height: 128px;
        margin-top: 14px;
    }
    .title ::v-deep(.el-select) .el-input {
        width: 180px !important;
    }

    .level ::v-deep(.el-input-number) {
        width: 180px;
    }

    .main ::v-deep(.el-input) {
        width: 180px !important;
        display: block;
    }
    
    .sub-title-div, .rank-title-div {
        font-size: 125%;
        text-align: center;
        margin: 10px 0;
        width: 100%;
    }
    .sub-control-div {
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
        > * {
            margin-right: 20px;
        }
    }
    .rank-div {
        display: flex;
        text-align: center;
        align-items: center;
        flex-wrap: wrap;
        .rank-input-div {
            display: flex;
            text-align: center;
            align-items: center;
            justify-content: center;
        }
        .rank-disabled {
            color: #c0c4cc;
        }
    }
}

.dialog-footer > * {
    padding: 8px;
}
#filter-hint code {
    background-color: rgba(175, 184, 193, 0.2);
    padding: .2em .4em;
    font-size: 85%;
    margin: 0;
    border-radius: 6px;
}
</style>
<style lang="scss">
.numberinput {
    > input {
        padding-right: 0px
    }
}
</style>
