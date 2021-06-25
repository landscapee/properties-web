/*
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2021-03-29 14:34:01
 * @LastEditors: yang fu ren
 * @LastEditTime: 2021-04-13 09:51:21
 */

import { getToken, removeToken, getUserInfo, removeUserInfo } from '@/utils/auth';
// import { resetRouter } from '@/router';
import { extend, get } from 'lodash';
const state = {
	token: getToken(),
	name: '',
	avatar: '/static/img/default_user.df927a67.png',
	userInfo: getUserInfo(),
	roles: null,
};

const mutations = {
	SET_TOKEN: (state, token) => {
		state.token = token;
	},
	SET_USER_INFO: (state, userInfo) => {
		state.userInfo = extend({}, userInfo);
	},
	SET_NAME: (state, name) => {
		state.name = name;
	},
	SET_AVATAR: (state, avatar) => {
		state.avatar = avatar;
	},
	SET_ROLES: (state, roles) => {
		state.roles = roles;
	},
};

const actions = {
	// user login
	getInfo({ commit, state }) {
		commit('SET_ROLES', get(state.userInfo, 'roles', []));
		return new Promise((resolve, reject) => {
			resolve(state.userInfo);
		});
	},
	// user logout
	logout({ commit, state }) {
		return new Promise((resolve) => {
			commit('SET_TOKEN', '');
			commit('SET_ROLES', null);
			removeToken();
			//resetRouter();
			removeUserInfo();
			resolve();
		});
	},
	// remove token
	resetToken({ commit }) {
		return new Promise((resolve) => {
			commit('SET_TOKEN', '');
			removeToken();
			resolve();
		});
	},
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
};
