<!--
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2021-07-07 11:32:05
 * @LastEditors: yang fu ren
 * @LastEditTime: 2021-07-14 09:42:39
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
    name:'addList',
    data(){
        return {
            form:{
                properties:[],
            },
            parameterId:'',
            parentDataId:'',
            id:'',
            isEdit:false,
        }
    },
    mounted(){
        let query=this.$route.query;
        this.parameterId=query.parameterId;
        this.parentDataId=query.parentDataId;
        this.isEdit=query.isEdit;
        if(this.isEdit){
            let row=JSON.parse(query.row);
            this.id=row.id;
            this.form.properties=JSON.parse(row.value)
        }else{
            this.getParameterInfoFn();
        }
        
    },
    methods:{
        async getParameterInfoFn(){
            let res= await requestApi.parameterManage.getParameterInfo({
                method:'postquery',
                params:{id:this.parameterId}
            });
            if(res){
              
                this.paramsType=res.type;
                this.form.properties=JSON.parse(res.properties)
            }
        }, 
        async addListParameterFn(){
            let data={
                parameterId:this.parameterId,
                parentDataId:this.parentDataId,
                value:JSON.stringify(this.form.properties)
            };
           
            let res= await requestApi.parameterManage.addListParameter({
                method:'post',
                data
            });
            if(res){
                this.$message({
                    type:'success',
                    message:'保存成功'
                });
                this.$router.go(-1)
            }
        },
        async updateListParameterFn(){
            let data={
                id:this.id,
                parameterId:this.parameterId,
                parentDataId:this.parentDataId,
                value:JSON.stringify(this.form.properties)
            };
            let res= await requestApi.parameterManage.updateListParameter({
                method:'post',
                data
            })
            if(res){
                this.$message({
                    type:'success',
                    message:'保存成功'
                })
                this.$router.go(-1)
            }
        },
         submitForm(){
            this.$refs['ruleForm'].validate((valid) => {
            if (valid) {
               if(this.isEdit){
                   this.updateListParameterFn()
               }else{
                   this.addListParameterFn()
               }
            } else {
                console.error('error submit!!');
                return false;
            }
            });
        },
    }
}
</script>

<style>

</style>