<!--
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2020-02-25 09:26:33
 * @LastEditors: yang fu ren
 * @LastEditTime: 2021-03-30 15:54:29
-->
<template>
	<div class="navbar">
		<hamburger class="hamburger-container" @toggleClick="toggleSideBar" />
		<breadcrumb class="breadcrumb-container" />
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import Breadcrumb from '@/components/Breadcrumb';
import Hamburger from '@/components/Hamburger';

export default {
	components: {
		Breadcrumb,
		Hamburger,
		
	},
	computed: {
		
	},
	methods: {
		toggleSideBar() {
			//this.$store.dispatch('app/toggleSideBar');
		},
		async logout() {
			await this.$store.dispatch('user/logout');
			this.$router.push(`/login?redirect=${this.$route.fullPath}`);
		},
	},
};
</script>

<style lang="scss" scoped>
.navbar {
	height: 40px;
	display: block !important;
	padding: 0 !important;
	.hamburger-container {
		line-height: 40px;
		height: 100%;
		float: left;
		cursor: pointer;
		padding:0 0 0 20px !important;
		transition: background 0.3s;
		padding-right:0 !important;
		-webkit-tap-highlight-color: transparent;
		svg{
			color: #fff !important;
		}
		}
	.breadcrumb-container {
		float: left;
	}
}
// /deep/.hamburger-container:hover{
// 	svg{
// 		color: #fff !important;
// 	}
	
// }
/deep/.el-breadcrumb__inner a:hover, .el-breadcrumb__inner.is-link:hover{
	color: #fff;
}
</style>
