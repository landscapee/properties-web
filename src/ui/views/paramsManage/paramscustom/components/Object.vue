<!--
 * @Author: your name
 * @Date: 2021-06-24 15:59:44
 * @LastEditTime: 2021-09-08 17:14:48
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
            <el-select v-model="item.value" multiple placeholder="请选择" v-if="item.type==='objectList'">
                <el-option
                    v-for="itemc in item.objectList"
                    :key="itemc.code"
                    :label="itemc.name"
                    :value="itemc.code">
                </el-option>
            </el-select>
            <el-input v-model="item.value"  placeholder="请输入" v-else></el-input>
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
  name: 'Object',
  props:['paramsProperties'],
  data() { 
    return {
        form:{
            properties:[],
            id:'',
        },
        objectList:[],
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
              data:{parameterId:this.$route.query.id}
          });
          if(res){
              if(res.code===200){ //表示没有值
                 this.form.properties=cloneDeep(this.paramsProperties).map((item)=>{
                    return {
                        name:item.name,
                        code:item.code,
                        type:item.type,
                        value:item.value||'',
                        objectList:[],
                        relateObjectId:item.type==='objectList'?item.relateObjectId:''
                    }
                });
                //  console.log(this.form.properties)
                
              }else{
                   this.form.properties=JSON.parse(res.value);
                   this.form.id=res.id;
              }
               this.form.properties.forEach((property,i)=>{
                     if(property.relateObjectId){
                         this.getParameterInfoFn(property.relateObjectId,i)
                     }
                 })
          }
      },
      async getParameterInfoFn(id,i){
            let res= await requestApi.parameterManage.getParameterInfo({
                method:'postquery',
                repeat:true,
                params:{id}
            });
            if(res){
                console.log(res);
                this.form.properties[i].objectList=JSON.parse(res.properties);
                console.log( this.form.properties)
            }
       }, 
      async setObjParameterFn(){
          let data={
              id:this.form.id,
              parameterId:this.$route.query.id,
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