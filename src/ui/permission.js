/*
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2021-03-29 14:59:58
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-23 09:26:28
 */
import router from './router';
import store from './store';
import { getToken } from '@/utils/auth'; // get token from cookie
import {getUserInfo} from '@/utils/auth'
const whiteList = ['/login']; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
	next();
});
router.onReady(() => {
	const hasToken =true;
	if (hasToken) {
	}
});
router.afterEach((to, from, next) => {
});
