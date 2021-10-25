<!--
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2021-07-07 11:32:05
 * @LastEditors: yang fu ren
 * @LastEditTime: 2021-10-25 14:30:06
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
            <el-input v-model="item.value"  placeholder="请输入" v-else></el-input>
            <el-button @click="handleMap" v-if="item.type==='gismap'">选取坐标</el-button>
        </el-form-item>
        <el-form-item label="">
            <el-button type="primary" @click="submitForm" class="dialog_footer_btn no_box_shadow">提 交</el-button>
        </el-form-item>
   </el-form>
</template>

<script>
import requestApi from '@/api/index.js';
import {mapGetters} from "vuex"
import { constants, copyFileSync } from 'fs';
export default {
    name:'addList',
    data(){
        return {
            form:{
                properties:[],
            },
            parameterId:'',
            parentDataId:'',
            id:'',
            isEdit:false,
            gisInfo:{
                coordinates:[],
                type:''
            },
        }
    },
    computed:{
        ...mapGetters(['getGisinfo'])
    },
    watch:{
        getGisinfo:{
            handler:function(){
                console.log('111')
                console.log(this.form)
                console.log(this.getGisinfo)
                let coordinates=[...this.getGisinfo.coordinates]
                console.log(coordinates)
                this.form.properties.forEach(item=>{
                    if(item.type==='gismap'){
                        console.log('地图数据');
                        item.value=JSON.stringify(coordinates)
                    }
                })
                console.log(this.form.properties)
            },
            deep:true
        }
    },
    mounted(){
        console.log(this.getGisinfo)
        let query=this.$route.query;
        this.parameterId=query.parameterId;
        this.parentDataId=query.parentDataId;
        this.isEdit=query.isEdit;
        this.handleProperties(query)
        if(this.isEdit){
            this.id=query.id;
        }
       
    },
    methods:{
        handleMapData(data){
            console.log(data);
            console.log(this.form)
        },
        handleMap(){
            console.log(this.form.properties)
            window.parent.postMessage({
                    state:'drapMap'
                }, '*');
        },
         //处理渲染数据
        handleProperties(data){
            this.form.properties=data.properties.map((item,i)=>{
                //当参数配置有relateObjectId时要获取对应的管理数据
                if(item.relateObjectId){
                    this.getListParameterDeFn(item.relateObjectId,i)
                }
               return {
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
                parentDataId:this.parentDataId,
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
                    this.$router.go(-1);
                }else{
                    this.$message({
                        type:'warning',
                        message:res
                    });
                }
                
            }
        },
        async updateListParameterFn(){
            console.log(this.gisInfo);
            console.log(this.form)
            let value={};
            this.form.properties.forEach((item)=>{
                value[item.code]=item.value;
            });
            let data={
                id:this.id,
                parameterId:this.parameterId,
                parentDataId:this.parentDataId,
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
                    this.$router.push({
                        path:'parameterEditor',
                        query:{id:this.parameterId,categoryId:this.parentDataId},
                    })
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