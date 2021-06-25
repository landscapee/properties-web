<!--
 * @Author: your name
 * @Date: 2021-06-24 16:40:26
 * @LastEditTime: 2021-06-25 10:18:41
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
            <el-form :model="form" :rules="rules" ref="ruleForm" label-width="160px" class="collect_form">
               <el-form-item label="服务器IP" prop="name">
                <el-input v-model="form.name"  placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="队列端口" prop="name">
                    <el-input v-model="form.name"  placeholder="请输入"></el-input>
                </el-form-item> 
              <el-form-item label="">
                  <el-button type="primary" @click="submitForm" class="dialog_footer_btn no_box_shadow">提 交</el-button>
              </el-form-item>
          </el-form>   
        </div>
  </div>
</template>

<script>
export default {
  name: 'ListAddObject',
  data() { 
    return {
        categoryId:'',
        categoryOptions:[{name:'国内出港',id:"asdkj"},{name:'国际出港',id:"aasdkj"}],
        form:{
            name:''
        },
        rules:{},
    }
  },
  methods:{
      handleClickCategory(item){
          this.categoryId=item.id
      },
      submitForm(){}
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