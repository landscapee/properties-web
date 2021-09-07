<!--
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2021-04-08 10:08:25
 * @LastEditors: yang fu ren
 * @LastEditTime: 2021-09-07 16:57:52
-->
<template>
  <div style="height:100%;width:100%;display:flex">
    <div class="classifyItems">
       <el-button type="primary" class="big_btn" icon="el-icon-circle-plus-outline" @click="handleCreateClassify">创建分类</el-button>
       <div class="classifyItems_box">
           <CalssiyTree @getCurrentNode='getCurrentNode' @moveCategories='moveCategoriesFn' :treeData='treeData' @handleSelect='handleSelect'></CalssiyTree>
        </div>
    </div>
    <div class="classify_info">
      <div class="title_box">
          <div style="margin-left: auto;">
               <el-button class="add_btn" @click="handleCreateParams" type="primary" v-if="categoryId">新建参数</el-button>
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
import Ftable from '@/components/table';
import CalssiyTree from '@/components/tree/calssiyTree';
import requestApi from '@/api/index.js';
export default {
  name:'paramsDefine',
  components:{Ftable,CalssiyTree},
  data(){
    return {
      key:'',
      treeData:[],
      treeConfig:{
          operation:true,
          draggable:true
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
        { prop: 'name', label: '参数名称', align: 'center' },
        { prop: 'code', label: '参数编码', align: 'center' },
        { prop: 'type', label: '参数类型', align: 'center' },
        { prop: 'comment', label: '描述', align: 'center' },
        { prop: 'time', label: '创建时间', align: 'center' },
        { slot: 'operation' },
	    ],
      categoryId:'',
    }
  },
  mounted(){
    if(!localStorage.getItem('token')){
      localStorage.setItem('token',this.$route.query.token);
    }
    if(!localStorage.getItem('projectId')){
       localStorage.setItem('projectId', this.$route.query.projectId);
    }
    //this.getListFn();
    this.getParammsClassifyFn();
  },
  methods:{
    async getParammsClassifyFn(){
      let res= await requestApi.system.getAll({
        method:"postquery",
        params:{systemId:this.$route.query.projectId},
      });
      if(res){
        console.log(res);
        this.treeData=res
      }
    },
    async deleteFn(id){
      let res=await requestApi.parameterManage.delete({
        method:'postquery',
        params:{id}
      })
      if(res){
        this.$message({
          type:'success',
          message:'删除成功'
        });
        this.getListFn();
        //通知父级重新获取菜单数据
        window.parent.postMessage({
            state:'success'
        }, '*');
      }
    },
    async getListFn(){
      let res = await requestApi.parameterManage.getList({
        method:'postquery',
        params:{systemId:localStorage.getItem('projectId'),classifyId:this.categoryId}
      });
      if(res){
        this.tableData=res;
      }
    },
      //移动节点
    async moveCategoriesFn(draggingNode,dropNode,dropType){
        // let data={
        //     id:draggingNode.data.id,
        //     targetId:dropNode.data.id,
        //     position:dropType,
        // };
        // //let r=await moveCategories(data);
        // let r=await requestApi.globalLayer.moveCategories({method:'post',data:data})
        // if(r){
        //       this.getCategoriesFn();
        // }
    },
    async delateCategoryNode(data){
      let res= await requestApi.system.delete({
        method:'postquery',
        params:{id:data.id}
      });
      if(res){
        this.$message({
          type:'success',
          message:"删除成功"
        });
        this.getParammsClassifyFn()
      }
    },
    handleSelect(data){
        this.categoryId=data.id;
        this.getListFn();
    },
     //获取树的节点数据
    getCurrentNode(data,type){
      console.log(data)
        if(type==='add'){
            let obj={
                type:'add',
                parentId:data.id,
            }
             this.$router.push({
              path:"createClassify",
              query:{...obj},
            })
        }else if(type==='edit'){
            let obj={
                type:'edit',
                id:data.id,
                pid:data.parentId,
                name:data.name
            }
            this.$router.push({
              path:"createClassify",
               query:{...obj},
            })
        }else if(type==='delate'){
            this.delateCategoryNode(data);
        }
    },
   
    handleCreateParams(){
      this.$router.push({
        path:'createParams',
        query:{classifyId:this.categoryId}
      })
    },
    handleCreateClassify(){
      this.$router.push({
        path:"createClassify"
      })
    },
    handleClickDelete(row){
       this.$confirm(`是否删除?`, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
           this.deleteFn(row.id)
				})
				.catch((err) => {
          console.log(err)
					this.$message({
						type: 'info',
						message: '已取消删除',
					});
				});
    },
    handleClickEdit(row){
      this.$router.push({
        path:'createParams',
        query:{data:JSON.stringify(row)}
      })
    },
    handleCurrentChange(current){
      this.params.current=current
    },
    handleSizeChange(){}
  }
  }
</script>

<style lang='scss' scoped>
.classifyItems{
    width: 280px;
    height: 100%;
    overflow: hidden;
    .big_btn{
        width: 100%;
        margin-bottom:16px;
    }
}
.classify_info{
    width: calc(100% - 290px);
    margin-left: 10px;
    border: 1px solid #c7ccd2;
    border-radius: 6px;
    padding: 25px;
}
.classifyItems_box{
   height: calc(100% - 55px);
   overflow: auto;
}
.popover_content{
    .popover_opera{
        cursor: pointer;
    }
    .popover_opera:hover{
        color:  #3187ee;
    }
    .edit{
        margin-bottom: 10px;
    }
}
</style>