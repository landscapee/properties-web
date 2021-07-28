<!--
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2021-07-08 10:57:07
 * @LastEditors: yang fu ren
 * @LastEditTime: 2021-07-20 10:46:16
-->
<template>
   <el-form :model="form"  ref="ruleForm" label-width="160px" class="collect_form">
        <el-form-item 
        :label="item.name" 
        v-for="(item,index) in form.properties" 
        :key="index"
        :prop="'properties.' + index + '.value'"
        :rules="[
            { required: true, message: '请输入', trigger: 'blur' },
            ]"
        >
            <el-input v-model="item.value"  placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="">
            <el-button type="primary" @click="submitForm" class="dialog_footer_btn no_box_shadow">提 交</el-button>
        </el-form-item>
    </el-form>  
</template>

<script>
import requestApi from '@/api/index.js';
export default {
    name:'addTree',
    data(){
        return {
            form:{
                properties:[],
                pid:'',
                parameterId:'',
                parentDataId:'',
            },
            rules:{},
            }
    },
    mounted(){
        let query=this.$route.query;
        this.form.properties=JSON.parse(query.properties).map((item)=>{
            return {
                name:item.name,
                code:item.code,
                type:item.type,
                isText:item.isText,
                isValue:item.isValue,
                value:item.value||''
            }
        });
        this.form.properties.forEach((item)=>{
            item.value=''
        })
        this.form.pid=query.pid||'';
        this.form.parameterId=query.parameterId||'';
        this.form.parentDataId=query.parentDataId||'';
    },
    methods:{
        async addTreeParameterFn(){
            let data={
                parameterId:this.form.parameterId,
                parentDataId:this.form.parentDataId,
                value:JSON.stringify(this.form.properties),
                pid:this.form.pid,
            }
            if(!data.pid){
                delete data.pid
            }
            let res= await requestApi.parameterManage.addTreeParameter({
                method:'post',
                data
            });
            if(res){
                this.$message({
                    type:"success",
                    message:'保存成功'
                });
                this.$router.go(-1)
            }
        },
        submitForm(){
            this.$refs['ruleForm'].validate((valid) => {
            if (valid) {
               this.addTreeParameterFn();
            } else {
                console.error('error submit!!');
                return false;
            }
            });
        }
    }
}
</script>

<style>

</style>