<!--
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2021-04-08 10:08:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-24 10:37:37
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
      <CreateParams ref="createParams"></CreateParams>
  </div>
</template>

<script>
import Ftable from '@/components/table';
import getQueryVariable from '@/utils/getQueryVariable';
import CreateParams from './components/CreateParams.vue'
export default {
  name:'paramsDefine',
  components:{Ftable,CreateParams},
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
        { prop: 'name', label: '参数类型', align: 'center' },
        { prop: 'code', label: '描述', align: 'center' },
        { prop: 'name', label: '状态', align: 'center' },
        { prop: 'code', label: '创建时间', align: 'center' },
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
    handleCreateParams(){
      // this.$refs.createParams.open({
      //   type:'add'
      // })
      this.$router.push({
        path:'createParams'
      })
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

<style>

</style>