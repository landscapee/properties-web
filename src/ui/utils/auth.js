/*
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2021-04-09 10:48:31
 * @LastEditors: yang fu ren
 * @LastEditTime: 2021-04-12 14:28:48
 */
const TokenKey = 'token';
const UserInfoKey = 'userInfo';
export function getToken() {
	return localStorage.getItem(TokenKey);
}
export function getUserInfo() {
	let tmp = localStorage.getItem(UserInfoKey);
	if (tmp) {
		return JSON.parse(tmp);
	} else {
		return {};
	}
}

export function setToken(token) {
	return localStorage.setItem(TokenKey, token);
}
export function setUserInfo(userInfo) {
	return localStorage.setItem(UserInfoKey, JSON.stringify(userInfo));
}

export function removeToken() {
	return localStorage.removeItem(TokenKey);
}
export function removeUserInfo() {
	return localStorage.removeItem(UserInfoKey);
}
