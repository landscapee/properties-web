<!--
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2021-09-03 17:10:40
 * @LastEditors: yang fu ren
 * @LastEditTime: 2021-09-07 16:53:28
-->
<template>
    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="collect_form">
        <el-form-item label="分类名称" prop="name">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="" >
            <el-button @click="close" class="dialog_footer_btn no_box_shadow">取 消</el-button>
            <el-button type="primary" @click="submitForm" class="dialog_footer_btn no_box_shadow">确 定</el-button>
        </el-form-item>
    </el-form> 
</template>
<script>
import requestApi from '@/api/index.js';
export default {
   name:'createClassify',
   data(){
       return {
           form:{
               name:'',
               parentId:'',
               id:'',
            //    systemId:localStorage.getItem('projectId'),
            //    position:'',
           },
           type:"add",
            rules:{
                 name: [
                    { required: true, message: '请输入分类名称', trigger: 'blur' },
                    // { min: 3, max: 5, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
            }
       }
   },
   mounted(){
       let query=this.$route.query;
       this.form=Object.assign({},this.form,query);
       if(query.type){
           this.type=query.type
       }
       console.log(query)
   },
   methods:{
       async createClassifyFn(){
           let data={
               name:this.form.name,
               parentId:this.form.parentId,
               systemId:localStorage.getItem('projectId'),
           };
           if(!data.parentId){
               delete data.parentId
           }
           let res = await requestApi.system.save({
               method:"post",
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
       async updateClassifyFn(){
            let data={
               name:this.form.name,
               parentId:this.form.parentId,
               id:this.form.id,
               systemId:localStorage.getItem('projectId'),
           }
           if(!data.parentId){
               delete data.parentId
           }
           let res= await  requestApi.system.update({
               method:'post',
               data
           });
           if(res){
                this.$message({
                    type:"success",
                    message:'编辑成功'
               });
               this.$router.go(-1)
           }
       },
       submitForm(){
           this.$refs['ruleForm'].validate((valid) => {
            if (valid) {
                console.log(this.type)
                if(this.type==='add'){
                    this.createClassifyFn()
                }else if(this.type==='edit'){
                    this.updateClassifyFn()
                }
               
                
            } else {
                console.log('error submit!!');
                return false;
            }
            });
       },
       close(){
           this.$router.go(-1)
       },
   }
}
</script>

<style scoped>

</style>