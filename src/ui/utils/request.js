import axios from 'axios';
import { MessageBox, Message } from 'element-ui';
import store from '@/store';
import { getToken } from '@/utils/auth';
import { date2String, stringDateExtend } from '@/utils/date.js';
let logout = function() {
	store.dispatch('user/resetToken').then(() => {
		location.reload();
	});
};
// create an axios instance
const service = axios.create({
	baseURL: `http://${location.hostname}:${location.port}/`,
	timeout: 10000, // request timeout
});

service.defaults.headers.post['Content-Type'] = 'application/json';
// request interceptor
service.interceptors.request.use(
	(config) => {
		// do something before request is sent
		let data = config.data;
		date2String(data);
		if (store.getters.token) {
			// let each request carry token
			// ['X-Token'] is a custom headers key
			// please modify it according to the actual situation
			config.headers['Authorization'] = getToken()
		}
		return config;
	},
	(error) => {
		// do something with request error
		console.log(error); // for debug
		return Promise.reject(error);
	},
);

// response interceptor
service.interceptors.response.use(
	(response) => {
		let res;
		if(response.data&&response.data.code){
			let code=response.data.code
			if(code===-1){
				Message({
					message: response.data.msg,
					type: 'warning',
					duration: 5 * 1000,
				});
				res=false;
			}else{
				if(response.data.data){
					res = response.data.data;
				}else{
					res= response.data
				}
				//res = response.data.data;
				
			}
		}else if(response.data&&response.status===200){
			res=response.data;
		}
		return res;
	},
	(error) => {
		console.error('err' + error); // for debug
		if (error.response) {
			if (error.response.status === 401) {
				// token超时
				Message({
					message: '登录超时',
					type: 'error',
					duration: 5 * 1000,
				});

				logout();
				return false;
			} else if (error.response.status === 500) {
				Message({
					message: '服务器错误',
					type: 'error',
					duration: 1 * 1000,
				});
				//logout();
				return false;
			} else if (error.response.status === 404) {
				Message({
					message: '资源未找到',
					type: 'error',
					duration: 1 * 1000,
				});

				return false;
			} else {
				Message({
					message: error.response.statusText,
					type: 'error',
					duration: 1 * 1000,
				});
				//logout();
				return false;
			}
		} else {
			Message({
				message: '网络错误',
				type: 'error',
				duration: 1 * 1000,
			});
			//logout();
		}

		// logout();
		return Promise.reject(error);
	},
);

export default service;
