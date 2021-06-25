<!--
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2021-03-29 10:31:02
 * @LastEditors: yang fu ren
 * @LastEditTime: 2021-05-08 10:31:19
-->
<template>
    <div style="height:100%;width:100%">
        <Header />
        <div class="main_content">
            <NavLeft class="main_sidebar"/>
            <div class="main_container" >
                <div>
                    <navbar />
                </div>
                <AppMain />
		    </div>
        </div>
    </div>
</template>

<script>
import Header from './components/Header';
import NavLeft from './components/NavLeft';
import AppMain from './components/AppMain';
import Navbar from './components/Navbar';
    export default {
        name:'Layout',
        components:{Header,NavLeft,AppMain,Navbar},
        data(){
            return {
                
            }
        },
        created(){
            console.log('Layout创建')
        },
        mounted(){
            console.log('Layout挂载')
        },
    }
</script>
<style scoped lang='scss'>
// .main-container{
//     height: calc(100% - 48px);
//     transition: margin-left .28s;
//     margin-left: 210px;
//     position: relative;
//     overflow: auto;
// }
.main_content{
    height: calc(100% - 40px);
    transition: margin-left .28s;
    display: flex;
}
.main_container{
    width: calc(100% - 210px);
    background: #f5f5f5;
    overflow: hidden;
}
.main_sidebar{
    width: 220px;
    background: url('../assets/img/left-bg.png') no-repeat;
}

</style>
