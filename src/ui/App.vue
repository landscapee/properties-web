<!--
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2021-03-29 10:23:11
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-24 10:37:05
-->
<template>
    <div class="app">
         <ToolBar></ToolBar>
        <router-view />
    </div>
</template>
<script>
import ToolBar from '@/components/toolBar'
export default {
     components:{ToolBar},
    methods: {
        toLoginPage(){
            this.$router.push('/')
        },
        toHomePage(){
            this.$router.push('/index')
        }
    },
}
</script>
<style lang="scss">
    @import './styles/App.scss';
</style>
<style lang="scss" scoped>
.app{
    height:calc(100% - 38px);
    width: 100%;
    margin-top:40px;
    background: #fff;
    position: relative;
    padding: 15px;
}
</style>