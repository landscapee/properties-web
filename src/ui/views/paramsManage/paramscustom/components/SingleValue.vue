<!--
 * @Author: your name
 * @Date: 2021-06-24 15:59:44
 * @LastEditTime: 2021-09-10 15:51:21
 * @LastEditors: yang fu ren
 * @Description: In User Settings Edit
 * @FilePath: \properties-web\src\ui\views\paramsManage\paramscustom\components\SingleValue.vue
-->
<template>
  <el-form :model="form"  ref="ruleForm" label-width="160px" class="collect_form">
    <el-form-item label="" 
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
import {cloneDeep}  from 'lodash';
import requestApi from '@/api/index.js';
export default {
  name: 'SingleValue',
  props:['paramsProperties'],
  data() { 
    return {
        form:{
          properties:[],
          id:'',
        },
        objectList:[],
    }
  },
  mounted(){
    this.getTextParameterFn()
  },
  methods:{
    async getTextParameterFn(){
      let res= await requestApi.parameterManage.getTextParameter({
        method:'post',
        data:{parameterId:this.$route.query.id}
      });
      if(res){
        console.log(res);
        console.log(this.paramsProperties);
         this.form.properties=this.paramsProperties.map(item=>{
              return {
                  name:item.name,
                  code:item.code,
                  type:item.type,
                  value:res.value||''
              }
          });
           this.form.id=res.id||'';
      }
    },
    async setTextParameter(){
      console.log(this.form.properties)
       let data={
              id:this.form.id,
              parameterId:this.$route.query.id,
              value:this.form.properties[0].value
          };
          let res =await requestApi.parameterManage.setTextParameter({
              method:'post',
              data
          });
          if(res){
              this.$message({
                  type:'success',
                  message:'保存成功'
              });
          }
    },
    submitForm(){
      this.$refs['ruleForm'].validate((valid) => {
      if (valid) {
        console.log(this.form.properties)
          this.setTextParameter();
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
</style>