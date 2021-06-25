<!--
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2020-03-13 10:14:48
 * @LastEditors: yang fu ren
 * @LastEditTime: 2021-05-06 16:55:37
-->
<template>
	<section class="app_main">
		<transition name="fade-transform" mode="out-in">
			<router-view :key="key" />
		</transition>
	</section>
</template>

<script>
export default {
	name: 'AppMain',
	computed: {
		key() {
			return this.$route.path;
		},
	},
};
</script>

<style scoped lang='scss'>
// @import '~@/styles/darkStyle/pubconfig.scss';
.app_main{
	height: calc(100% - 55px);
	width: calc(100% - 30px);
	position: relative;
	overflow: auto;
	color: ffffff;
	padding: 15px;
	margin:0 15px 15px 15px;
	opacity: 1;
	background: #ffffff;
	border-radius: 8px;
}
.fixed-header + .app-main {
	padding-top: 40px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
	.fixed-header {
		padding-right: 20px;
	}
}
</style>
