<!--
 * @Author: your name
 * @Date: 2021-06-24 16:40:26
 * @LastEditTime: 2021-06-25 14:12:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \properties-web\src\ui\views\paramsManage\paramscustom\components\ListAddObject.vue
-->
<template>
  <div class="treeList">
        <div class="classifyItems">
            <div class="classifyItems_box">
              <Tree  :treeData='treeData' @handleSelect='handleSelect'></Tree>
            </div>
        </div>
        <div class="classify_info">
           <div class="title_box">
                <div style="margin-left: auto;">
                    <el-button class="add_btn" type="primary" >添加</el-button>
                </div>     
            </div>
            <Ftable :data="tableData" :tableConfig="tableConfig" :offsetTop="100" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange">
                <el-table-column slot="operation" :width="150" fixed="right" label="操作" align="center">                
                    <span slot-scope="{ row }" class="operation">
                        <span title="编辑" class="icon_box" @click="handleClickEdit(row)">
                            <icon-svg icon-class="table_edit" class="logo"></icon-svg>
                        </span>
                        <span title="删除" class="icon_box" @click="handleClickDelete(row)">
                            <icon-svg icon-class="table_delate" class="logo"></icon-svg>
                        </span>
                    </span>
                </el-table-column>
            </Ftable>
        </div>
  </div>
</template>

<script>
import Tree from '@/components/tree';
import Ftable from '@/components/table';
export default {
  name: 'TreeList',
  components:{Tree,Ftable},
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
        params:{
        size:10,
        current:1
        },
        tableData:{
            records:[],
        },
        tableConfig:[
            {type: 'index',label: '序号',align: 'center'},
            { prop: 'name', label: '编码', align: 'center' },
            { prop: 'code', label: '名称', align: 'center' },
            { slot: 'operation' },
            ],
        rules:{},
    }
  },
  methods:{
    handleSelect(data){
        console.log(data)
        this.treeNodeId=data.id;
    },
    handleClickDelete(row){},
    handleClickEdit(row){},
    handleCurrentChange(current){
      this.params.current=current
    },
    handleSizeChange(){}
  }
 }
</script>

<style lang="scss" scoped>
 .treeList{
    display: flex;
     width: 100%;
     height: 100%;
 }

</style>