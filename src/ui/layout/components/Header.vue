<!--
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2021-03-29 10:31:21
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-23 11:48:42
-->
<template>
    <header >
        <div class="sys_name_info">
            <span class="title"><span class="logo_icon"></span>青霄系统管理中心</span>
        </div>
        <NavHeade class="header_router"/>
        <div class="other_info" >
            <div class="project_box" v-if="isShowProject">
            当前项目：
            <el-dropdown  @command="handleCommand">
                <span class="el-dropdown-link">
                    {{currentProjectName}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="item in projectOptions" :command='item.id' :key='item.id'>{{item.name}}</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div class="user_info">
            <el-dropdown  @command="handleCommandSignOut">
            <span class="el-dropdown-link">
               {{userInfo.name}}
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item command='signOut'>退出登录</el-dropdown-item>
                <!-- <el-dropdown-item>修改密码</el-dropdown-item> -->
            </el-dropdown-menu>
            </el-dropdown>
        </div>
        </div>
       
	</header>
</template>
<script>
import NavHeade from './NavHeade';
import { mapGetters } from 'vuex';
import {getUserInfo } from '@/utils/auth';
import requestApi from '@/api/index'
export default {
    name:'Layout',
    data(){
        return {
            projectOptions:[],
        }
    },
    components:{NavHeade},
    created(){
        console.log('header创建')
    },
    mounted(){
        console.log('header挂载'+this.currentProject)
        //this.getProjectsByManagerIdFn(getUserInfo().id); 
    },
    computed:{
        ...mapGetters(['userInfo','currentProject']),
        isShowProject:function(){
            return this.$route.path==='/mapConfig/mapCustomized'||this.$route.path==='/dataConfig/tableModeling'
        },
        currentProjectName:function(){
            let result;
            if(this.projectOptions.length){
                result=this.projectOptions.find((item)=>{
                    return item.id===this.currentProject;
                }).name
            }else{
                result='暂无项目'
            }
            return result;
        },
    },
    methods:{
        async getProjectsByManagerIdFn(managerId){
            let res = await requestApi.project.getProjectsByManagerId({
                method:'get',
                params:{managerId}
            });
            if(res&&res.length){ //有项目设置当前项目id
                this.$store.commit('setCurrentProject',res[0].id)
                this.projectOptions=res;
            }else{ //没得项目设置为空
                this.$store.commit('setCurrentProject','')
            }
        },
        handleCommand(command){
            this.$store.commit('setCurrentProject',command)
        },
        handleCommandSignOut(command){
            if(command==='signOut'){
                this.logout()
            }
        },
        async logout() {
			await this.$store.dispatch('user/logout');
			this.$router.push(`/login?redirect=${this.$route.fullPath}`);
		},
        toggleSideBar(){},
    }
}
</script>
<style scoped lang='scss'>
.el-dropdown{
    color: inherit;
    cursor: pointer;
}

header{
    height: 40px;
    width: 100%;
    color: white;
    background-image: linear-gradient(to right, #17283F, #0172CF);
    line-height: 40px;
    position: relative;
    display: flex;
    .title{
        position: absolute;
        opacity: 1;
        font-size: 18px;
        font-family: SourceHanSansCN, SourceHanSansCN-Bold;
        font-weight: 700;
        text-align: left;
        color: #ffffff;
        line-height: 27px;
        left: 38px;
        padding-left:30px;
        top: 6px;
        .logo_icon{
            display: inline-block;
            width: 22px;
            height: 22px;
            background: url('../../assets/img/logo.png') no-repeat;
            background-size: 100%;
            position: absolute;
            left: 0;
            top: 3px;
        }
    }
}
.sys_name_info{
    display: inline-block;
    width: 249px;
    height: 100%;
    background: url('../../assets/img/logo_bg.png') no-repeat;
    background-size: 100%;
}
.header_router{
    width: 1000px;
}
.other_info{
    color: #fff;
    height: 100%;
    width: calc(100% - 1250px);
    display: flex;
    justify-content: flex-end;
    padding-right: 30px;
    .project_box{
        margin-right: 20px;
    }
}
.signStyle{
	display: inline-block;
	width: 40px;
	height: 4px;
	background-image: linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,1),rgba(255,255,255,0));
	position: absolute;
	top: 12px;
    right: -54px;
}

</style>