/*
 * @Descripttion: 
 * @version: 
 * @Author: xdh.ss
 * @Date: 2020-05-13 13:00:10
 * @LastEditors: xdh.ss
 * @LastEditTime: 2020-05-13 13:19:02
 */
import Vue from 'vue';

const AdvTable = () => import(/* webpackChunkName: "components" */ '../components/advTable');
const ScrollBox = () => import(/* webpackChunkName: "components" */ '../components/scroll');



Vue.component('AdvTable', AdvTable);
Vue.component('ScrollBox', ScrollBox);