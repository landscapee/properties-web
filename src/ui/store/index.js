/*
 * @Descripttion: 
 * @version: 
 * @Author: xdh.ss
 * @Date: 2020-05-13 09:50:30
 * @LastEditors: yang fu ren
 * @LastEditTime: 2021-05-27 11:10:34
 */
import Vue from 'vue';
import Vuex from 'vuex';
import sysMsg from "./modules/sys-msg.js";
import table from "./modules/table.js";
import getters from './getters';
import permission from './modules/permission';
import baseInfo from './modules/baseInfo';
import layer from './modules/layer';
import user from './modules/user';
import project from './modules/project';
Vue.use(Vuex)
const store = new Vuex.Store({
    modules: {
        data: sysMsg,
        table,
        permission,
        baseInfo,
        layer,
        user,
        project
    },
    getters
})
export default store
