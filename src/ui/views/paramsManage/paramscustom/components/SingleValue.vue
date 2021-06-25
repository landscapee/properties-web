<!--
 * @Author: your name
 * @Date: 2021-06-24 15:59:44
 * @LastEditTime: 2021-06-24 16:02:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \properties-web\src\ui\views\paramsManage\paramscustom\components\SingleValue.vue
-->
<template>
   <el-form-item label="" prop="name">
        <el-input v-model="form.name"  placeholder="请输入名称"></el-input>
    </el-form-item>
</template>

<script>
export default {
  name: 'SingleValue',
  data() { 
    return {
        form:{
            name:''
        }
    }
  }
 }
</script>

<style lang="scss" scoped>
  
</style>