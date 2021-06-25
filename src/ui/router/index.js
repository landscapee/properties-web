/*
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2021-03-29 10:23:11
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-24 10:24:05
 */
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
//菜单列表
export const menuPermissions=[
  {
    path:'/paramsDefine',
    component:() => import('@/views/paramsManage/paramsDefine/index'),
    name:'参数定义管理',
    code:'paramsDefine',
    menuPermissions:'paramsDefine',
    meta:{title:'参数定义管理',icon:'csgl'},
  },
  {
    path:'/createParams',
    component:() => import('@/views/paramsManage/paramsDefine/page/createParams'),
    name:'创建参数',
    code:'createParams',
    menuPermissions:'createParams',
    meta:{title:'创建参数',icon:'csgl',gobackbtn:true},
  },
  {
    path:'/paramscustom',
    component:() => import('@/views/paramsManage/paramscustom/index'),
    name:'自定义菜单',
    code:'paramscustom',
    menuPermissions:'paramscustom',
    meta:{title:'自定义菜单',icon:'csgl'},
  },
]
export default new Router({
  mode:'history',
	fallback: false,
	routes: menuPermissions
})
