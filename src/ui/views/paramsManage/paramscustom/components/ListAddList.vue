<!--
 * @Author: your name
 * @Date: 2021-06-24 16:40:26
 * @LastEditTime: 2021-09-10 17:07:00
 * @LastEditors: yang fu ren
 * @Description: In User Settings Edit
 * @FilePath: \properties-web\src\ui\views\paramsManage\paramscustom\components\ListAddObject.vue
-->
<template>
    <div class="listAddObject">
        <!--      input  复制辅助-->
        <input style="opacity: 0;position: absolute" ref="copyText" readonly="readonly" :value="coordinatesValue">

        <div class="classifyItems">
            <ul class="classifyItems_box" v-if="categoryOptions.length">
                <li class="item" v-for="(item) in categoryOptions" :key="item.id" @click="handleClickCategory(item)"
                    :class="item.id===categoryId?'classifyActive':''">
                    <span class="classify_content">
                        {{ item.name }}({{ item.code }})
                    </span>
                </li>
            </ul>
            <div style="text-align:center" v-else>暂无数据</div>
        </div>
        <div class="classify_info">
            <div class="title_boxNew">
                <div class="item">

                    <el-input v-model="text" @change="searchChange" clearable>
                        <i style="color:#d2d6e0" slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                    <el-button class="searchbutton" plain type="primary" size="mini" @click="handleSearch"
                               icon="el-icon-search">高级搜索
                    </el-button>
                    <el-button v-if="editable" class="add_btn" type="primary" @click="handleAdd">添加</el-button>
                </div>
            </div>
            <Ftable ref="table" :data="tableData" :tableConfig="tableConfig" :offsetTop="100"
                    @handleSizeChange="handleSizeChange"
                    @handleCurrentChange="handleCurrentChange" @drawOrSee="drawOrSee">
                <el-table-column v-if="editable" slot="operation" :width="150" fixed="right" label="操作" align="center">
                    <span slot-scope="{ row ,$index}" class="operation" v-if="!row._showinput_">
                        <span title="编辑" class="icon_box" @click="handleClickEdit(row,$index)">
                            <icon-svg icon-class="table_edit" class="logo"></icon-svg>
                        </span>
                        <span title="删除" class="icon_box" @click="handleClickDelete(row)">
                            <icon-svg icon-class="table_delate" class="logo"></icon-svg>
                        </span>
                    </span>
                </el-table-column>
            </Ftable>
        </div>
    </div>
</template>

<script>
import requestApi from '@/api/index.js';
import Ftable from '@/components/table';
import Sortable from 'sortablejs';
import DrawMixins from "./drawMixins";
import {map} from "lodash";

export default {
    name: 'ListAddList',
    components: {Ftable},
    props: ['parentId', 'editable', 'sortable', 'paramName','paramsProperties'],
    data() {
        return {
            text: '',
            categoryId: '',
            categoryOptions: [],
            params: {
                size: 10,
                current: 1
            },
            coordinatesValue: null,

            tableData: {
                records: [],
            },
            tableConfig: [
                {type: 'index', label: '序号', align: 'center'},
                {slot: 'operation'},
            ],
            relationData: {}
        }
    },
    mixins: [DrawMixins],

    mounted() {

        this.paramsProperties.forEach((item) => {
            if (item.type === "object" || item.type === "objectList") {
                this.loadRelationData(item);
            }
        });

        let tableConfig = this.paramsProperties.map((item) => {
            if (item.type == "point" || item.type == "polygon" || item.type == "line") {
                return {
                    align: 'center',
                    prop: item.code, minWidth: '95px', label: item.name, event: 'drawOrSee', type: item.type,
                    contrastLayer: item.contrastLayer, contrastLayerAtr: item.contrastLayerAtr,
                    buttons: [{name: '查看', event: 'handleMap1'}, {name: '复制数据', event: 'copyData'}]
                }
            }
            return {
                type: item.type,
                prop: item.code,
                label: item.name,
                formatter: (row, cell, value) => {
                    if (this.relationData[cell]) {
                        if (Array.isArray(value)) {
                            let list = "";
                            for (let i = 0; i < value.length; i++) {
                                if (i > 0) {
                                    list += "、";
                                }
                                list += this.relationData[cell][value[i]];
                            }
                            return list;
                        } else if (this.relationData[cell][value]) {
                            return this.relationData[cell][value];
                        }
                    }
                    return value;
                },
                align: 'center'
            }
        });
        this.tableConfig.push(...tableConfig);
        this.getListParameterFn();
        this.$nextTick(() => {
            this.rowDropTable()
        })
    },
    watch: {
        $route: {
            handler(newRouter) {
                if (newRouter.query.categoryId) {
                    this.categoryId = newRouter.query.categoryId;
                    this.getListParameterFn();
                }
            },
            immediate: true
        }
    },

    methods: {

        searchChange() {
            console.log(1121);
            this.$refs.table.searchData('fuzzy', this.text)
        },
        handleSearch() {
            this.$refs.table.showForm()
        },
        async drawOrSee(item) {
            // item.event 是由 this.tableConfig 赋值的
            if (item.event == 'copyData') {
                this.coordinatesValue = item.value;
                // this.copyData 需要等待元素赋值成功
                await this.$nextTick()
                // this.copyData
                this[item.event](item.value, 'copyText')
            } else {
                // this.handleMap1
                console.log(item, 'table');
                this[item.event]({...item, id: item.index, ChildrenList: true}, true)
            }
        },
        getClassifyData(index, code, type,item) {
            console.log(123, index, code, type, this.tableData);
            let data = [...this.tableData]
            data.splice(index, 1)
            // let properties=this.getProperties(item)
            return this.getGeoJson(data,code,type,item)
        },
        loadRelationData(item) {
            this.$axios.post("/api/param/parameterManage/get?id=" + item.relateObjectId, {}).then(response => {

                let properties = JSON.parse(response.data.data.properties);

                let valueField = null;
                let textField = null;
                properties.forEach((item) => {
                    if (item.isValue) {
                        valueField = item.code;
                    }
                    if (item.isText) {
                        textField = item.code;
                    }
                });

                this.$axios.post("/api/param/parameter-list/get", {
                    parameterId: item.relateObjectId
                }).then(response => {
                    let data = {};
                    response.data.data.forEach((item) => {
                        let itemValue = JSON.parse(item.value);
                        data[itemValue[valueField]] = itemValue[textField];
                    });
                    this.$set(this.relationData, item.code, data);
                });
            });
        },

        //获取表格数据
        async getListParameterCFn() {
            let res = await requestApi.parameterManage.getListParameter({
                method: "post",
                data: {
                    parameterId: this.$route.query.id,
                    parentDataId: this.categoryId
                }
            });
            if (res) {
                this.tableData = res.map((item) => {
                    let value = JSON.parse(item.value);
                    return {
                        deleted: item.deleted,
                        id: item.id,
                        parameterId: item.parameterId,
                        position: item.position,
                        ...value
                    }
                });
            }
        },
        //处理显示字段和值字段
        handleValueAndText(data) {
            console.log(data)
            let value = {isText: '', isValue: ''};
            data.forEach(item => {
                if (item.isText) { //显示字段
                    value['isText'] = item.code
                }
                if (item.isValue) { //值字段
                    value['isValue'] = item.code
                }
            });
            return value
        },
        //获取左侧数据
        async getListParameterFn() {
            let res = await requestApi.parameterManage.getListParameter({
                method: 'post',
                data: {parameterId: this.parentId}
            });
            if (res) {
                //显示字段和值字段
                //let textandvalue=this.handleValueAndText(this.paramsProperties);
                this.categoryOptions = res.map(item => {
                    let value = JSON.parse(item.value);
                    return {
                        deleted: item.deleted,
                        id: item.id,
                        parameterId: item.parameterId,
                        position: item.position,
                        ...value,
                        // name:value[textandvalue['isText']],
                        // value:value[textandvalue['isValue']]
                    }

                });
                //获取右表格数据
                if (this.categoryOptions.length) {
                    if (!this.categoryId) {
                        this.handleClickCategory(this.categoryOptions[0])
                    } else {
                        this.getListParameterCFn();
                    }
                }
            }
        },
        async deleteListParameterFn(id) {

            let res = await requestApi.parameterManage.deleteListParameter({
                method: 'postquery',
                params: {id}
            });
            if (res) {
                this.$message({
                    type: 'success',
                    message: '删除成功'
                })
                this.getListParameterCFn()
            }
        },
        async moveListParameterFn(id, position) {
            let res = await requestApi.parameterManage.moveListParameter({
                method: 'post',
                data: {
                    id,
                    position
                }
            });
            if (res) {
                this.getListParameterCFn()
            }
        },
        rowDropTable() {
            if (this.editable && this.sortable) {
                const ele = document.querySelector('.el-table__body-wrapper tbody');
                const _this = this;
                Sortable.create(ele, {
                    onEnd({newIndex, oldIndex}) {
                        let id = _this.tableData[oldIndex].id;
                        let targetId = _this.tableData[newIndex].id;
                        let position = oldIndex > newIndex ? 'before' : 'after';
                        let oldRow = _this.tableData[newIndex];
                        console.log(oldRow);
                        const currRow = _this.tableData.splice(oldIndex, 1)[0];
                        console.log(currRow)

                        _this.tableData.splice(newIndex, 0, currRow);
                        _this.moveListParameterFn(currRow.id, oldRow.position)
                    },
                });
            }
        },
        handleClickCategory(item) {
            this.text = ''
            this.categoryId = item.id;
            this.getListParameterCFn()
        },
        handleAdd() {
            this.$router.push({
                path: 'addListAddList',
                query: {
                    isEdit: false,
                    parameterId: this.$route.query.id,
                    parentDataId: this.categoryId,
                    properties: [...this.paramsProperties]
                },
            })
        },
        handleClickDelete(row) {
            this.$confirm(`是否删除?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                this.deleteListParameterFn(row.id)
            }).catch((err) => {
                console.log(err)
                this.$message({
                    type: 'info',
                    message: '已取消删除',
                });
            });
        },
        handleClickEdit(row, index) {
            console.log('index', index);
            this.$router.push({
                path: 'addListAddList',
                query: {
                    index,
                    isEdit: true,
                    paramName:this.paramName,
                    parameterId: this.$route.query.id,
                    parentDataId: this.categoryId, ...row,
                    properties: [...this.paramsProperties]
                },
            })
        },
        handleCurrentChange(current) {
            this.params.current = current
        },
        handleSizeChange() {
        }
    }
}
</script>

<style lang="scss" scoped>
.listAddObject {
    display: flex;
    width: 100%;
    height: 100%;
}

.classifyItems {
    width: 280px;
    height: 100%;

    .big_btn {
        width: 100%;
        margin-bottom: 16px;
    }
}

.classifyItems_box {
    .item {
        width: 100%;
        height: 60px;
        padding: 19px 14px;
        margin-bottom: 10px;
        border: 1px solid #c7ccd2;
        border-radius: 6px;
        display: flex;
        line-height: 22px;
        color: #333333;
        font-size: 16px;
        cursor: pointer;

        &:hover {
            background: rgba(56, 118, 230, 0.15);
        }

        span {
            display: inline-block;
        }
    }
}

.classifyActive {
    background: rgba(56, 118, 230, 0.15);

    .operation_icon {
        .point {
            background: #3187ee;
        }
    }
}

.classify_content {
    width: calc(100% - 22px);
    padding-left: 24px;
    position: relative;

    .classify_content_icon {
        width: 16px;
        height: 16px;
        position: absolute;
        left: 0;
    }
}

.classify_info {
    width: calc(100% - 290px);
    margin-left: 10px;
    border: 1px solid #c7ccd2;
    border-radius: 6px;
    padding: 25px;
}
</style>