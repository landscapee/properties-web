<!--
 * @Author: your name
 * @Date: 2021-06-23 14:30:28
 * @LastEditTime: 2021-07-28 09:26:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \properties-web\src\ui\views\paramsManage\paramscustom\index.vue
-->
<template>
   <div class="paramscustom">
      <div class="page_content"  v-if="paramsType==='TEXT'||paramsType==='OBJECT'">
            <SingleValue v-if="paramsType==='TEXT'" :paramsProperties='form.properties' :key="paramsId"></SingleValue>
            <Object v-if="paramsType==='OBJECT'" :paramsProperties='form.properties' :key="paramsId"></Object>
      </div>
      <List v-if="paramsType==='LIST'" :paramsProperties='form.properties' :key="paramsId"></List>
      <ListAddObject v-if="paramsType==='SUB_OBJECT'" :parentId='parentId' :paramsProperties='form.properties' :key="paramsId"></ListAddObject>
      <ListAddList  v-if="paramsType==='SUB_LIST'"  :parentId='parentId' :paramsProperties='form.properties' :key="paramsId"></ListAddList>
      <TreeObject  v-if="paramsType==='TREE'" :parentId='parentId' :paramsProperties='form.properties' :key="paramsId"></TreeObject>
      <TreeList  v-if="paramsType==='TREE_LIST'" :parentId='parentId' :paramsProperties='form.properties' :key="paramsId"></TreeList>
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
import requestApi from '@/api/index.js';
export default {
  name: 'paramscustom',
  components:{SingleValue,Object,List,ListAddObject,ListAddList,TreeObject,TreeList},
  data() { 
    return {
        form:{
            properties:[]
        },
        rules:{},
        paramsType:'',
        parentId:'',
        paramsId:'',
    }
  },
  mounted(){
       this.getParameterInfoFn()
  },
  watch:{
      $route: {
        handler() {
             this.getParameterInfoFn()
        },
        deep: true,
    }
  },
  methods:{
     //
     async getParameterInfoFn(){
        let res= await requestApi.parameterManage.getParameterInfo({
            method:'postquery',
            repeat:true,
            params:{id:this.$route.query.id}
         });
         if(res){
             this.paramsType=res.type;
             this.form.properties=JSON.parse(res.properties);
             this.parentId=res.parentId||'';
             this.paramsId=this.$route.query.id
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