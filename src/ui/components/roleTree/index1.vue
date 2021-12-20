<template lang="html">
    <el-dialog :close-on-click-modal="false" class="dialog-bindPersion" title="选择角色" center append-to-body :visible.sync="dialogVisible" width="1200px" :before-close="close">
        <div class="contentWrapper">
            <vue-draggable-resizable :w="mw" :z="1002" :min-width="100" :max-width="1170 - 100" :y="0" :x="mx" axis="x" :active="true" :handles="['mr']" :parent="true" :draggable="false" @resizing="mResiz" :preventDeactivation="true">
                <div class="persons">
                    <!--<div class="header">-->
                    <!--未选中1-->
                    <!--<el-button size="mini" native-type="button" @click="selectAll">全选</el-button>-->
                    <!--</div>-->
                    <div class="selectPersonPanel">
                        <Tree :data="resource" :checkedArray="checkedArray" key="1234" :showCheckbox="true" class="resourceTree" ref="resourceTree" @handleCheck="handleCheck" :expand-on-click-node="false" :isShow="isShowResource" :defaultUnCheck="true"> </Tree>
                    </div>
                </div>
            </vue-draggable-resizable>
            <vue-draggable-resizable :w="rw" :z="1000" :min-width="100" :max-width="1170 - 100" :x="rx" :y="0" axis="x" :active="false" :handles="[]" :parent="true" :draggable="false" :preventDeactivation="true">
                <div class="rolePersons">
                    <div class="header">已选中 <el-button size="mini" @click="cancelAll">全部取消</el-button></div>
                    <div class="rolePersonPanel">
                        <Person v-for="person in persons" :isdbClick="true" :person="person" :key="person.id" @select="handleCancel" />
                    </div>
                </div>
            </vue-draggable-resizable>
        </div>
        <div style="text-align:center;margin-top:10px;">
            <el-button style="margin:0 auto;" @click="close">取消</el-button>
            <el-button style="margin:0 auto;" type="primary" @click="save">保存</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import Tree from '../Tree1/index';
    import {    formatTreeData } from '@/common/tools.js';
    import { extend, get, cloneDeep, filter, some, concat, map, each } from 'lodash';
    import Person from './persion.vue';
    import request from '@/utils/request'; // get token from cookie
    export default {
        name: '',
        data() {
            return {
                dialogVisible: false,
                persons: [],
                searchName: '',
                data: [],
                selectId: null,
                selectNode: {},
                type: '',
                mx: 0,
                mw: 600,
                rw: 550,
                rx: 600,
                userId: '',
                resource: [],
                isShowResource: {
                    input: true,
                    tip: false,
                    number: true,
                },
                checkedArray: [], // 选中节点的id数组
            };
        },
        components: {
            Tree,
            Person,
        },
        methods: {
            getTreeAll(d) {
                let that = this;
                let res = [];
                each(d, (i) => {
                    res.push(i);
                    if (i.children) {
                        res = concat(res, that.getTreeAll(i.children));
                    }
                });
                return res;
            },
            handleCheck(data, val) {
                this.persons = val.checkedNodes.filter((item) => item.type == 'ROLE');
            },
            cancelAll() {
                this.persons = [];
                this.$refs.resourceTree.$refs.tree.setCheckedKeys([]);
            },
            selectAll() {
                let allRoles = this.getTreeAll(this.resource);
                this.checkedArray = allRoles.map((item) => item.id);
                this.persons = allRoles.filter((item) => item.type == 'ROLE');
            },
            handleCancel(person) {
                this.persons = filter(this.persons, (p) => p.id != person.id);
                let checkedArray = this.persons.map((item) => item.id);
                this.$refs.resourceTree.$refs.tree.setCheckedKeys(checkedArray);
            },
            handleSelect(person) {
                this.persons.push(person);
            },
            mResiz(left, top, width, height) {
                this.mw = width;
                this.rx = this.mw + this.lw;
                this.rw = 1170 - this.rx;
            },
            lResiz(left, top, width, height) {
                this.lw = width;
                this.mx = width;
                this.mw = 1170 - width - this.rw;
            },
            close() {
                this.checkedArray = [];
                this.dialogVisible = false;
            },
            save() {
                this.$emit('onSelected', this.persons);
                this.close();
            },
            open(row) {
                this.userId = row.id;
                Promise.all([
                    request({
                        url: `/sys/role/getRolesTreeAll`,
                        method: 'get',
                        data:{},
                    }),
                    request({
                        url: `/sys/role/getAllAuthByUserId`,
                        method: 'get',
                        params:{ userId: row.id },
                    })
                ]).then((d) => {
                    let res = formatTreeData(d[0].data);
                    this.resource = res; // 给树赋值
                    this.checkedArray = d[1].data.map((item) => item.id); // 给已选角色选中状态
                    this.persons = d[1].data; // 给已选角色赋值
                    this.dialogVisible = true;
                });
            },
        },
    };
</script>

<style lang="scss">
    .dialog-bindPersion {
        .resourceTree {
            height: 100%;
            // overflow: auto;

            .el-tree {
                height: calc(100% - 50px) !important;
            }
            .el-checkbox {
                position: absolute;
                right: 20px;
            }
        }
        .vdr {
            top: 0 !important;
            border: none!important;
            height: 100%!important;
            .handle-mr {
                margin-top: 0 !important;
                width: 0 !important;
                border: none !important;
                border-right: 1px solid black !important;
                right: -1px !important;
                height: 100%!important;
                background-color: #2b2b2b;
                top: 0!important;
            }
            .scroll {
                height: calc(70vh - 60px) !important;
                overflow-y: auto;
            }
        }
        .contentWrapper {
            position: relative;
            height:580px;
            width: 100%;
            display: flex;
            border: 1px solid black;
            .tree {
            }
            .persons {
                height: 100% !important;
                // overflow: auto;
                .selectPersonPanel {
                    padding: 10px;
                    height: calc(100% - 30px) !important;
                    .el-button {
                        margin-bottom: 10px;
                        margin-right: 10px;
                        & + .el-button {
                            margin-left: 0;
                        }
                    }
                }
            }
            .rolePersons {
                height: 100%;
                overflow: auto;
                .rolePersonPanel {
                    padding: 10px;
                    .el-button {
                        margin-bottom: 10px;
                        margin-right: 10px;
                        & + .el-button {
                            margin-left: 0;
                        }
                    }
                }
            }
            .header {
                height: 30px;
                line-height: 30px;
                text-align: center;
            }
        }
    }
</style>
