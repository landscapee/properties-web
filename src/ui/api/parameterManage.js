/*
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2021-04-01 10:33:58
 * @LastEditors: yang fu ren
 * @LastEditTime: 2021-09-15 14:21:18
 * 参数管理
 */
export const parameterManage={
    add:'/api/param/parameterManage/add', //参数添加post
    update:'/api/param/parameterManage/update', //参数更新post
    delete:'/api/param/parameterManage/delete', //参数删除
    parentOptions:'/api/param/parameterManage/options', //post(url)上级参数
    getList:'/api/param/parameterManage/list', //获取参数列表post
    getParameterInfo:'/api/param/parameterManage/get', //获取参数信息post
    setObjParameter:'/api/param/parameter-object/set', //POST对象设值
    moveParameter:'/api/param/parameterManage/move', //参数排序post(body)

    getObjParameter:'/api/param/parameter-object/get', //获取对象的值POST
    getTextParameter:'/api/param/parameter-text/get', //获取单值数据post
    setTextParameter:'/api/param/parameter-text/set', //获取单值数据post
    
    getListParameter:'/api/param/parameter-list/get', //获取列表数据post
    addListParameter:'/api/param/parameter-list/add', //新增列表数据post
    updateListParameter:'/api/param/parameter-list/update', //编辑列表数据post
    deleteListParameter:'/api/param/parameter-list/delete', //删除列表数据post（url）
    moveListParameter:'/api/param/parameter-list/move', //列表排序

    getTreeParameter:'/api/param/parameter-tree/get', //获取树数据post
    addTreeParameter:'/api/param//parameter-tree/add', //添加树数据post
    updateTreeParameter:'/api/param/parameter-tree/update', //更新树数据post
    deleteTreeParameter:'/api/param/parameter-tree/delete', //删除树数据post(url)
    moveTreeParameter:'/api/param/parameter-tree/move', //树节点排序数据post(url)

    getRelateObject:'/api/param/parameterManage/relateObject', //获取管理对象POST(url)
}