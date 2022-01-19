<!--
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2021-06-01 14:44:39
 * @LastEditors: yang fu ren
 * @LastEditTime: 2021-10-25 14:37:15
-->
<template>
    <div class="createParams">
        <p class="page_header">{{ isEdit ? '编辑参数' : '创建参数' }}</p>
        <div class="page_content">
            <el-form :model="form" :rules="rules" ref="ruleForm" label-width="160px" class="collect_form">
                <el-form-item label="参数名称" prop="name">
                    <el-input v-model="form.name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="参数编码" prop="code">
                    <el-input v-model="form.code" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="参数类型" prop="type">
                    <el-select v-model="form.type" placeholder="请选择" @change="changeType">
                        <el-option
                            v-for="item in paramsList"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="参数权限：" >
                    <el-button @click="userOpen('role')" size="mini" icon="el-icon-plus">选择角色</el-button>
                    <div class="tagBox">
                        <el-scrollbar style="height:100px">
                            <el-tag :key="tag.code" v-for="(tag,index) in roles" closable :disable-transitions="false" @close="handleClose(index)">
                                {{ tag.name }}
                            </el-tag>
                        </el-scrollbar>
                    </div>
                </el-form-item>

                <el-form-item label="参数属性" prop="properties2" v-if="form.type==='TEXT'">
                    <el-select v-model="form.properties2" placeholder="请选择">
                        <el-option label="文本" value="text"></el-option>
                        <el-option label="数组" value="list"></el-option>
                        <el-option label="IP" value="ip"></el-option>
                        <el-option label="真假" value="boolean"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="参数属性" prop="properties" v-else>
                    <el-row>
                        <el-col :span="2" style="margin-right: 5px;font-size:16px">属性名称</el-col>
                        <el-col :span="2" style="margin-right: 5px;font-size:16px">属性编码</el-col>
                        <el-col :span="5" style="margin-right: 5px;font-size:16px">属性类型</el-col>
                        <el-col :span="5" style="margin-right: 5px;font-size:16px">参考图层</el-col>
                        <el-col :span="2" style="margin-right: 5px;font-size:16px;text-align:center">是否必填</el-col>
                        <el-col :span="2" style="margin-right: 5px;font-size:16px;text-align:center">展示字段</el-col>
                        <el-col :span="2" style="margin-right: 5px;font-size:16px;text-align:center">值字段</el-col>
                    </el-row>
                    <el-row v-for="(item,index) in form.properties" :key="index">
                        <el-col :span="2" style="margin-right: 5px">
                            <el-input v-model="item.name" placeholder="请输入"></el-input>
                        </el-col>
                        <el-col :span="2" style="margin-right: 5px">
                            <el-input v-model="item.code" placeholder="请输入"></el-input>
                        </el-col>
                        <el-col :span="5" style="margin-right: 5px;display:flex">
                            <el-select v-model="item.type" placeholder="请选择" style="width:50%">
                                <el-option label="文本" value="text"></el-option>
                                <el-option label="布尔" value="bool"></el-option>
                                <el-option label="参数" value="object"></el-option>
                                <el-option label="参数列表" value="objectList"></el-option>
                                <el-option label="地图点" value="point"></el-option>
                                <el-option label="地图线" value="line"></el-option>
                                <el-option label="地图面" value="polygon"></el-option>
                            </el-select>
                            <el-select style="width:50%" v-if="item.type==='objectList'||item.type==='object'"
                                       v-model="item.relateObjectId" placeholder="请选择">
                                <el-option :label="relateObject.name" :value="relateObject.id"
                                           v-for="relateObject in relateObjectLists" :key="relateObject.id"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="5" style="margin-right: 5px">
                            <div style="min-height: 20px">
                                <el-select v-show="showContrastLayer(item)" v-model="item.contrastLayer" clearable
                                           @change="hChange(item)"
                                           placeholder="请选择" style="width:49%">
                                    <el-option :label="relateObject.name" :value="relateObject.id"
                                               v-for="relateObject in relateObjectLists"
                                               :key="relateObject.id"></el-option>

                                </el-select>
                                <el-select style="width:49%" v-show="item.contrastLayer" v-model="item.contrastLayerAtr"
                                           clearable
                                           placeholder="请选择">
                                    <el-option :label="relateObject.name+'('+relateObject.code+')'"
                                               :value="relateObject.endValue"
                                               v-for="relateObject in getcontrastLayerAtrList(item.contrastLayer)"
                                               :key="relateObject.code"></el-option>
                                </el-select>
                            </div>
                        </el-col>
                        <el-col :span="2" style="margin-right: 5px;text-align:center">
                            <el-checkbox v-model="item.isRequired"></el-checkbox>
                        </el-col>
                        <el-col :span="2" style="margin-right: 5px;text-align:center">
                            <el-checkbox v-model="item.isText" @change="changIsText(index)"></el-checkbox>
                        </el-col>
                        <el-col :span="2" style="margin-right: 5px;text-align:center">
                            <el-checkbox v-model="item.isValue" @change="changIsValue(index)"></el-checkbox>
                        </el-col>
                        <el-col :span="3">
                            <span class="operation_icon"><i @click="handleOperation('upload',index)"
                                                            class="el-icon-upload2"></i></span>
                            <span class="operation_icon"><i @click="handleOperation('download',index)"
                                                            class="el-icon-download"></i></span>
                            <span class="operation_icon"><i @click="handleOperation('remove',index)"
                                                            class="el-icon-remove-outline"></i></span>
                            <span class="operation_icon"><i @click="handleOperation('add',index)"
                                                            class="el-icon-circle-plus-outline"></i></span>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="上级参数" prop="parentId"
                              v-if="form.type==='SUB_OBJECT'||form.type==='SUB_LIST'||form.type==='TREE_LIST'">
                    <el-select v-model="form.parentId" placeholder="请选择">
                        <el-option v-for="(item) in parentList" :label="item.name" :value="item.id"
                                   :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="高级特征">
                    <el-checkbox-group v-model="form.type">
                    <el-checkbox label="任意回滚" name="type"></el-checkbox>
                    <el-checkbox label="多版本" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item> -->
                <el-form-item label="允许编辑">
                    <el-checkbox v-model="form.editable"></el-checkbox>
                </el-form-item>
                <el-form-item label="允许排序">
                    <el-checkbox v-model="form.sortable"></el-checkbox>
                </el-form-item>
                <el-form-item label="参数描述">
                    <el-input v-model="form.comment" placeholder="请输入参数描述" type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-button type="primary" @click="submitForm" class="dialog_footer_btn no_box_shadow">提 交
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <roleTree ref="roleBox"  @onSelected="handleRoleSelected"></roleTree>

    </div>

</template>

<script>
import requestApi from '@/api/index.js';
import {cloneDeep, map, filter} from 'lodash';
import request from '@/utils/request'; // get token from cookie
import roleTree from '@/components/roleTree/index';

export default {
    name: 'createParams',
    data() {
        var validatorParentId = (rule, value, callback) => {
            if (this.form.type === 'SUB_OBJECT' || this.form.type === 'SUB_LIST') {
                if (!value) {
                    callback(new Error('请选择'));
                } else {
                    callback()
                }
            } else {
                callback()
            }
        };
        var validatorProperties = (rule, value, callback) => {
            if (this.form.type !== 'TEXT') {
                for (let i = 0; i < value.length; i++) {
                    if (!value[i].name) {
                        callback(new Error('请输入属性名'));
                        return false
                    }
                    if (!value[i].code) {
                        callback(new Error('请输入编码'));
                        return false
                    }
                    if (!value[i].type) {
                        callback(new Error('请选择类型'));
                        return false
                    }
                }
                callback()
            } else {
                callback()
            }
        }
        var validatorProperties2 = (rule, value, callback) => {
            if (this.form.type == 'TEXT') {
                if (!value) {
                    callback(new Error('请选择'));
                } else {
                    callback()
                }
            } else {
                callback()
            }
        }
        return {
            roleList: [],
            roleListObj:{},
            paramsId: '',
            isEdit: false,
            roles:[],
            parentList: [],
            parentOptions: [],
            checked: '',
            relateObjectLists: [], //关联对象list
            // contrastLayerList:[],
            contrastLayerAtrListObj: {},
            contrastLayerListObj: {},
            paramsList: [
                {name: '单值', code: 'TEXT'},
                {name: '对象', code: 'OBJECT'},
                {name: '列表', code: 'LIST'},
                {name: '树型', code: 'TREE'},
                {name: '树型子列表', code: 'TREE_LIST'},
                {name: '列表子对象', code: 'SUB_OBJECT'},
                {name: '列表子列表', code: 'SUB_LIST'}
            ],
            form: {
                systemId: localStorage.getItem('projectId'),
                name: '',
                type: 'OBJECT',
                properties: [
                    {name: '', code: '', type: '', isText: true, isValue: true, relateObjectId: '', isRequired: false,}
                ],
                properties2: '',
                comment: '',
                parentId: '',
                editable: true,
                sortable: true,
            },
            fileList: [],
            rules: {
                name: [
                    {required: true, message: '请输入', trigger: 'change'},
                ],
                code: [
                    {required: true, message: '请输入', trigger: 'change'},
                ],
                type: [
                    {required: true, message: '请输入', trigger: 'change'},
                ],
                parentId: [
                    {required: true, trigger: 'change', validator: validatorParentId},
                ],
                properties: [
                    {required: true, trigger: 'change', validator: validatorProperties},
                ],
                properties2: [
                    {required: true, trigger: 'change', validator: validatorProperties2},
                ]
            }
        }
    },
    components:{roleTree},
    mounted() {
        let query = this.$route.query;
        if (query.data) { //编辑
            let data = JSON.parse(query.data);
            this.paramsId = data.id;
            this.isEdit = true;
            this.form = {...data, permission1: [],
                comment: data.comment,
                parentId: data.parentId || '',
            }

            if (data.type === 'TEXT') {
                this.form = Object.assign({}, this.form, {
                    properties2: JSON.parse(data.properties)[0].type,
                })
            } else {
                this.form = Object.assign({}, this.form, {
                    properties: JSON.parse(data.properties),
                 })
            }

        } else {
            this.isEdit = false;
        }
        console.log(this.form);
        this.parentOptionsFn();
        this.getRelateObjectFn();
        this.getAllRoles()
    },
    computed: {
        showContrastLayer() {
            return (row) => {
                let obj = {point: 1, line: 1, polygon: 1,}
                return obj[row.type]
            }
        },
        getcontrastLayerAtrList() {
            return (id) => {
                return this.contrastLayerAtrListObj[id]
            }
        }
    },
    methods: {

        getAllRoles() {
            let hostname = window.location.hostname
            if (hostname.indexOf('localhost') >= 0) {
                hostname = '173.100.1.152'
            }

            let url = `http://${hostname}:8099/api/sys/role/findAllWithPage?pageNum=1&pageSize=1000 `
            request({
                methods: 'get',
                url,
            }).then((d) => {
                // console.log(1221214567/,d);
                // this.roleList = d.data.list
                map( d.data.list,k=>{
                    this.roleListObj[k.code]=k
                })
                if(this.form.permission){
                    let arr=this.form.permission.split(',')
                    this.roles= map(arr,k=>{
                        return this.roleListObj[k]
                    })

                }
                console.log('this.roles',this.roles);
            })

        },
        hChange(item) {
            this.$set(item, 'contrastLayerAtr', '')
        },
        getContrastLayerAtr(id) {
            let transObj = {
                point: "point",
                line: "lineString",
                polygon: "polygon",
            }
            this.contrastLayerAtrListObj[id] = []
            let arr = JSON.parse(this.contrastLayerListObj[id]) || []
            this.contrastLayerAtrListObj[id] = filter(arr, k => {
                k.endValue = k.code + '$_$' + k.type
                return transObj[k.type]
            })


        },
        async getRelateObjectFn() {
            let res = await requestApi.parameterManage.getRelateObject({
                method: "postquery",
                params: {systemId: this.form.systemId}
            });
            if (res) {
                // console.log(1122,res);
                this.relateObjectLists = res;
                map(res, k => {
                    this.contrastLayerListObj[k.id] = k.properties
                    this.getContrastLayerAtr(k.id)
                })
            }
        },
        async parentOptionsFn() {
            let res = await requestApi.parameterManage.parentOptions({
                method: 'postquery',
                params: {systemId: this.form.systemId}
            });
            if (res) {
                 this.parentOptions = res
                if (this.form.type === 'SUB_OBJECT' || this.form.type === 'SUB_LIST') {
                    this.parentList = this.parentOptions['LIST']
                } else if (this.form.type === 'TREE_LIST') {
                    this.parentList = this.parentOptions['TREE']
                }
            }
        },
        async addFn() {
            let data = {
                ...this.form,
                permission:this.getPermission(),
                classifyId: this.$route.query.classifyId
            };
            if (this.form.type === 'TEXT') {
                data.properties = [{name: '', code: '', type: data.properties2}]
            }
            ;
            if (!data.parentId) {
                delete data.parentId
            }
            data.properties = JSON.stringify(data.properties);
            delete data.properties2;

            let res = await requestApi.parameterManage.add({
                method: "post",
                data
            });
            if (res) {
                if (res === true) {
                    this.$message({
                        type: "success",
                        message: '保存成功'
                    })
                    this.$router.go(-1);
                    window.parent.postMessage({
                        state: 'success'
                    }, '*');
                } else {
                    this.$message({
                        type: "warning",
                        message: res
                    })
                }

            }
        },
        async updateFn() {
            let data = {
                id: this.paramsId,
                ...this.form,
                permission:this.getPermission(),
                classifyId: this.$route.query.classifyId
            }
            if (this.form.type === 'TEXT') {
                data.properties = [{name: '', code: '', type: data.properties2}]
            }
            ;
            if (!data.parentId) {
                delete data.parentId
            }
            data.properties = JSON.stringify(data.properties);
            delete data.properties2;
            let res = await requestApi.parameterManage.update({
                method: 'post',
                data
            });
            if (res) {
                if (res === true) {
                    this.$message({
                        type: "success",
                        message: '保存成功'
                    })
                    this.$router.go(-1);
                    window.parent.postMessage({
                        state: 'success'
                    }, '*');
                } else {
                    this.$message({
                        type: "warning",
                        message: res
                    })
                }

            }
        },
        changeType() {
            this.form.parentId = '';
            if (this.form.type === 'SUB_OBJECT' || this.form.type === 'SUB_LIST') {
                this.parentList = this.parentOptions['LIST']
            } else if (this.form.type === 'TREE_LIST') {
                this.parentList = this.parentOptions['TREE']
            }

        },
        changIsText(index) {
            this.form.properties.forEach((item, i) => {
                if (i !== index) {
                    item.isText = false
                }
            })
        },
        changIsValue(index) {
            this.form.properties.forEach((item, i) => {
                if (i !== index) {
                    item.isValue = false
                }
            })
        },
        tipsMessage(message) {
            return this.$message({
                type: 'warning',
                message: message,
            });
        },
        handleOperation(type, index) {
            if (type !== 'remove') {
                let currentData = this.form.properties[index];
                if (!currentData.name) {
                    this.tipsMessage('请输入列名称');
                    return false;
                }
                if (!currentData.code) {
                    this.tipsMessage('请输入列编号');
                    return false;
                }
                if (!currentData.type) {
                    this.tipsMessage('请选择列数据类型');
                    return false;
                }
            }
            if (type === 'add') {
                this.form.properties.splice(index + 1, 0, {
                    name: '',
                    code: '',
                    type: '',
                    isText: false,
                    isValue: false,
                    relateObjectId: '',
                    contrastLayer: '',
                    contrastLayerAtr: '',
                    isRequired: false,
                })
            } else if (type === 'remove') {
                if (this.form.properties.length > 1) {
                    this.form.properties.splice(index, 1)
                }
            } else if (type === 'upload') {
                if (index !== 0) {
                    let currentData = cloneDeep(this.form.properties[index]);
                    this.form.properties.splice(index, 1);
                    this.form.properties.splice(index - 1, 0, currentData)
                }
            } else if (type === 'download') {
                if (index !== this.form.properties.length - 1) {
                    let currentData = cloneDeep(this.form.properties[index]);
                    this.form.properties.splice(index, 1);
                    this.form.properties.splice(index + 1, 0, currentData)
                }
            }
        },
        getPermission(){
            let arr=map(this.roles,k=>{
                return k.code
            })
            return  arr.join(',')
        },
        submitForm() {
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    if (!this.form.systemId) {
                        this.$message({
                            type: "warning",
                            message: '请选择对应的系统'
                        });
                        return false;
                    }
                    if (this.isEdit) {
                        this.updateFn()
                    } else {
                        this.addFn();
                    }
                } else {
                    console.error('error submit!!');
                    return false;
                }
            });
        },
        userOpen( ){
            this.$refs.roleBox.open(this.roles||[]);
        },
        handleClose(index) {
            this.roles.splice(index,1)
        },
        handleRoleSelected(roles){
            this.roles =  map(roles,(item) => ({ code: item.code, name: item.name }));
        },

    }
}
</script>

<style lang="scss" scoped>
.operation_icon {
    /deep/ .el-icon-circle-plus-outline, .el-icon-remove-outline, .el-icon-upload2, .el-icon-download {
        cursor: pointer;
        font-size: 30px;
        vertical-align: middle;
    }
}

.createParams {
    width: 100%;
    height: 100%;
}

.page_header {
    width: 100%;
    box-sizing: border-box;
    height: 32px;
    //background: linear-gradient(135deg,#4181E9 10%);
    background: linear-gradient(135deg,
        #4181E9 174px,
        #ffffff 174px, #ffffff 176px,
        #7aa6ef 176px, #7aa6ef 184px,
        #ffffff 184px, #ffffff 186px,
        #b3cdf6 186px, #b3cdf6 190px,
        #ffffff 190px, #ffffff 192px,
        #eaf4ff 192px, #eaf4ff 100%
    );

    color: #ffffff;
    font-size: 16px;
    line-height: 32px;
    border-radius: 6px 0px 0px 0px;
    padding-left: 52px;
}

.page_content {
    margin-top: 26px;
    width: 1400px;
}

.service {
    .el-checkbox {
        margin-top: 10px;
    }
}

.collect_form .fileUpload {
    /deep/ .el-form-item__content {
        line-height: 40px;
    }
}

.file-txt {
    text-align: left;
}
.tagBox{

    border:1px solid #DCDFE6;
    margin: 0!important;
}
/deep/ .el-scrollbar__view{
    padding: 0 5px;
    .el-tag{
        margin-right: 5px;
        margin-top: 5px;
    }
}
</style>

