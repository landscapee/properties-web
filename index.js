/*
 * @Descripttion: 
 * @version: 
 * @Author: xdh.ss
 * @Date: 2020-05-13 09:50:30
 * @LastEditors: yang fu ren
 * @LastEditTime: 2021-04-20 11:44:54
 */
import Vue from 'vue';
// import postal from 'postal';  // 引入postal
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/index.scss'; // global css
//import '@/styles/lightStyle/index.scss'; // 浅色色风格
import { v4 as uuidv4 } from 'uuid';
import App from './src/ui/App.vue';
// import WorkerRegist from './workerRegist.js';  // 引入webworker注册文件
import router from './src/ui/router';
import store from './src/ui/store';
import './src/ui/icons';
import Logger from './lib/logger';
import './src/ui/config/ui';
import '@/permission';
import generateDirective from './vueConfig/directive.js';

import axios from 'axios';

generateDirective(Vue)
//import '@/api'; //注册所有请求api
Vue.use(ElementUI);
// 把postal绑定到vue原型链上
// Vue.prototype.postal = postal;
Vue.prototype.$uuid = uuidv4;
Vue.prototype.$logger = Logger;
Vue.prototype.$subscribeMap = {};
Vue.prototype.$axios = axios;
router.afterEach((to, from) => {
    
})


new Vue({
    el: '#app',
    components: {App},
    router,
    store,
    template: '<App />',
    created () {
        // 注册并启动webworker
        // const workerProces = new WorkerRegist();
        // workerProces.start()
    }
})