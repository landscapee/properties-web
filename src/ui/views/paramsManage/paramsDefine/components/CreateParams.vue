<!--
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2021-04-06 10:06:09
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-23 14:14:00
-->
<template>
    <el-dialog
    :title="`${type==='add'?'创建参数':'编辑参数'}`"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="close"
    :close-on-click-modal='false'
    center>
  <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="collect_form">
       <el-form-item label="参数名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入图层名称"></el-input>
        </el-form-item>
        <el-form-item label="参数编码" prop="code">
            <el-input v-model="form.code"  placeholder="请输入图层编号"></el-input>
        </el-form-item>
         <el-form-item label="参数类型" prop="code">
            <el-input v-model="form.code"  placeholder="请输入图层编号"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
            <el-input v-model="form.description"  placeholder="请输入图层编号"></el-input>
        </el-form-item>
  </el-form>   
  <div slot="footer" class="dialog-footer">
    <el-button @click="close" class="dialog_footer_btn no_box_shadow">取 消</el-button>
    <el-button type="primary" @click="submitForm" class="dialog_footer_btn no_box_shadow">确 定</el-button>
  </div>
</el-dialog>
</template>

<script>
export default {
    name:'CreateLayer',
    data(){
        return {
            dialogVisible:false,
            type:'add',
             form:{
                name:'',
                code:'',
            },
            rules:{
                name: [
                    { required: true, message: '请输入参数名称', trigger: 'blur' },
                ],
                code:[
                    { required: false, message: '请输入图层编号', trigger: 'blur' },
                ]
            }  
        }
    },
    methods:{
        close(){
            this.resetForm()
        },
        submitForm(){
             this.$refs['ruleForm'].validate((valid)=>{
                 if(valid){
                      window.parent.postMessage({
                        id: Date.parse(new Date()),
                        name:this.form.name
                    }, '*');
                 }else{
                     console.error('error')
                 }
             })
        },
        open(obj){
            this.type=obj.type;
            this.dialogVisible=true
        },
        resetForm(){
            this.form=Object.assign({},this.form,{
                name:'',
                code:'',
                description:'',
            })
            this.dialogVisible=false;
            this.$refs['ruleForm'].resetFields();
        },
    }
}
</script>

<style scoped lang='scss'>
</style>