<!--
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2021-03-29 10:32:17
 * @LastEditors: yang fu ren
 * @LastEditTime: 2021-04-09 10:41:57
-->
<template>
    <div >
        <span class="router_item " 
        :class="item.code&&item.code===headerNavActive?'header_active':''" 
        v-for="(item,index) in permission_routes"
        v-if="item.code" 
        :key="index"
        @click="changeNav(item.path,item.children)"
        >
            <span class="menu_icon">
                <icon-svg :icon-class="item.meta.icon" style="color:#00dcff"></icon-svg>
            </span>
            {{item.name}}
        </span>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
    name:'Layout',
    data(){
        return {
            
        }
    },
    computed:{
        ...mapGetters(['permission_routes','headerNavActive'])
    },
    methods:{
        changeNav(path,children){

            this.$router.push({
                path:path+'/'+children[0]&&children[0].path||''
            })
        }
    }
}
</script>
<style scoped lang='scss'>
.router_item{
    display: inline-block;
    cursor: pointer;
    width: 105px;
    height: 40px;
    opacity: 0.6;
    font-size: 14px;
    font-family: AlibabaPuHuiTiR;
    text-align: left;
    color: #ffffff;
    line-height: 40px;
    padding:0 12px;
}
.menu_icon{
    display: inline-block;
    width: 16px;
    height: 16px;
}
.header_active{
    opacity: 1;
    background: linear-gradient(0deg,rgba(0,75,205,0.35), rgba(8,63,151,0.00));
    border-bottom:2px solid #3876e6;
}
</style>