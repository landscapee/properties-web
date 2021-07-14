/*
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2021-03-29 10:23:11
 * @LastEditors: yang fu ren
 * @LastEditTime: 2021-07-08 11:02:20
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
    path:'/parameterEditor',
    component:() => import('@/views/paramsManage/paramscustom/index'),
    name:'自定义菜单',
    code:'parameterEditor',
    menuPermissions:'parameterEditor',
    meta:{title:'自定义菜单',icon:'csgl'},
  },
  {
    path:'/addList',
    component:() => import('@/views/paramsManage/paramscustom/pages/addList'),
    name:'添加数据',
    code:'addList',
    menuPermissions:'addList',
    meta:{title:'自定义菜单',icon:'csgl',gobackbtn:true},
  },
  {
    path:'/addListAddList',
    component:() => import('@/views/paramsManage/paramscustom/pages/addListAddList'),
    name:'列表子列表添加数据',
    code:'addListAddList',
    menuPermissions:'addListAddList',
    meta:{title:'自定义菜单',icon:'csgl',gobackbtn:true},
  },
  {
    path:'/addTree',
    component:() => import('@/views/paramsManage/paramscustom/pages/addTree'),
    name:'添加子节点',
    code:'addTree',
    menuPermissions:'addTree',
    meta:{title:'自定义菜单',icon:'csgl',gobackbtn:true},
  },
]
export default new Router({
  mode:'history',
	fallback: false,
	routes: menuPermissions
})
