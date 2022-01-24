<!--
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2021-07-07 11:32:05
 * @LastEditors: yang fu ren
 * @LastEditTime: 2021-10-25 14:28:30
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
            <!-- <el-input v-model="item.value"  placeholder="请输入"></el-input> -->
            <el-select v-model="item.value" :multiple="item.type==='objectList'" placeholder="请选择" v-if="item.type==='objectList'||item.type==='object'">
                <el-option
                    v-for="itemc in item.objectList"
                    :key="itemc.code"
                    :label="itemc.name"
                    :value="itemc.code">
                </el-option>
            </el-select>
            <template v-else-if="showCoordinatesBt(item)">
                <input   :ref="'copyText'+index" readonly="readonly" class="copy-txt"  :value="item.value">

                <el-button @click="handleMap1({...item,row:getRow},true)" >查看</el-button>
                <el-button @click="copyData(item.value,'copyText'+index)" >复制数据</el-button>
                <el-button @click="handleMap1({...item,row:getRow})" v-if="showCoordinatesBt(item)">选取坐标</el-button>
            </template>
            <el-radio-group v-model="item.value"    v-else-if="item.type=='bool'">
                <el-radio label="true">真</el-radio>
                <el-radio label="false">假</el-radio>
            </el-radio-group>
             <el-input v-model="item.value"   placeholder="请输入" v-else></el-input>

        </el-form-item>
        <el-form-item label="">
            <el-button type="primary" @click="submitForm" class="dialog_footer_btn no_box_shadow">提 交</el-button>
        </el-form-item>
   </el-form>
</template>

<script>
import requestApi from '@/api/index.js';
 import DrawMixins from "../components/drawMixins";
import {map} from "lodash";
export default {
    name:'addList',
    data(){
        return {
            form:{
                properties:[],
            },
            parameterId:'',
            paramsProperties:[],
            paramName:'',
            id:'',
            isEdit:false,
        }
    },
    mixins:[DrawMixins],
    computed:{
      getRow(){
          let row={}
          map(this.form.properties,k=>{
              row[k.code]=k.value
          })
          return row
        }
    },
    mounted(){
        let query=this.$route.query;
        this.parameterId=query.parameterId;
        this.paramsProperties=query.properties;
        this.paramName=query.paramName;
        this.isEdit=query.isEdit;
        console.log(query)
        this.handleProperties(query)
        if(this.isEdit){
            this.id=query.id;
        }
        
    },
    methods:{
        getIsValue( ) {
            let isValueText=null
            map(this.form.properties,(k)=>{
                console.log(this.form.properties, k);
                k.isValue&&(isValueText=k.code)
            })
            return isValueText
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
        //处理渲染数据
        handleProperties(data){
            this.form.properties=data.properties.map((item,i)=>{
                //当参数配置有relateObjectId时要获取对应的管理数据
                if(item.relateObjectId){
                    this.getListParameterDeFn(item.relateObjectId,i)
                }
               return {
                    ...item,
                    code: item.code,
                    isText: item.isText,
                    isValue: item.isValue,
                    name: item.name,
                    objectList:[],
                    relateObjectId: item.relateObjectId?item.relateObjectId:'',
                    type: item.type,
                    isRequired:item.isRequired,
                    value:data[item.code]?data[item.code]:'',
               }
           });

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
        async addListParameterFn(){
            let value={};
            this.form.properties.forEach((item)=>{
                value[item.code]=item.value;
            });
            let data={
                parameterId:this.parameterId,
                value:JSON.stringify(value)
            };
          
            let res= await requestApi.parameterManage.addListParameter({
                method:'post',
                data
            });
            if(res){
                if(res===true){
                    this.$message({
                        type:'success',
                        message:'保存成功'
                    });
                    this.$router.go(-1)
                    
                }else{
                    this.$message({
                        type:'warning',
                        message:res
                    });
                }
               
            }
        },
        async updateListParameterFn(){
            let value={};
            this.form.properties.forEach((item)=>{
                value[item.code]=item.value;
            });
            let data={
                id:this.id,
                parameterId:this.parameterId,
                value:JSON.stringify(value)
            };
            let res= await requestApi.parameterManage.updateListParameter({
                method:'post',
                data
            })
            if(res){
                if(res===true){
                    this.$message({
                    type:'success',
                    message:'保存成功'
                    })
                    this.$router.go(-1)
                }else{
                     this.$message({
                        type:'warning',
                        message:res
                    });
                }
                
            }
        },
         submitForm(){
            this.$refs['ruleForm'].validate((valid) => {
            if (valid) {
               if(this.isEdit){
                   console.log(this.form.properties)
                   this.updateListParameterFn()
               }else{
                   console.log(this.form.properties)
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

<style lang="scss" scoped>
.copy-txt:hover{
    cursor: default!important;
}
.copy-txt{
    width: calc(100% - 280px);
    opacity: 1;
    border: 1px #DCDFE6 solid;
    height: 40px;
    border-radius: 4px;
}
.copy-txt:focus{
    outline: none;
}
</style>