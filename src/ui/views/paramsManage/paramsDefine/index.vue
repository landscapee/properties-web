<!--
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2021-04-08 10:08:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-02 10:38:52
-->
<template>
  <div style="height:100%;width:100%">
      <div class="title_box">
          <div style="margin-left: auto;">
               <el-button class="add_btn" @click="handleCreateParams" type="primary" >新建参数</el-button>
          </div>     
      </div>
      <Ftable :data="tableData" :tableConfig="tableConfig" :offsetTop="47" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange">
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
</template>
<script>
import Ftable from '@/components/table';
import requestApi from '@/api/index.js';
import getQueryVariable from '@/utils/getQueryVariable';
export default {
  name:'paramsDefine',
  components:{Ftable},
  data(){
    return {
      key:'',
      params:{
        size:10,
        current:1
      },
      tableData:{
          records:[{}],
      },
      tableConfig:[
        {type: 'index',label: '序号',align: 'center'},
        { prop: 'name', label: '参数名称', align: 'center' },
        { prop: 'code', label: '参数编码', align: 'center' },
        { prop: 'type', label: '参数类型', align: 'center' },
        { prop: 'comment', label: '描述', align: 'center' },
        { prop: 'state', label: '状态', align: 'center' },
        { prop: 'time', label: '创建时间', align: 'center' },
        { slot: 'operation' },
	    ]
    }
  },
  mounted(){
    if(!localStorage.getItem('token')){
      localStorage.setItem('token', getQueryVariable('token'));
    }
    if(!localStorage.getItem('projectId')){
       localStorage.setItem('projectId', getQueryVariable('projectId'));
    }
   
    
  },
  methods:{
    async deleteFn(id){
      let res=await requestApi.parameterManage.delete({
        method:'post',
        data:{id}
      })
      if(res){
        this.$message({
          type:'success',
          message:'删除成功'
        })
      }
    },
    handleCreateParams(){
      this.$router.push({
        path:'createParams'
      })
    },
    handleClickDelete(row){
      this.deleteFn(row.id)
    },
    handleClickEdit(row){},
    handleCurrentChange(current){
      this.params.current=current
    },
    handleSizeChange(){}
  }
  }
</script>

<style>

</style>