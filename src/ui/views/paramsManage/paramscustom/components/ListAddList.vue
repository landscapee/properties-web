<!--
 * @Author: your name
 * @Date: 2021-06-24 16:40:26
 * @LastEditTime: 2021-07-20 15:07:45
 * @LastEditors: yang fu ren
 * @Description: In User Settings Edit
 * @FilePath: \properties-web\src\ui\views\paramsManage\paramscustom\components\ListAddObject.vue
-->
<template>
  <div class="listAddObject">
        <div class="classifyItems">
            <ul class="classifyItems_box" v-if="categoryOptions.length">
                <li class="item" v-for="(item) in categoryOptions" :key="item.id" @click="handleClickCategory(item)" :class="item.id===categoryId?'classifyActive':''">
                    <span class="classify_content">
                        {{item.name}}
                    </span>
                </li>
                
            </ul>
            <div style="text-align:center" v-else>暂无数据</div>
        </div>
        <div class="classify_info">
            <div class="title_box">
                <div style="margin-left: auto;">
                     <el-button class="add_btn" @click="handleAdd" type="primary" icon="el-icon-circle-plus" v-if="categoryOptions.length">添加</el-button>
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
import requestApi from '@/api/index.js';
import Ftable from '@/components/table';
import Sortable from 'sortablejs';
export default {
  name: 'ListAddList',
  components:{Ftable},
  props:['parentId','paramsProperties'],
  data() { 
    return {
        categoryId:'',
        categoryOptions:[],
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
      //获取表格数据
    async getListParameterCFn(){
        let res= await requestApi.parameterManage.getListParameter({
            method:"post",
            data:{
                parameterId:this.$route.query.id,
                parentDataId:this.categoryId
            }
        });
        if(res){
            this.tableData=res;
        }
    },
    //获取左侧数据
    async getListParameterFn(){
      let res= await requestApi.parameterManage.getListParameter({
        method:'post',
        data:{parameterId:this.parentId}
      });
      if(res){
          this.categoryOptions=res.map((item)=>{
              let value=JSON.parse(item.value);
              let active=value.find(itemv => {
                  return itemv.isText===true;
              });
              return {
                  name:active.value,
                  id:item.id,
                  parameterId:item.parameterId,
                  value:item.value
              }
          });
          if(this.categoryOptions.length){
               this.handleClickCategory(this.categoryOptions[0])
          }
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
            this.getListParameterCFn()
        }
    },
     async moveListParameterFn(id,position){
      let res=await requestApi.parameterManage.moveListParameter({
        method:'post',
        data:{
          id,
          position
        }
      });
      if(res){
        this.getListParameterCFn()
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
                  let oldRow=_this.tableData[newIndex];
                  console.log(oldRow);
                  const currRow = _this.tableData.splice(oldIndex, 1)[0];
                  console.log(currRow)
                 
                  _this.tableData.splice(newIndex, 0, currRow);
                  _this.moveListParameterFn(currRow.id,oldRow.position)
            },
        });
    },
    handleClickCategory(item){
        
        this.categoryId=item.id;
        this.getListParameterCFn()
    },
    handleAdd(){
        this.$router.push({
            path:'addListAddList',
            query:{isEdit:false,parameterId:this.$route.query.id,parentDataId:this.categoryId},
        })
    },
    handleClickDelete(row){
        this.$confirm(`是否删除?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }).then(() => {
            this.deleteListParameterFn(row.id)
        }).catch((err) => {
            console.log(err)
            this.$message({
                type: 'info',
                message: '已取消删除',
            });
        });
    },
    handleClickEdit(row){
        this.$router.push({
            path:'addListAddList',
            query:{isEdit:true,parameterId:this.$route.query.id,parentDataId:this.categoryId,row:JSON.stringify(row)},
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
 .listAddObject{
     display: flex;
     width: 100%;
     height: 100%;
 }
 .classifyItems{
    width: 280px;
    height: 100%;
    .big_btn{
        width: 100%;
        margin-bottom:16px;
    }
}
.classifyItems_box{
    .item{
        width: 100%;
        height: 60px;
        padding: 19px 14px;
        margin-bottom:10px;
        border: 1px solid #c7ccd2;
        border-radius: 6px;
        display: flex;
        line-height: 22px;
        color: #333333;
        font-size:16px;
        cursor: pointer;
        &:hover{
            background: rgba(56,118,230,0.15);
        }
        span{
            display: inline-block;
        }
    }
}
.classifyActive{
    background: rgba(56,118,230,0.15);
    .operation_icon{
        .point{
        background: #3187ee;
    }
    }
}
.classify_content{
    width: calc(100% - 22px);
    padding-left:24px;
    position: relative;
    .classify_content_icon{
        width: 16px;
        height: 16px;
        position: absolute;
        left: 0;
    }
}
.classify_info{
    width: calc(100% - 290px);
    margin-left: 10px;
    border: 1px solid #c7ccd2;
    border-radius: 6px;
    padding: 25px;
}
</style>