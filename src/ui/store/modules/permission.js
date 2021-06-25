/*
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2021-03-29 14:33:47
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-21 14:32:09
 * 用于菜单权限控制，根据路由配置表和后端返回的权限菜单控制
 */
import {menuPermissions,commonMenu} from '@/router'
function unique(arr) {
	return Array.from(new Set(arr));
}
function hasPermission(roles, route) {
	if (route.menuPermissions) {
		let arr = [];
		let mergeRoles = [];
		roles.forEach((role) => {
			if (role.menus) {
				role.menus.forEach((i) => {
					if (i.code) {
						mergeRoles.push(i.code);
					}
				});
			}
		});
		mergeRoles = unique(mergeRoles);
		for (var i = 0; i < mergeRoles.length; i++) {
			var oneleal = mergeRoles[i].split('/')[0];
			if (!arr.includes(oneleal)) {
				arr.push(oneleal);
			}
			arr.push(mergeRoles[i]);
		}
		arr = unique(arr);
		return arr.includes(route.menuPermissions);
	} else {
		return true;
	}
}
export function filterAsyncRoutes(routes, roles) {
	const res = [];
	routes.forEach((route) => {
		const tmp = { ...route };
		if (hasPermission(roles, tmp)) {
			if (tmp.children) {
				tmp.children = filterAsyncRoutes(tmp.children, roles);
			}
			res.push(tmp);
		}
	});

	return res;
}
const state={
    routes:[]
};
const mutations={
    SET_ROUTES:(state, routes) => {
		state.routes = commonMenu.concat(routes);
	},
};
const actions={
    generateRoutes({ commit }, roles) {
		return new Promise((resolve) => {
			//let accessedRoutes=filterAsyncRoutes(menuPermissions,roles);
			//commit('SET_ROUTES', accessedRoutes);
			commit('SET_ROUTES', menuPermissions);
			resolve(menuPermissions);
		});
	},
};
export default {
	namespaced: true,
	state,
	mutations,
	actions,
};