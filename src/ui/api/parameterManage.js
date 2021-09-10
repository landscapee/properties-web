/*
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2021-04-01 10:33:58
 * @LastEditors: yang fu ren
 * @LastEditTime: 2021-09-09 16:42:06
 * 参数管理
 */
export const parameterManage={
    add:'/api/param/api/parameterManage/add', //参数添加post
    update:'/api/param/api/parameterManage/update', //参数更新post
    delete:'/api/param/api/parameterManage/delete', //参数删除
    parentOptions:'/api/param/api/parameterManage/options', //post(url)上级参数
    getList:'/api/param/api/parameterManage/list', //获取参数列表post
    getParameterInfo:'/api/param/api/parameterManage/get', //获取参数信息post
    setObjParameter:'/api/param/api/parameter-object/set', //POST对象设值
    moveParameter:'/api/param/api/parameterManage/move', //参数排序post(body)

    getObjParameter:'/api/param/api/parameter-object/get', //获取对象的值POST
    getTextParameter:'/api/param/api/parameter-text/get', //获取单值数据post
    setTextParameter:'/api/param/api/parameter-text/set', //获取单值数据post
    
    getListParameter:'/api/param/api/parameter-list/get', //获取列表数据post
    addListParameter:'/api/param/api/parameter-list/add', //新增列表数据post
    updateListParameter:'/api/param/api/parameter-list/update', //编辑列表数据post
    deleteListParameter:'/api/param/api/parameter-list/delete', //删除列表数据post（url）
    moveListParameter:'/api/param/api/parameter-list/move', //列表排序

    getTreeParameter:'/api/param/api/parameter-tree/get', //获取树数据post
    addTreeParameter:'/api/param/api/parameter-tree/add', //添加树数据post
    updateTreeParameter:'/api/param/api/parameter-tree/update', //更新树数据post
    deleteTreeParameter:'/api/param/api/parameter-tree/delete', //删除树数据post(url)
    moveTreeParameter:'/api/param/api/parameter-tree/move', //树节点排序数据post(url)

    getRelateObject:'/api/param/api/parameterManage/relateObject', //获取管理对象POST(url)
}