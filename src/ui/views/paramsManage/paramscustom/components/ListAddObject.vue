<!--
 * @Author: your name
 * @Date: 2021-06-24 16:40:26
 * @LastEditTime: 2021-07-14 09:42:12
 * @LastEditors: yang fu ren
 * @Description: In User Settings Edit
 * @FilePath: \properties-web\src\ui\views\paramsManage\paramscustom\components\ListAddObject.vue
-->
<template>
  <div class="listAddObject">
        <div class="classifyItems">
            <ul class="classifyItems_box">
                <li class="item" v-for="(item) in categoryOptions" :key="item.id" @click="handleClickCategory(item)" :class="item.id===categoryId?'classifyActive':''">
                    <span class="classify_content">
                        {{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="classify_info">
            <el-form :model="form" :rules="rules" ref="ruleForm" label-width="160px" class="collect_form">
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
        </div>
  </div>
</template>

<script>
import requestApi from '@/api/index.js';
import {cloneDeep}  from 'lodash';
export default {
  name: 'ListAddObject',
  props:['parentId','paramsProperties'],
  data() { 
    return {
        categoryId:'',
        categoryOptions:[],
        form:{
            properties:[]
        },
        rules:{},
        activeLeftIndex:0,
    }
  },
  mounted(){
     
      this.getListParameterFn()
  },
  methods:{
    async setObjParameterFn(){
        let data={
            parameterId:this.parentId,
            parentDataId:this.categoryId,
            value:JSON.stringify(this.form.properties),
        };
        let res= await requestApi.parameterManage.setObjParameter({
            method:'post',
            data
        });
        if(res){
            this.$message({
                type:'success',
                message:'保存成功'
            })
        }
    },  
    async getObjParameterFn(){
        let res= await requestApi.parameterManage.getObjParameter({
            method:'post',
            data:{
                parameterId:this.parentId,
                parentDataId:this.categoryId
            }
        });
        if(res){
          
            if(res.code===200){ //没有绑定值
                this.form.properties=cloneDeep(this.paramsProperties)
            }else{
                this.form.properties=JSON.parse(res.value)
            }
        }
    },
    async getListParameterFn(){
      let res= await requestApi.parameterManage.getListParameter({
        method:'post',
        data:{parameterId:this.parentId}
      });
      if(res){
          this.categoryOptions=res.map((item)=>{
              let value=JSON.parse(item.value);
              let active=value.find(itemv => {
                  return itemv.isText===true;
              });
              return {
                  name:active.value,
                  id:item.id,
                  parameterId:item.parameterId,
                  value:item.value
              }
          });
          if(this.categoryOptions.length){
               this.handleClickCategory(this.categoryOptions[0])
          }
      }
    },
    handleClickCategory(item){
        this.categoryId=item.id;
        this.getObjParameterFn()
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
 .listAddObject{
    display: flex;
     width: 100%;
     height: 100%;
 }
 .classifyItems{
    width: 280px;
    height: 100%;
    .big_btn{
        width: 100%;
        margin-bottom:16px;
    }
}
.classifyItems_box{
    .item{
        width: 100%;
        height: 60px;
        padding: 19px 14px;
        margin-bottom:10px;
        border: 1px solid #c7ccd2;
        border-radius: 6px;
        display: flex;
        line-height: 22px;
        color: #333333;
        font-size:16px;
        cursor: pointer;
        &:hover{
            background: rgba(56,118,230,0.15);
        }
        span{
            display: inline-block;
        }
    }
}
.classifyActive{
    background: rgba(56,118,230,0.15);
    .operation_icon{
        .point{
        background: #3187ee;
    }
    }
}
.classify_content{
    width: calc(100% - 22px);
    padding-left:24px;
    position: relative;
    .classify_content_icon{
        width: 16px;
        height: 16px;
        position: absolute;
        left: 0;
    }
}
.classify_info{
    width: calc(100% - 290px);
    margin-left: 10px;
    border: 1px solid #c7ccd2;
    border-radius: 6px;
    padding: 25px;
}
</style>