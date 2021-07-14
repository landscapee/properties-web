<!--
 * @Author: your name
 * @Date: 2021-06-24 15:59:44
 * @LastEditTime: 2021-07-07 14:26:38
 * @LastEditors: yang fu ren
 * @Description: In User Settings Edit
 * @FilePath: \properties-web\src\ui\views\paramsManage\paramscustom\components\SingleValue.vue
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
import {cloneDeep}  from 'lodash';
import requestApi from '@/api/index.js';
import getQueryVariable from '@/utils/getQueryVariable';
export default {
  name: 'Object',
  props:['paramsProperties'],
  data() { 
    return {
        form:{
            properties:[],
            id:'',
        },
        rules:{},
    }
  },
  mounted(){
    this.getObjParameterFn();
  },
  methods:{
      async getObjParameterFn(){
          let res = await requestApi.parameterManage.getObjParameter({
              method:'post',
              data:{parameterId:getQueryVariable('id')}
          });
          if(res){
              if(res.code===200){ //表示没有值
                 this.form.properties=cloneDeep(this.paramsProperties).map((item)=>{
                    return {
                        name:item.name,
                        code:item.code,
                        type:item.type,
                        value:item.value||''
                    }
                });
              }else{
                   this.form.properties=JSON.parse(res.value);
                   this.form.id=res.id;
              }
          }
      },
      async setObjParameterFn(){
          let data={
              id:this.form.id,
              parameterId:getQueryVariable('id'),
              value:JSON.stringify(this.form.properties)
          };
          let res =await requestApi.parameterManage.setObjParameter({
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
               this.setObjParameterFn();
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
  .collect_form .fileUpload {
    /deep/.el-form-item__content{
        line-height: 40px;
    }
}
</style>