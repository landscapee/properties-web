<!--
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2021-04-08 10:08:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-24 16:22:32
-->
<template>
  <div style="height:100%;width:100%">
      <div class="title_box">
          <div style="margin-left: auto;">
               <el-button class="add_btn" type="primary" >添加</el-button>
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
import { debounce } from '@/common/tools.js';
import Ftable from '@/components/table';
export default {
  name:'List',
  components:{Ftable},
  data(){
    return {
      key:'',
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
	    ]
    }
  },
  methods:{
    handleInput(){
        debounce(() => {
          this.params.current = 1;
         
      })();
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