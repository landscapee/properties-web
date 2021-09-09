<!--
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2021-07-07 11:32:05
 * @LastEditors: yang fu ren
 * @LastEditTime: 2021-09-09 16:02:06
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
            <!-- <el-input v-model="item.value"  placeholder="请输入"></el-input> -->
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
import requestApi from '@/api/index.js';
export default {
    name:'addList',
    data(){
        return {
            form:{
                properties:[],
            },
            parameterId:'',
            id:'',
            isEdit:false,
        }
    },
    mounted(){
        let query=this.$route.query;
        this.parameterId=query.parameterId;
        this.isEdit=query.isEdit;
        console.log('tag', this.isEdit)
        if(this.isEdit){
            this.id=query.id;
            //this.form.properties=JSON.parse(query.value);
            this.getParameterInfoFn(JSON.parse(query.value));
        }else{
            this.getParameterInfoFn();
        }
        
    },
    methods:{
        async getParameterInfoFn(data){
            let res= await requestApi.parameterManage.getParameterInfo({
                method:'postquery',
                params:{id:this.parameterId}
            });
            if(res){
                this.paramsType=res.type;
                let objRes= JSON.parse(res.properties);
                if(data){
                    objRes.forEach((item,i) => {
                        data.forEach((citem,j)=>{
                            if(item.code===citem.code){
                                objRes.splice(i,1,citem)
                            }
                        })
                    });
                    this.form.properties=objRes;
                }else{
                    this.form.properties=objRes;
                }
                console.log(this.form.properties)
                 this.form.properties=this.form.properties.map((item)=>{
                    return {
                        code: item.code,
                        isText: item.isText,
                        isValue: item.isValue,
                        name: item.name,
                        objectList:[],
                        relateObjectId: item.relateObjectId?item.relateObjectId:'',
                        type: item.type,
                        value:item.value||'',
                    }
                })
                this.form.properties.forEach((property,i)=>{
                     if(property.relateObjectId){
                         this.getListParameterDeFn(property.relateObjectId,i)
                     }
                 })
            }
        }, 
        // async getParameterInfoDeFn(id,i){
        //     let res= await requestApi.parameterManage.getParameterInfo({
        //         method:'postquery',
        //         repeat:true,
        //         params:{id}
        //     });
        //     if(res){
        //         console.log(res);
        //         this.form.properties[i].objectList=JSON.parse(res.properties);
        //         console.log( this.form.properties)
        //     }
        // }, 
        async getListParameterDeFn(id,i){
        let res= await requestApi.parameterManage.getListParameter({
            method:'post',
            data:{parameterId:id}
        });
        if(res){
            console.log(res)
            //this.tableData=res;
            let options=[]
           let data= res.forEach((item)=>{
               let value=JSON.parse(item.value);

                let text = null;
                let val = null;

               value.forEach((itemc,j)=>{
                   console.log(itemc.code);
                   console.log(itemc.value);

                    if(itemc.isText){
                        text =  itemc.value;
                    }

                    if(itemc.isValue){
                        val = itemc.value;
                    }

               });
               options.push({
                   name:text,
                   code:val
               })
                // console.log("------------");
                // console.log(text);
                //    console.log(val);
             //console.log(JSON.parse(item.value))
            })
            this.form.properties[i].objectList=options;
        }
        },
        async addListParameterFn(){
            let data={
                parameterId:this.parameterId,
                value:JSON.stringify(this.form.properties)
            };
          
            let res= await requestApi.parameterManage.addListParameter({
                method:'post',
                data
            });
            if(res){
                this.$message({
                    type:'success',
                    message:'保存成功'
                });
                this.$router.go(-1)
            }
        },
        async updateListParameterFn(){
            let data={
                id:this.id,
                parameterId:this.parameterId,
                value:JSON.stringify(this.form.properties)
            };
            let res= await requestApi.parameterManage.updateListParameter({
                method:'post',
                data
            })
            if(res){
                this.$message({
                    type:'success',
                    message:'保存成功'
                })
                this.$router.go(-1)
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