<!--
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2020-02-25 09:26:33
 * @LastEditors: yang fu ren
 * @LastEditTime: 2021-05-28 17:27:24
-->
<template>
	<el-breadcrumb class="app-breadcrumb" separator="">
		<transition-group name="breadcrumb">
			<el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
				<!-- <span class="no-redirect">{{ item.meta.title }}</span> -->
				<span v-if="item.redirect === 'noRedirect' || index == levelList.length - 1" class="no-redirect">{{ item.meta.title }}</span> 
				 <a style="position:relative;padding-right:20px;color:#6a7785" v-else @click.prevent="handleLink(item)">{{ item.meta.title }}<i class="nav_right_icon"></i></a> 
			</el-breadcrumb-item>
		</transition-group>
	</el-breadcrumb>
</template>

<script>
import pathToRegexp from 'path-to-regexp';

export default {
	data() {
		return {
			levelList: null,
		};
	},
	watch: {
		$route() {
			this.getBreadcrumb();
		},
	},
	created() {
		this.getBreadcrumb();
	},
	methods: {
		getBreadcrumb() {
			
			// only show routes with meta.title
			let matched = this.$route.matched.filter((item) => item.meta && item.meta.title);
			//const first = matched[0];

			// if (!this.isDashboard(first)) {
			//   matched = [{ path: '/home', meta: { title: '首页' }}].concat(matched)
			// }

			this.levelList = matched.filter((item) => item.meta && item.meta.title && item.meta.breadcrumb !== false);
		},
		isDashboard(route) {
			const name = route && route.name;
			if (!name) {
				return false;
			}
			return name.trim().toLocaleLowerCase() === 'Home'.toLocaleLowerCase();
		},
		pathCompile(path) {
			// To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
			const { params } = this.$route;
			var toPath = pathToRegexp.compile(path);
			return toPath(params);
		},
		handleLink(item) {
			
			const { redirect, path } = item;
			if (redirect) {
				this.$router.push(redirect);
				return;
			}
			this.$router.push(this.pathCompile(path));
		},
	},
};
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
	display: inline-block;
	font-size: 14px;
	line-height: 40px;
	margin-left: 8px;
	.no-redirect {
		color: #555555;
		cursor: text;
	}

}
/deep/.el-breadcrumb__separator{
	margin: 0 ;
}
.nav_right_icon{
	position: absolute;
	display: inline-block;
	top: 3.5px;
	right: 4px;
	width: 16px;
	height: 12px;
	background: url(../../assets/img/nav_right_icon.png) no-repeat center;
}
</style>