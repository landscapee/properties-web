<!--
 * @Author: your name
 * @Date: 2021-06-23 14:30:28
 * @LastEditTime: 2021-07-14 09:43:03
 * @LastEditors: yang fu ren
 * @Description: In User Settings Edit
 * @FilePath: \properties-web\src\ui\views\paramsManage\paramscustom\index.vue
-->
<template>
   <div class="paramscustom">
      <div class="page_content"  v-if="paramsType==='TEXT'||paramsType==='OBJECT'">
            <SingleValue v-if="paramsType==='TEXT'" :paramsProperties='form.properties'></SingleValue>
           <Object v-if="paramsType==='OBJECT'" :paramsProperties='form.properties'></Object>
      </div>
      <List v-if="paramsType==='LIST'" :paramsProperties='form.properties'></List>
      <ListAddObject v-if="paramsType==='SUB_OBJECT'" :parentId='parentId' :paramsProperties='form.properties'></ListAddObject>
      <ListAddList  v-if="paramsType==='SUB_LIST'"  :parentId='parentId' :paramsProperties='form.properties'></ListAddList>
      <TreeObject  v-if="paramsType==='TREE'" :parentId='parentId' :paramsProperties='form.properties'></TreeObject>
      <TreeList  v-if="paramsType==='TREE_LIST'" :parentId='parentId' :paramsProperties='form.properties'></TreeList>
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
import requestApi from '@/api/index.js';
export default {
  name: 'paramscustom',
  components:{SingleValue,Object,List,ListAddObject,ListAddList,TreeObject,TreeList},
  data() { 
    return {
        paramsId:getQueryVariable('id'),
        form:{
            properties:[]
        },
        rules:{},
        paramsType:'',
        parentId:''
    }
  },
  mounted(){
       this.getParameterInfoFn()
  },
  methods:{
     //
     async getParameterInfoFn(){
        let res= await requestApi.parameterManage.getParameterInfo({
            method:'postquery',
            repeat:true,
            params:{id:this.paramsId}
         });
         if(res){
             this.paramsType=res.type;
             this.form.properties=JSON.parse(res.properties);
             this.parentId=res.parentId||'';
         }
     }, 
  }
 }
</script>

<style lang="scss" scoped>
.paramscustom{
    width: 100%;
    height: 100%;
    overflow: hidden;
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