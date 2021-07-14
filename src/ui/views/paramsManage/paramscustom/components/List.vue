<!--
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2021-04-08 10:08:25
 * @LastEditors: yang fu ren
 * @LastEditTime: 2021-07-14 09:41:46
-->
<template>
  <div style="height:100%;width:100%">
      <div class="title_box">
          <div style="margin-left: auto;">
               <el-button class="add_btn" type="primary" @click="handleAdd">添加</el-button>
          </div>     
      </div>
      <Ftable :data="tableData" :tableConfig="tableConfig" :offsetTop="47" @handleCurrentChange="handleCurrentChange">
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
import requestApi from '@/api/index.js';
import getQueryVariable from '@/utils/getQueryVariable';
import Ftable from '@/components/table';
import Sortable from 'sortablejs';
export default {
  name:'List',
  components:{Ftable},
  props:['paramsProperties'],
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
            { slot: 'operation' },
	    ]
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
     this.getListParameterFn();
     this.$nextTick(()=>{
          this.rowDropTable()
      })
  },
  methods:{
    async getListParameterFn(){
      let res= await requestApi.parameterManage.getListParameter({
        method:'post',
        data:{parameterId:getQueryVariable('id')}
      });
      if(res){
        this.tableData=res;
      }
    },
    async deleteListParameter(id){
      let res= await requestApi.parameterManage.deleteListParameter({
        method:'postquery',
        params:{id}
      });
      if(res){
        this.$message({
          type:"success",
          message:'删除成功'
        })
        this.getListParameterFn()
      }
    },
    rowDropTable(){
        const ele = document.querySelector('.el-table__body-wrapper tbody');
        const _this = this;
        Sortable.create(ele, {
            onEnd({ newIndex, oldIndex }) {
                  let id=_this.tableData[oldIndex].id;
                  let targetId=_this.tableData[newIndex].id;
                  let position=oldIndex>newIndex?'before':'after';
                  const currRow = _this.tableData.splice(oldIndex, 1)[0];
                  _this.tableData.splice(newIndex, 0, currRow);
                  // _this.moveLayerFn(id,targetId,position)
            },
        });
    },
    handleAdd(){
      this.$router.push({
        path:'addList',
        query:{isEdit:false,parameterId:getQueryVariable('id')},
      })
    },
    handleClickDelete(row){
      this.$confirm(`是否删除?`, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
           this.deleteListParameter(row.id)
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
        path:'addList',
        query:{isEdit:true,parameterId:getQueryVariable('id'),id:row.id,value:row.value},
      })
    },
    handleCurrentChange(current){
      this.params.current=current
    },
  }
  }
</script>

<style>

</style>