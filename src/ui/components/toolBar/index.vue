<!--
 * @Author: your name
 * @Date: 2020-02-07 10:49:14
 * @LastEditTime: 2021-06-24 10:36:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \com.sccsky.ams.frontend\src\components\toolBar\index.vue
-->
<template>
	<div class="toolBar">
		<el-button v-if="isShowGoBackBack"  class="returnButton"  @click="goback">
			<icon-svg icon-class="goback" style="width:16px;height:16px;vertical-align: middle;"></icon-svg>
		返回</el-button>
	</div>
</template>

<script>
export default {
	name: 'ToolBar',
	data() {
		return {
			
		};
	},
	methods: {
		goback() {
			this.$router.go(-1)
			//this.$store.commit('app/TOOGLE_ADDBUTTON');
		},
		
	},
	computed: {
		isShowGoBackBack:function(){
			console.log(this.$route.meta)
			return this.$route.meta.gobackbtn&&this.$route.meta.gobackbtn===true
		},
		
	
	},
};
</script>

<style lang="scss" scoped>
.toolBar {
	width: 800px;
	height: 40px;
	line-height: 40px;
	position: absolute;
	top: -42px;
	right: 0;
	text-align: right;
	.returnButton {
		width: 70px;
		right: 24px;
		border-radius: 4px;
		color: #fff;
		background: #4181e9;
		border: none;
		padding: 10px;
		top: 0;
	}
}
</style>
