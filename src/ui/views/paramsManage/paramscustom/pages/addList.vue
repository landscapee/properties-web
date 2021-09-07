<!--
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2021-07-07 11:32:05
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-03 16:26:37
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
            id:'',
            isEdit:false,
        }
    },
    mounted(){
        let query=this.$route.query;
        this.parameterId=query.parameterId;
        this.isEdit=query.isEdit;
        console.log('tag', this.isEdit)
        if(this.isEdit){
            this.id=query.id;
            //this.form.properties=JSON.parse(query.value);
            this.getParameterInfoFn(JSON.parse(query.value));
        }else{
            this.getParameterInfoFn();
        }
        
    },
    methods:{
        async getParameterInfoFn(data){
            let res= await requestApi.parameterManage.getParameterInfo({
                method:'postquery',
                params:{id:this.parameterId}
            });
            if(res){
                this.paramsType=res.type;
                let objRes= JSON.parse(res.properties);
                if(data){
                    objRes.forEach((item,i) => {
                        data.forEach((citem,j)=>{
                            if(item.code===citem.code){
                                objRes.splice(i,1,citem)
                            }
                        })
                    });
                    this.form.properties=objRes;
                }else{
                    this.form.properties=objRes;
                }
                
                console.log(objRes);
                console.log(data)
            }
        }, 
        async addListParameterFn(){
            let data={
                parameterId:this.parameterId,
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