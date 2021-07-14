<!--
 * @Author: your name
 * @Date: 2021-06-24 16:40:26
 * @LastEditTime: 2021-07-14 09:41:28
 * @LastEditors: yang fu ren
 * @Description: In User Settings Edit
 * @FilePath: \properties-web\src\ui\views\paramsManage\paramscustom\components\ListAddObject.vue
-->
<template>
  <div class="treeObject">
        <div class="classifyItems">
            <el-button type="primary" class="big_btn" icon="el-icon-circle-plus-outline" @click="handleAdd">添加</el-button>
            <div class="classifyItems_box">
              <Tree  :treeData='treeData' @handleSelect='handleSelect' :config='treeConfig' @getCurrentNode='nodeOperation'></Tree>
            </div>
        </div>
        <div class="classify_info">
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
        </div>
  </div>
</template>

<script>
import Tree from '@/components/tree';
import requestApi from '@/api/index.js';
import getQueryVariable from '@/utils/getQueryVariable';
export default {
  name: 'TreeObject',
  components:{Tree},
  props:['parentId','paramsProperties'],
  data() { 
    return {
        treeNodeId:'',
        treeConfig:{
            operation:true
        },
        treeData:[],
        form:{
            properties:[],
        },
        rules:{},
    }
  },
  mounted(){
    this.getTreeParameterFn()
  },
  methods:{
    async updateTreeParameterFn(){
      let res = await requestApi.parameterManage.updateTreeParameter({
        method:'post',
        data:{
          parameterId:getQueryVariable('id'),
          value:JSON.stringify(this.form.properties),
          id:this.treeNodeId
        }
      });
      if(res){
        this.$message({
          type:'success',
          message:'保存成功'
        });
        this.getTreeParameterFn()
      }
    },
    async getTreeParameterFn(){
      let res =await requestApi.parameterManage.getTreeParameter({
        method:'post',
        data:{parameterId:getQueryVariable('id')}
      });
      if(res){
        if(res.length){
          this.treeData=this.handTreeData(res);
        }
      }
    },
    async deleteTreeParameterFn(id){
      let res = await requestApi.parameterManage.deleteTreeParameter({
        method:"postquery",
        params:{id}
      })
      if(res){
        this.$message({
          type:'success',
          message:'删除成功'
        })
        this.getTreeParameterFn()
      }
    },
    handTreeData(treeData){
      let tree=[];
      treeData.forEach(item => {
          let value=JSON.parse(item.value);
          let active=value.find(itemv => {
              return itemv.isText===true;
          });
          let tmp={
              name:active.value,
              id:item.id,
              parameterId:item.parameterId,
              value:item.value,
              children:[]
          }
          if(item.subTree.length){
            tmp.children=this.handTreeData(item.subTree)
          }
           tree.push(tmp)
       })
       return tree
    },
    handleAdd(){
      this.$router.push({
        path:'addTree',
        query:{properties:JSON.stringify(this.paramsProperties),parameterId:getQueryVariable('id'),pid:''}
      })
    },
    //增加子节点
    nodeOperation(data,type){
     
      if(type==='delete'){
          this.$confirm(`是否删除节点?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            this.deleteTreeParameterFn(data.id)
          })
          .catch((err) => {
            console.log(err)
            this.$message({
              type: 'info',
              message: '已取消删除',
            });
          });
      }else{
        this.$router.push({
          path:'addTree',
          query:{properties:JSON.stringify(this.paramsProperties),parameterId:getQueryVariable('id'),pid:this.treeNodeId}
        })
      }
    },
    handleSelect(data){
        this.form.properties=JSON.parse(data.value)
        this.treeNodeId=data.id;
    },
     submitForm(){
        this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
            this.updateTreeParameterFn();
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
 .treeObject{
    display: flex;
     width: 100%;
     height: 100%;
 }
 .classifyItems{
   overflow: hidden;
 }
  .classifyItems_box{
    height: calc(100% - 56px);
    overflow: auto;
  }
</style>