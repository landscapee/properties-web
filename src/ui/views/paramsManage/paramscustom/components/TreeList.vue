<!--
 * @Author: your name
 * @Date: 2021-06-24 16:40:26
 * @LastEditTime: 2021-07-14 09:41:00
 * @LastEditors: yang fu ren
 * @Description: In User Settings Edit
 * @FilePath: \properties-web\src\ui\views\paramsManage\paramscustom\components\ListAddObject.vue
-->
<template>
  <div class="treeList">
        <div class="classifyItems">
            <div class="classifyItems_box">
              <Tree  :treeData='treeData' @handleSelect='handleSelect' :config='treeConfig'></Tree>
            </div>
        </div>
        <div class="classify_info">
           <div class="title_box">
                <div style="margin-left: auto;">
                    <el-button class="add_btn" type="primary"  @click="handleAdd">添加</el-button>
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
import requestApi from '@/api/index.js';
import getQueryVariable from '@/utils/getQueryVariable';
export default {
  name: 'TreeList',
  components:{Tree,Ftable},
  props:['parentId','paramsProperties'],
  data() { 
    return {
        treeNodeId:'',
        treeData:[],
        treeConfig:{
            operation:true
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
            { slot: 'operation' },
        ],
    }
  },
  mounted(){
      let tableConfig=this.paramsProperties.map((item)=>{
       return {
         prop:item.code,
         label:item.name,
         formatter:(row)=>{
          let value=JSON.parse(row.value);
          let currentData = value.find((itemc)=>{
            return itemc.code===item.code
          });
          return currentData.value
         },
         align:'center'
       }
     });
     this.tableConfig.push(...tableConfig);
      this.getTreeParameterFn()
  },
  methods:{
    async getTreeParameterFn(){
      let res =await requestApi.parameterManage.getTreeParameter({
        method:'post',
        data:{parameterId:this.parentId}
      });
      if(res){
        if(res.length){
          this.treeData=this.handTreeData(res);
        }
      }
    },
    //
    async getListParameterFn(){
        let res = await requestApi.parameterManage.getListParameter({
            method:'post',
            data:{
                parameterId:getQueryVariable('id'),
                parentDataId:this.treeNodeId
            }
        });
        if(res){
            this.tableData=res;
        }
    },
    async deleteListParameterFn(id){
        let res= await requestApi.parameterManage.deleteListParameter({
            method:'postquery',
            params:{id}
        });
        if(res){
            this.$message({
                type:'success',
                message:'删除成功'
            })
            this.getListParameterFn()
        }
    },
    handleAdd(){
        this.$router.push({
            path:'addListAddList',
            query:{isEdit:false,parameterId:getQueryVariable('id'),parentDataId:this.treeNodeId},
        })
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
    handleSelect(data){
      
        this.treeNodeId=data.id;
        this.getListParameterFn()
    },
    handleClickDelete(row){
        this.$confirm(`是否删除?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }).then(() => {
            this.deleteListParameterFn(row.id)
        }).catch((err) => {
            this.$message({
                type: 'info',
                message: '已取消删除',
            });
        });
    },
    handleClickEdit(row){
          this.$router.push({
            path:'addListAddList',
            query:{isEdit:true,parameterId:getQueryVariable('id'),parentDataId:this.treeNodeId,row:JSON.stringify(row)},
        })
    },
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