<!--
 * @Author: your name
 * @Date: 2020-02-07 10:49:14
 * @LastEditTime: 2021-07-14 09:44:40
 * @LastEditors: yang fu ren
 * @Description: In User Settings Edit
 * @FilePath: \com.sccsky.ams.frontend\src\components\toolBar\index.vue
-->
<template>
	<div class="toolBar">
		<div class="toolBar_title">
			<icon-svg icon-class="ic_location" class="logo"></icon-svg>
			<span>参数管理</span>
			<icon-svg icon-class="ic_arrow" class="logo"></icon-svg>
			<span>{{routerName||'参数定义管理'}}</span>
			
		</div>
		<el-button v-if="isShowGoBackBack"  class="returnButton"  @click="goback">
			<icon-svg icon-class="goback" style="width:16px;height:16px;vertical-align: middle;"></icon-svg>
		返回</el-button>
	</div>
</template>

<script>
export default {
	name: 'ToolBar',
	props:['routerName'],
	data() {
		return {
			checked:''
		};
	},
	methods: {
		goback() {
			this.$router.go(-1)
		},
	},
	computed: {
		isShowGoBackBack:function(){
			return this.$route.meta.gobackbtn&&this.$route.meta.gobackbtn===true
		},
		
	
	},
};
</script>

<style lang="scss" scoped>
.toolBar {
	width: 100%;
	height: 40px;
	line-height: 40px;
	position: relative;
	padding: 0 15px;
	.returnButton {
		width: 70px;
		right: 24px;
		border-radius: 4px;
		color: #fff;
		background: #4181e9;
		border: none;
		padding: 10px;
		top: 2px;
		position: absolute;
	}
	.toolBar_title{
		color: #6a7785;
		font-size: 14px !important;
		font-family: SourceHanSansCN, SourceHanSansCN-Regular;
		font-weight: 400;
	}
}
</style>
