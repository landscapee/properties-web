/*
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2021-03-29 10:23:11
<<<<<<< HEAD
 * @LastEditors: yang fu ren
 * @LastEditTime: 2021-09-03 17:14:24
=======
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-03 14:44:53
>>>>>>> 821bfc2127ddc6a59ac2ab68476e48db1dad344e
 */
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
//菜单列表
export const menuPermissions=[
  {
    path:'/',
    component:() => import('@/views/paramsManage/paramsDefine/index'),
    name:'参数定义管理',
    code:'paramsDefine',
    menuPermissions:'paramsDefine',
    meta:{title:'参数定义管理',icon:'csgl'},
  },
  {
    path:'/parameter',
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
    path:'/createClassify',
    component:() => import('@/views/paramsManage/paramsDefine/page/createClassify'),
    name:'创建分类',
    code:'createClassify',
    menuPermissions:'createClassify',
    meta:{title:'创建分类',icon:'csgl',gobackbtn:true},
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
  //mode:'history',
	fallback: false,
	routes: menuPermissions
})
