<!--
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2021-04-08 10:08:25
 * @LastEditors: yang fu ren
 * @LastEditTime: 2021-09-10 14:54:58
-->
<template>
    <div style="height:100%;width:100%">
        <!--      input  复制辅助-->
        <input style="opacity: 0;width:10px;position: absolute" ref="copyText" readonly="readonly" :value="coordinatesValue">
        <div  class="title_boxNew">
            <div class="item">

                <el-input v-model="text" @change="searchChange" clearable>

                    <i style="color:#d2d6e0" slot="prefix" class="el-input__icon el-icon-search"></i>

                </el-input>
                <el-button class="searchbutton" plain type="primary" size="mini" @click="handleSearch" icon="el-icon-search">高级搜索</el-button>
                <el-button v-if="editable" class="add_btn" type="primary" @click="handleAdd">添加</el-button>
            </div>
        </div>
        <Ftable ref="table" :data="tableData" :tableConfig="tableConfig" :offsetTop="47" @handleCurrentChange="handleCurrentChange"
                @drawOrSee="drawOrSee">
            <el-table-column v-if="editable" slot="operation" :width="150" fixed="right" label="操作" align="center">
              <span slot-scope="{ row }" class="operation"  v-if="!row._showinput_">
                   <span title="编辑" class="icon_box" @click="handleClickEdit(row)">
                    <icon-svg icon-class="table_edit" class="logo"></icon-svg>
                  </span>
                  <span title="删除" class="icon_box" @click="handleClickDelete(row)">
                      <icon-svg icon-class="table_delate" class="logo"></icon-svg>
                  </span>
              </span>
            </el-table-column>
        </Ftable>
    </div>
</template>

<script>
import requestApi from '@/api/index.js';
import Ftable from '@/components/table';
import Sortable from 'sortablejs';
import DrawMixins from './drawMixins'
import {map} from "lodash";

export default {
    name: 'List',
    components: {Ftable},
    props: ['editable','sortable','paramName', 'paramsProperties'],
    data() {
        return {
            key: '',
            text: '',
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
                // {prop:"name",label:"名称"},
                // {prop:"code",label:"编码"},
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

        console.log(this.paramsProperties)
        let tableConfig = this.paramsProperties.map((item) => {
            if (item.type == "point" || item.type == "polygon" || item.type == "line") {
                return {
                    prop: item.code,minWidth:'95px',  label: item.name,
                    contrastLayer:item.contrastLayer,contrastLayerAtr:item.contrastLayerAtr,
                    event: 'drawOrSee', type: item.type, align: 'center',
                    buttons: [{name: '查看', event: 'handleMap1'}, {name: '复制数据', event: 'copyData'}]
                }
            }
            return {
                prop: item.code,
                label: item.name,
                type:item.type,
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
    methods: {

        searchChange(){
            this.$refs.table.searchData('fuzzy',this.text)
        },
        handleSearch(){
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
                this[item.event](item, true)
            }
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
                    console.log("---loadRelationData---");
                    console.log(this.relationData);
                });
            });
        },
        async getListParameterFn() {
            let res = await requestApi.parameterManage.getListParameter({
                method: 'post',
                data: {parameterId: this.$route.query.id}
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
        async deleteListParameter(id) {
            let res = await requestApi.parameterManage.deleteListParameter({
                method: 'postquery',
                params: {id}
            });
            if (res) {
                this.$message({
                    type: "success",
                    message: '删除成功'
                })
                this.getListParameterFn()
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
                this.getListParameterFn()
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
        handleAdd() {
            this.$router.push({
                path: 'addList',
                query: {isEdit: false, parameterId: this.$route.query.id, properties: [...this.paramsProperties]},
            })
        },
        handleClickDelete(row) {
            this.$confirm(`是否删除?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    this.deleteListParameter(row.id)
                })
                .catch((err) => {
                    console.log(err)
                    this.$message({
                        type: 'info',
                        message: '已取消删除',
                    });
                });
        },
        handleClickEdit(row) {
            this.$router.push({
                path: 'addList',
                query: {
                    isEdit: true,
                    paramName:this.paramName,
                    parameterId: this.$route.query.id, ...row,
                    properties: [...this.paramsProperties]
                },
            })
        },
        handleCurrentChange(current) {
            this.params.current = current
        },
    }
}
</script>

<style>

</style>