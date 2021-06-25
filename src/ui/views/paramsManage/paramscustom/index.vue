<!--
 * @Author: your name
 * @Date: 2021-06-23 14:30:28
 * @LastEditTime: 2021-06-24 16:58:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \properties-web\src\ui\views\paramsManage\paramscustom\index.vue
-->
<template>
   <div class="paramscustom">
      <div class="page_content"  v-if="paramsType==='dz'||paramsType==='dx'">
          <el-form :model="form" :rules="rules" ref="ruleForm" label-width="160px" class="collect_form">
              <SingleValue v-if="paramsType==='dz'"></SingleValue>
              <Object v-if="paramsType==='dx'"></Object>
              <el-form-item label="">
                  <el-button type="primary" @click="submitForm" class="dialog_footer_btn no_box_shadow">提 交</el-button>
              </el-form-item>
          </el-form>   
      </div>
      <List v-if="paramsType==='lb'"></List>
      <ListAddObject v-if="paramsType==='zdx'"></ListAddObject>
      <ListAddList  v-if="paramsType==='zlb'"></ListAddList>
      <TreeObject  v-if="paramsType==='sxzdx'"></TreeObject>
      <TreeList  v-if="paramsType==='sxzlb'"></TreeList>
    </div>
</template>
<script>
import TreeObject from './components/TreeObject.vue'
import TreeList from './components/TreeList.vue'
import ListAddList from './components/ListAddList.vue'
import ListAddObject from './components/ListAddObject.vue'
import List from './components/List.vue'
import Object from './components/Object.vue'
import SingleValue from './components/SingleValue.vue'
import getQueryVariable from '@/utils/getQueryVariable';
export default {
  name: 'paramscustom',
  components:{SingleValue,Object,List,ListAddObject,ListAddList,TreeObject,TreeList},
  data() { 
    return {
        id:getQueryVariable('id').split('paramsType')[0],
        form:{},
        rules:{},
    }
  },
  computed:{
    paramsType:function(){
      return getQueryVariable('id').split('paramsType')[1]
    },
  },
  methods:{
     submitForm(){
            this.$refs['ruleForm'].validate((valid) => {
            if (valid) {
               
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
.paramscustom{
    width: 100%;
    height: 100%;
}
.page_header{
    width: 100%;
    box-sizing: border-box;
    height: 32px;
    //background: linear-gradient(135deg,#4181E9 10%);
    background: linear-gradient(135deg,
    #4181E9 174px,
    #ffffff 174px,#ffffff 176px,
    #7aa6ef 176px,#7aa6ef 184px,
    #ffffff 184px,#ffffff 186px,
    #b3cdf6 186px,#b3cdf6 190px,
    #ffffff 190px,#ffffff 192px,
    #eaf4ff 192px,#eaf4ff 100%
    );
   
    color: #ffffff;
    font-size: 16px;
    line-height: 32px;
    border-radius: 6px 0px 0px 0px;
    padding-left: 52px;
}
.page_content{
    margin-top:26px;
    width: 800px;
}
.service{
    .el-checkbox{
        margin-top: 10px;
    }
}
.collect_form .fileUpload {
    /deep/.el-form-item__content{
        line-height: 40px;
    }
}
.file-txt{
    text-align: left;
}
</style>