<!--
 * @Author: your name
 * @Date: 2021-06-24 16:06:32
 * @LastEditTime: 2021-06-24 16:10:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \properties-web\src\ui\views\paramsManage\paramscustom\components\Object.vue
-->
<!--
 * @Author: your name
 * @Date: 2021-06-24 15:59:44
 * @LastEditTime: 2021-06-24 16:02:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \properties-web\src\ui\views\paramsManage\paramscustom\components\SingleValue.vue
-->
<template>
    <div>
        <el-form-item label="服务器IP" prop="name">
        <el-input v-model="form.name"  placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="队列端口" prop="name">
            <el-input v-model="form.name"  placeholder="请输入"></el-input>
        </el-form-item>
    </div>
</template>

<script>
export default {
  name: 'Object',
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