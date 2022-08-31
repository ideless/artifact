<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { CircleCheckFilled, Plus, EditPen, DeleteFilled } from '@element-plus/icons-vue'
import { SubFilterEquation, SubFilter, ArtifactFilter, FilterBatchOne } from '../ys/artifactFilter'
import chs from '../ys/locale/chs'
import { useStore } from '../store';

function __ (s: string) {
    return s;
}

export default defineComponent({
    props: {
        show: Boolean,
    },
    emits: ['update:show'],
    data() {
        return {
            showLoadFilterBatchPanel: false,
            filterBatchSaveInput: '',
            chs,
            lock2text: {
                'disabled': '跳过',
                'lock': '加锁',
                'unlock': '解锁',
            },
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
            this.$emit('update:show', false)
            localStorage.setItem('filterBatchJSON', JSON.stringify(this.store.state.filterBatch))
            this.store.dispatch('updFilteredArtifacts')
        },
        doAddFilterBatch() {
            this.store.state.filterBatch.push(new FilterBatchOne());
        },
        doDeleteFilterBatch(index: number) {
            this.store.state.filterBatch.splice(index, 1);
            if (this.store.state.useFilterBatch >= index)
                this.store.commit('filterBatchIndex', -1);
            return true;
        },
        doDeleteAllFilter() {
            this.store.state.filterBatch.splice(0)
            return true
        },
        getFilterBatchJSON() {
            //console.log(trigger);
            navigator.clipboard.writeText(JSON.stringify(this.store.state.filterBatch));
            ElNotification({
                type: 'success',
                title: __('导出批量过滤规则成功'),
                message: __('已复制到剪贴板'),
            })
        },
        setFilterBatchJSON() {
            try {
                if (JSON.stringify(JSON.parse(this.filterBatchSaveInput))[0] === '{') {
                    ElNotification({
                        type: 'error',
                        title: __('导入批量过滤规则失败'),
                        message: __('批量过滤规则格式错误，请检查是否输入了单条过滤规则'),
                    })
                    return;
                }
                const data = JSON.parse(this.filterBatchSaveInput);
                this.store.state.filterBatch.splice(0);
                for (let i = 0; i < data.length; i ++ )
                    this.store.state.filterBatch.push(new FilterBatchOne(data[i]));
                ElNotification({
                    type: 'success',
                    title: __('导入批量过滤规则成功'),
                })
            }
            catch (e) {
                ElNotification({
                    type: 'error',
                    title: __('导入批量过滤规则失败'),
                    message: __('请检查批量规则是否为合法JSON格式'),
                })
                console.log(e);
            }
        },
        filterBatchStart() {
            this.store.dispatch('setLockByFilterBatch')
            this.doSave()
        },
        updateArtifactFilter(filter: ArtifactFilter, index: number) {
            this.store.state.filterBatch[index].filter = filter;
        },
        getcolor(label: string) {
            if (label == 'lock') return 'color: green;';
            if (label == 'unlock') return 'color: red;';
            if (label == 'disabled') return 'color: grey;';
            return '';
        },
        updateAllFilterLock(s: string) {
            for (let i = 0; i < this.store.state.filterBatch.length; i ++ )
                this.store.state.filterBatch[i].lock = s;
        },
        doOneFilter(index: number) {
            this.store.commit('filterBatchIndex', index)
            this.$emit('update:show', false)
            ElNotification({
                type: 'success',
                title: '选择过滤规则成功',
            })
        }
    },
    components: {
        DeleteFilled, EditPen, Plus, CircleCheckFilled
    }
})
</script>
<template>
    <el-dialog :title="__('批量过滤规则')" width="70%" :model-value="show" @update:model-value="doSave">
        {{ __('可以设置多条过滤规则，每条规则有加锁、解锁、跳过三种状态，跳过状态下在批量执行过滤规则时会跳过该规则。') }}<br/>
        {{ __('批量执行加锁解锁时，规则会从上到下依次执行，匹配多个规则时，位于后面的规则效果会覆盖前面的规则。') }}<br/>
        {{ __('每个规则左侧为指定匹配上的圣遗物加锁还是解锁、编辑规则、启用规则。中间过滤规则注释可选，用于描述规则实际意义。右侧删除该规则。') }}
        <hr style="border: 2px solid black;"/>
        <div v-for="(filter, index) in store.state.filterBatch" :key="index">
            <el-input v-model="filter.comment" :placeholder="__('过滤规则注释')">
                <template #prepend>
                    <el-select v-model="filter.lock" style="width: 80px;" :style="getcolor(filter.lock)">
                        <el-option :label="__('加锁')" :value="'lock'"> </el-option>
                        <el-option :label="__('解锁')" :value="'unlock'"> </el-option>
                        <el-option :label="__('跳过')" :value="'disabled'"> </el-option>
                    </el-select>
                    <el-button style="margin-left: 10px; margin-right: 0" @click="filter.showFilter = true;"><el-icon><edit-pen /></el-icon></el-button>
                    <el-button style="margin-left: 0" @click="doOneFilter(index)"><el-icon><circle-check-filled /></el-icon></el-button>
                </template>
                <template #append>
                    <el-popconfirm
                        :confirmButtonText="__('确定')"
                        :cancelButtonText="__('算了')"
                        :title="__('真的要删除吗？')"
                        confirmButtonType="danger"
                        @confirm="doDeleteFilterBatch(index)"
                    >
                        <template #reference>
                            <el-button><el-icon><delete-filled /></el-icon></el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-input>
            <artifact-filter-panel
                v-model:show="filter.showFilter"
                v-model:filter="filter.filter"
                :title="filter.comment"
                @update:filter="updateArtifactFilter($event, index)"
                @update:onefilter="doOneFilter(index)"
            />
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button style="float: left;" @click="doAddFilterBatch"><el-icon><plus /></el-icon></el-button>
                <el-button style="float: left; color: green" @click="updateAllFilterLock('lock')">全锁</el-button>
                <el-button style="float: left; color: red;" @click="updateAllFilterLock('unlock')">全解</el-button>
                <el-button style="float: left; color: grey;" @click="updateAllFilterLock('disabled')">全跳</el-button>
                    <el-popconfirm
                        :confirmButtonText="__('确定')"
                        :cancelButtonText="__('算了')"
                        :title="__('真的要删除所有过滤规则吗？')"
                        confirmButtonType="danger"
                        @confirm="doDeleteAllFilter"
                    >
                        <template #reference>
                            <el-button style="float: left;" type="danger">全部删除</el-button>
                        </template>
                    </el-popconfirm>
                <el-button @click="getFilterBatchJSON">{{ __('导出') }}</el-button>
                <el-button @click="showLoadFilterBatchPanel = true;">{{ __('导入') }}</el-button>
                <el-button type="primary" @click="filterBatchStart">{{ __('批量加锁解锁') }}</el-button>
                <el-button  @click="doSave">{{ __('关闭') }}</el-button>
            </span>
        </template>
        <el-dialog :title="__('输入保存数据')" width="400px" :model-value="showLoadFilterBatchPanel" @update:model-value="showLoadFilterBatchPanel = false;">
            <textarea v-model="filterBatchSaveInput" style="width: 100%; height: 100px;"></textarea>
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="showLoadFilterBatchPanel = false; setFilterBatchJSON();">{{ __('确定') }}</el-button>
                    <el-button @click="showLoadFilterBatchPanel = false;">{{ __('取消') }}</el-button>
                </span>
            </template>
        </el-dialog>
    </el-dialog>
</template>

<style lang="scss" scoped>
.artiface-edit-panel {
    position: relative;
    margin-top: -20px;
    // &::v-deep(.el-select) .el-input {
    //     width: 150px;
    // }
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
}
#filter-hint code {
    background-color: rgba(175, 184, 193, 0.2);
    padding: .2em .4em;
    font-size: 85%;
    margin: 0;
    border-radius: 6px;
}
</style>
