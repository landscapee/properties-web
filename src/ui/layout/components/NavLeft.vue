<!--
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2021-03-29 10:32:38
 * @LastEditors: yang fu ren
 * @LastEditTime: 2021-04-29 14:31:12
-->
<template>
   <div>
		<div class="persion_info">
      <span class="heard_img">
        <img src="/static/imgs/default_header.png" alt="">
      </span>
			<span class="persion_name">
          {{userInfo.name}}
      </span>
      <span class="persion_roles">{{userInfo.deptName}}</span>
		</div>
		<el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu background-color='unset' text-color='#fff' active-text-color="#fff" :default-active="activeMenu" :router='true'>
        <router-link :to="item.parentPath+'/'+item.path" v-for="item in leftNavItems" :key="item.path">
          <el-menu-item  :index="item.parentPath+'/'+item.path" :class="item.parentPath+'/'+item.path">
              <icon-svg :icon-class="item.meta.icon"></icon-svg>
              <span slot="title" class="titleName">{{item.name}}</span>
          </el-menu-item>
        </router-link>
      </el-menu>
		</el-scrollbar>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';
import {getUserInfo} from '@/utils/auth'
//import MenuItem from './MenuItem'
export default {
    name:'Layout',
    components:{},
    data(){
        return {
            userInfo:getUserInfo(),
        }
    },
    computed:{
      ...mapGetters(['leftNavItems','leftNavActive']),
      activeMenu() {
        const route = this.$route;
        const { meta, path } = route;
        if (meta.activeMenu) {
          return meta.activeMenu;
        };
        return path;
		  },
    },
}
</script>
<style scoped lang='scss'>
@import '../../styles/variables.scss';
.persion_info{
  height: 197px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  .heard_img{
    display: inline-block;
    width: 85px;
    height: 85px;
    line-height: 85px;
    align-items: center;
    justify-content: center;
    display: flex;
    background: url('../../assets/img/header_bc.png') no-repeat;
    background-size: 100%;
    img{
      height: 60px;
      width: 60px;
    }
  }
  .persion_name{
    line-height: 28px;
    margin-top: 5px;
    color: #fff;
    font-size: 14px;
  }
  .persion_roles{
    line-height: 20px;
    margin-top: 2px;
     font-size: 15px;
    color: #828f9b;
  }
}
.el-menu{
  .is-active{
       background-image: linear-gradient(270deg,#2e67f6, #004bcd);
  }
}
.el-menu-item{
  // color: #ffffff;
  font-size: 16px;
  height: 40px;
  line-height: 40px;
  padding-left:32px !important;
  .svg-icon{
    vertical-align: middle;
  }
   &:hover {
      // you can use $subMenuHover
      background-image: linear-gradient(270deg,#2e67f6, #004bcd);
    }
    
}
</style>