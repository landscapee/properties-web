<!--
 * @Author: your name
 * @Date: 2021-06-24 16:40:26
 * @LastEditTime: 2021-06-25 10:22:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \properties-web\src\ui\views\paramsManage\paramscustom\components\ListAddObject.vue
-->
<template>
  <div class="listAddObject">
        <div class="classifyItems">
            <ul class="classifyItems_box">
                <li class="item" v-for="(item) in categoryOptions" :key="item.id" @click="handleClickCategory(item)" :class="item.id===categoryId?'classifyActive':''">
                    <span class="classify_content">
                        {{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="classify_info">
            <div class="title_box">
                <div style="margin-left: auto;">
                     <el-button class="add_btn" type="primary" icon="el-icon-circle-plus" >添加</el-button>
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
export default {
  name: 'ListAddObject',
  components:{Ftable},
  data() { 
    return {
        categoryId:'',
        categoryOptions:[{name:'国内出港',id:"asdkj"}],
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
        { prop: 'fa', label: '业务范围', align: 'center' },
        { slot: 'operation' },
	    ]
    }
  },
  methods:{
    handleClickCategory(item){
        this.categoryId=item.id
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