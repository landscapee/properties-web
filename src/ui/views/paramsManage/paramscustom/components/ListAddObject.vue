<!--
 * @Author: your name
 * @Date: 2021-06-24 16:40:26
 * @LastEditTime: 2021-09-10 17:09:12
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
                    <!-- <el-input v-model="item.value"  placeholder="请输入"></el-input> -->
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
              <el-form-item label="" v-if="categoryOptions.length">
                  <el-button type="primary"  @click="submitForm" class="dialog_footer_btn no_box_shadow">提 交</el-button>
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
            properties:[],
            id:'',
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
            parameterId:this.$route.query.id,
            parentDataId:this.categoryId,
            value:JSON.stringify(this.form.properties),
            id:this.form.id,
        };
        if(!data.id){
            delete data.id
        }
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
                parameterId:this.$route.query.id,
                parentDataId:this.categoryId
            }
        });
        if(res){
            if(res.code===200){ //没有绑定值
                this.form.id='';
                this.form.properties=cloneDeep(this.paramsProperties)
            }else{
                this.form.id=res.id
                this.form.properties=JSON.parse(res.value)
            }
             this.form.properties=this.form.properties.map((item)=>{
                return {
                    code:item.code,
                    isText:item.isText,
                    isValue:item.isValue,
                    name:item.name,
                    objectList:[],
                    relateObjectId:item.relateObjectId,
                    type:item.type,
                    value:item.value,
                }
             })
            this.form.properties.forEach((property,i)=>{
                if(property.relateObjectId){
                    this.getListParameterDeFn(property.relateObjectId,i)
                }
            })
        }
    },
      async getListParameterDeFn(id,i){
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
     //处理显示字段和值字段
    handleValueAndText(data){
        let value={isText:'',isValue:''};
        data.forEach(item => {
            if(item.isText){ //显示字段
                value['isText']=item.code
            }
            if(item.isValue){ //值字段
                value['isValue']=item.code
            }
        });
        return value
    },
    async getListParameterFn(){
      let res= await requestApi.parameterManage.getListParameter({
        method:'post',
        data:{parameterId:this.parentId}
      });
      if(res){
          console.log(res)
          //显示字段和值字段
          let textandvalue=this.handleValueAndText(this.paramsProperties);
          this.categoryOptions=res.map(item=>{
              let value=JSON.parse(item.value);
              return {
                    deleted: item.deleted,
                    id: item.id,
                    parameterId: item.parameterId,
                    position: item.position,
                    ...value
                    // name:value[textandvalue['isText']],
                    // value:value[textandvalue['isValue']]
              }
             
          });
        //获取右表格数据
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