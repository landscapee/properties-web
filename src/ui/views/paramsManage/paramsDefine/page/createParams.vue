<!--
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2021-06-01 14:44:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-02 10:32:56
-->
<template>
    <div class="createParams">
        <p class="page_header">创建参数</p>
        <div class="page_content">
            <el-form :model="form" :rules="rules" ref="ruleForm" label-width="160px" class="collect_form">
                <el-form-item label="参数名称" prop="name">
                    <el-input v-model="form.name"  placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="参数编码" prop="code">
                    <el-input v-model="form.code"  placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="参数类型" prop="type">
                    <el-select v-model="form.type" placeholder="请选择">
                        <el-option
                            v-for="item in paramsList"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item> 
                <el-form-item label="数据类型" prop="type1">
                    <el-select v-model="form.type1" placeholder="请选择">
                        <el-option label="文本" value="text"></el-option>
                        <el-option label="数组" value="list"></el-option>
                        <el-option label="IP" value="ip"></el-option>
                        <el-option label="真假" value="boolean"></el-option>
                    </el-select>
                </el-form-item> 
                <el-form-item label="参数属性">
                    <el-row >
                        <el-col :span="6" style="margin-right: 5px;font-size:16px">属性名称</el-col>
                        <el-col :span="6" style="margin-right: 5px;font-size:16px">属性编码</el-col>
                        <el-col :span="6" style="margin-right: 5px;font-size:16px">属性类型</el-col>
                    </el-row>
                    <el-row v-for="(item,index) in form.properties">
                        <el-col :span="6" style="margin-right: 5px">
                            <el-input v-model="item.name"  placeholder="请输入"></el-input>
                        </el-col>
                        <el-col :span="6" style="margin-right: 5px">
                            <el-input v-model="item.code"  placeholder="请输入"></el-input>
                        </el-col>
                        <el-col :span="6" style="margin-right: 5px">
                            <el-select v-model="item.type" placeholder="请选择">
                                <el-option label="文本" value="text"></el-option>
                                <el-option label="数组" value="list"></el-option>
                                <el-option label="IP" value="ip"></el-option>
                                <el-option label="真假" value="boolean"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="5" >
                            <span class="operation_icon" ><i @click="handleOperation('upload',index)" class="el-icon-upload2"></i></span>
                            <span class="operation_icon" ><i @click="handleOperation('download',index)" class="el-icon-download"></i></span>
                            <span class="operation_icon" ><i @click="handleOperation('remove',index)" class="el-icon-remove-outline"></i></span>
                            <span class="operation_icon" ><i @click="handleOperation('add',index)" class="el-icon-circle-plus-outline"></i></span>
                        </el-col>
                    </el-row>
                </el-form-item>    
                <!-- <el-form-item label="高级特征">
                    <el-checkbox-group v-model="form.type">
                    <el-checkbox label="任意回滚" name="type"></el-checkbox>
                    <el-checkbox label="多版本" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item> -->
                <el-form-item label="参数描述">
                    <el-input v-model="form.comment"  placeholder="请输入参数描述" type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="" >
                    <el-button type="primary" @click="submitForm" class="dialog_footer_btn no_box_shadow">提 交</el-button>
                </el-form-item>
            </el-form>   
        </div>
    </div>
  
</template>

<script>
import requestApi from '@/api/index.js';
import {cloneDeep} from 'lodash';
// import { getUserInfo } from '@/util/auth'; // get token from cookie
export default {
    name:'createParams',
    data(){
        return { 
            paramsList:[
                {name:'单值',code:'TEXT'},
                {name:'对象',code:'OBJECT'},
                {name:'列表',code:'LIST'},
                {name:'树型子对象',code:'TREE_OBJECT'},
                {name:'树型子列表',code:'TREE_LIST'},
                {name:'子对象',code:'SUB_OBJECT'},
                {name:'子列表',code:'SUB_LIST'}
                ],
            form:{
                systemId:'',
                parentId:localStorage.getItem('projectId'),
                name:'',
                type:'',
                type1:'',
                properties:[
                    {name:'',code:'',type:''}
                ],
                comment:'',
                position:'',
            },
            fileList:[],
             rules:{
                name: [
                    { required: true, message: '请输入', trigger: 'change' },
                ],
                code: [
                    { required: true, message: '请输入', trigger: 'change' },
                ],
                type: [
                    { required: true, message: '请输入', trigger: 'change' },
                ],
            }  
        }
    },
    mounted(){
       // this.findAllProjectsFn();
    },
    methods:{
        async addFn(){
            let data={
                ...this.form
            };
            data.properties=JSON.stringify(data.properties);
            console.log(data)
            let res=await requestApi.parameterManage.add({
                method:"post",
                data
            });
            if(res){
                this.$message({
                    type:"success",
                    message:'保存成功'
                })
                this.$router.go(-1)
            }
        },
        tipsMessage(message) {
			return this.$message({
				type: 'warning',
				message: message,
			});
		},
        handleOperation(type,index){
            if(type!=='remove'){
                let currentData=this.form.properties[index];
                if(!currentData.name){
                this.tipsMessage('请输入列名称');
				return false;
                }
                if(!currentData.code){
                    this.tipsMessage('请输入列编号');
                    return false;
                }
                if(!currentData.type){
                    this.tipsMessage('请选择列数据类型');
                    return false;
                }
            }
            if(type==='add'){
                this.form.properties.splice(index+1,0,{name:'',code:'',type:''})    
            }else if(type==='remove'){
                if(this.form.properties.length>1){
                    this.form.properties.splice(index,1)
                }
            }else if(type==='upload'){
                if(index!==0){
                    let currentData=cloneDeep(this.form.properties[index]);
                    this.form.properties.splice(index,1);
                    this.form.properties.splice(index-1,0,currentData) 
                }
            }else if(type==='download'){
                if(index!==this.form.properties.length-1){
                    let currentData=cloneDeep(this.form.properties[index]);
                    this.form.properties.splice(index,1);
                    this.form.properties.splice(index+1,0,currentData) 
                }
            }
        },
        submitForm(){
            window.parent.postMessage({
                id: Date.parse(new Date())+'paramsType'+this.form.type,
                name:this.form.name,
            }, '*');
            this.$refs['ruleForm'].validate((valid) => {
            if (valid) {
                this.addFn()
            } else {
                console.error('error submit!!');
                return false;
            }
            });
        },
       
    }
}
</script>

<style lang="scss" scoped>
 .operation_icon{
        /deep/.el-icon-circle-plus-outline,.el-icon-remove-outline,.el-icon-upload2,.el-icon-download{
            cursor: pointer;
            font-size: 30px;
            vertical-align: middle;
        }
    }
.createParams{
    width: 100%;
    height: 100%;
}
.page_header{
    width: 100%;
    box-sizing: border-box;
    height: 32px;
    //background: linear-gradient(135deg,#4181E9 10%);
    background: linear-gradient(135deg,
    #4181E9 174px,
    #ffffff 174px,#ffffff 176px,
    #7aa6ef 176px,#7aa6ef 184px,
    #ffffff 184px,#ffffff 186px,
    #b3cdf6 186px,#b3cdf6 190px,
    #ffffff 190px,#ffffff 192px,
    #eaf4ff 192px,#eaf4ff 100%
    );
   
    color: #ffffff;
    font-size: 16px;
    line-height: 32px;
    border-radius: 6px 0px 0px 0px;
    padding-left: 52px;
}
.page_content{
    margin-top:26px;
    width: 800px;
}
.service{
    .el-checkbox{
        margin-top: 10px;
    }
}
.collect_form .fileUpload {
    /deep/.el-form-item__content{
        line-height: 40px;
    }
}
.file-txt{
    text-align: left;
}
</style>

