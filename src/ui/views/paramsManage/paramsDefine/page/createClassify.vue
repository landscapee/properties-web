<!--
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2021-09-03 17:10:40
 * @LastEditors: yang fu ren
 * @LastEditTime: 2021-09-07 16:53:28
-->
<template>
    <div>
        <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="collect_form">
            <el-form-item label="分类名称" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>

            <el-form-item label="参数权限：" >
                <el-button @click="userOpen('role')" size="mini" icon="el-icon-plus">选择角色</el-button>
                <div class="tagBox">
                    <el-scrollbar style="height:100px">
                        <el-tag :key="tag.code" v-for="(tag,index) in roles" closable :disable-transitions="false" @close="handleClose(index)">
                            {{ tag.name }}
                        </el-tag>
                    </el-scrollbar>
                </div>
            </el-form-item>
            <el-form-item label="" >
                <el-button @click="close" class="dialog_footer_btn no_box_shadow">取 消</el-button>
                <el-button type="primary" @click="submitForm" class="dialog_footer_btn no_box_shadow">确 定</el-button>
            </el-form-item>
        </el-form>

        <roleTree ref="roleBox"  @onSelected="handleRoleSelected"></roleTree>

    </div>
</template>
<script>
import requestApi from '@/api/index.js';
import request from '@/utils/request'; // get token from cookie
import {without,map}from 'lodash'
import roleTree from '@/components/roleTree/index';

export default {
   name:'createClassify',
   data(){
       return {
           roles:[],
           // roleList: [],
           roleListObj: {},
           form:{
               name:'',
               parentId:'',
               id:'',

           },
           type:"add",
            rules:{
                 name: [
                    { required: true, message: '请输入分类名称', trigger: 'blur' },
                    // { min: 3, max: 5, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
            }
       }
   },
    components:{roleTree},
   mounted(){
       let query=this.$route.query;
       this.form=Object.assign({},this.form,query);

       if(query.type){
           this.type=query.type
       }
        console.log(this.form,this.roles,1111)
       this.getAllRoles()
   },
   methods:{

       getAllRoles() {
           let hostname = window.location.hostname
           if (hostname.indexOf('localhost') >= 0) {
               hostname = '173.100.1.152'
           }

            let url = `http://${hostname}:8099/api/sys/role/findAllWithPage?pageNum=1&pageSize=1000 `
           request({
               methods: 'get',
               url,
           }).then((d) => {
               // console.log(1221214567/,d);
               // this.roleList = d.data.list
               map( d.data.list,k=>{
                   this.roleListObj[k.code]=k
               })
               if(this.form.permission){
                   let arr=this.form.permission.split(',')
                   this.roles= map(arr,k=>{
                       return this.roleListObj[k]
                   })

                }
               console.log('this.roles',this.roles);
           })

       },
        getPermission(){
           let arr=map(this.roles,k=>{
               return k.code
           })
          return  arr.join(',')
        },
       async createClassifyFn(){

           console.log(this.form);
           let data={
               ...this.form,
               permission:this.getPermission(),
               // name:this.form.name,
               // parentId:this.form.parentId,
               systemId:localStorage.getItem('projectId'),
           };
           if(!data.parentId){
               delete data.parentId
           }
           let res = await requestApi.system.save({
               method:"post",
               data
           });
           if(res){
               this.$message({
                    type:"success",
                    message:'保存成功'
               });
               this.$router.go(-1)
           }
       },
       async updateClassifyFn(){
            let data={
               ...this.form,
                permission:this.getPermission(),
               // id:this.form.id,
               systemId:localStorage.getItem('projectId'),
           }
           if(!data.parentId){
               delete data.parentId
           }
           let res= await  requestApi.system.update({
               method:'post',
               data
           });
           if(res){
                this.$message({
                    type:"success",
                    message:'编辑成功'
               });
               this.$router.go(-1)
           }
       },
       submitForm(){
           this.$refs['ruleForm'].validate((valid) => {
            if (valid) {
                console.log(this.type)
                if(this.type==='add'){
                    this.createClassifyFn()
                }else if(this.type==='edit'){
                    this.updateClassifyFn()
                }
               
                
            } else {
                console.log('error submit!!');
                return false;
            }
            });
       },
       close(){
           this.$router.go(-1)
       },
       userOpen( ){
           this.$refs.roleBox.open(this.roles||[]);
       },
       handleClose(index) {
           this.roles.splice(index,1)
       },
       handleRoleSelected(roles){
           this.roles =  map(roles,(item) => ({ code: item.code, name: item.name }));
       },
   }
}
</script>

<style lang="scss" scoped>
.tagBox{

    border:1px solid #DCDFE6;
    margin: 0!important;
}
/deep/ .el-scrollbar__view{
    padding: 0 5px;
    .el-tag{
        margin-right: 5px;
        margin-top: 5px;
    }
}
</style>