<!--
 * @Author: your name
 * @Date: 2021-06-24 16:40:26
 * @LastEditTime: 2021-06-25 10:15:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \properties-web\src\ui\views\paramsManage\paramscustom\components\ListAddObject.vue
-->
<template>
  <div class="treeObject">
        <div class="classifyItems">
            <div class="classifyItems_box">
              <Tree  :treeData='treeData' @handleSelect='handleSelect'></Tree>
            </div>
        </div>
        <div class="classify_info">
            <el-form :model="form" :rules="rules" ref="ruleForm" label-width="160px" class="collect_form">
               <el-form-item label="名称" prop="name">
                <el-input v-model="form.name"  placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="编号" prop="name">
                    <el-input v-model="form.name"  placeholder="请输入"></el-input>
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
export default {
  name: 'TreeObject',
  components:{Tree},
  data() { 
    return {
        treeNodeId:'',
        categoryOptions:[{name:'国内出港',id:"asdkj"},{name:'国际出港',id:"aasdkj"}],
        treeData:[
            {id:'shiping',name:'食品类',children:[{name:"0001 谷物、粮食粉、淀粉、乳制品；糕饼点心",id:'001'},{name:'0002 水果、坚果或植物其他部分的制品',id:'002'}]},
            {id:'zhiwu',name:'植物类'}],
        form:{
            name:''
        },
        rules:{},
    }
  },
  methods:{
    handleSelect(data){
        console.log(data);
        this.treeNodeId=data.id;
    },
    submitForm(){}
  }
 }
</script>

<style lang="scss" scoped>
 .treeObject{
    display: flex;
     width: 100%;
     height: 100%;
 }

</style>