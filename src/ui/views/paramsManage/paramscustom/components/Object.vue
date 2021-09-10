<!--
 * @Author: your name
 * @Date: 2021-06-24 15:59:44
 * @LastEditTime: 2021-09-10 16:20:03
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
            { required: item.isRequired, message: '请输入', trigger: 'blur' },
            ]"
        >   
            <el-select v-model="item.value" :multiple="item.type==='objectList'" placeholder="请选择" v-if="item.type==='objectList'||item.type==='object'">
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
        rules:{},
    }
  },
  mounted(){
    this.getObjParameterFn();
  },
  methods:{
      //处理渲染数据
       handleProperties(data){
            this.form.properties=data.map((item,i)=>{
                //当参数配置有relateObjectId时要获取对应的管理数据
               return {
                    code: item.code,
                    isText: item.isText,
                    isValue: item.isValue,
                    name: item.name,
                    objectList:[],
                    relateObjectId: item.relateObjectId?item.relateObjectId:'',
                    type: item.type,
                    isRequired:item.isRequired,
                    value:'',
               }
           });

        },
      async getObjParameterFn(){
          let res = await requestApi.parameterManage.getObjParameter({
              method:'post',
              data:{parameterId:this.$route.query.id}
          });
          if(res){
              console.log(res)
              
              if(res.code===200){ //说明还没有绑定值
                    this.handleProperties(this.paramsProperties)
              }else{
                  let value=JSON.parse(res.value);
                  console.log(value)
                   console.log(this.paramsProperties)
                  this.form.id=res.id;
                  this.form.properties=this.paramsProperties.map(item=>{
                      return {
                            code: item.code,
                            isText: item.isText,
                            isValue: item.isValue,
                            name: item.name,
                            objectList:[],
                            relateObjectId: item.relateObjectId?item.relateObjectId:'',
                            type: item.type,
                            isRequired:item.isRequired,
                            value:value[item.code],
                      }
                  })
              }
               this.form.properties.forEach((property,i)=>{
                     if(property.relateObjectId){
                         this.getParameterInfoFn(property.relateObjectId,i)
                     }
                 })
          }
      },
      async getParameterInfoFn(id,i){
           let res= await requestApi.parameterManage.getListParameter({
                method:'post',
                repeat:true,
                data:{parameterId:id}
            });
            if(res){
               this.form.properties[i].objectList=res.map(item=>{
                    let value=JSON.parse(item.value);
                        return {
                            id:item.id,
                            ...value
                        }
                    });
                }
            
       }, 
      async setObjParameterFn(){
           let value={};
            this.form.properties.forEach((item)=>{
                value[item.code]=item.value;
            });
          let data={
              id:this.form.id,
              parameterId:this.$route.query.id,
              value:JSON.stringify(value)
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