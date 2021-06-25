/*
 * @Descripttion: axios封装
 * @version: v0.0.1
 * @Author: xdh.ss
 * @Date: 2020-04-13 11:19:21
 * @LastEditors: xdh.ss
 * @LastEditTime: 2020-04-13 12:20:59
 */
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://173.100.1.30/fpms/fpms-controller/',
    transformRequest: [
        data => data
    ],
    timeout: 15000,
    headers: {
        'Authorization': sessionStorage.token ? sessionStorage.token : '',
        'Accept': 'application/json',
    }
})

// 添加请求拦截器
instance.request.use(config => {
    if (config.method === 'post') {
        const formData = new FormData();
        Object.keys(config.data).forEach(key => formData.append(key, config.data[key]));
        config.data = formData;
    }
    return config;
}, err => {
    return Promise.reject(err)
})

// 添加响应拦截器
instance.response.use(res => {
    return res.data;
},err => {
    return Promise.reject(err)
})

return instance;
