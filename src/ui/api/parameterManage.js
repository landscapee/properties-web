/*
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2021-04-01 10:33:58
 * @LastEditors: yang fu ren
 * @LastEditTime: 2021-07-19 09:50:38
 * 参数管理
 */
export const parameterManage={
    add:'/api/parameterManage/add', //参数添加post
    update:'/api/parameterManage/update', //参数更新post
    delete:'/api/parameterManage/delete', //参数删除
    parentOptions:'/api/parameterManage/options', //post(url)上级参数
    getList:'/api/parameterManage/list', //获取参数列表post
    getParameterInfo:'/api/parameterManage/get', //获取参数信息post
    setObjParameter:'/api/parameter-object/set', //POST对象设值
    moveParameter:'/api/parameterManage/move', //参数排序

    getObjParameter:'/api/parameter-object/get', //获取对象的值POST
    getTextParameter:'/api/parameter-text/get', //获取单值数据post
    setTextParameter:'/api/parameter-text/set', //获取单值数据post
    
    getListParameter:'/api/parameter-list/get', //获取列表数据post
    addListParameter:'/api/parameter-list/add', //新增列表数据post
    updateListParameter:'/api/parameter-list/update', //编辑列表数据post
    deleteListParameter:'/api/parameter-list/delete', //删除列表数据post（url）
    moveListParameter:'/api/parameter-list/move', //列表排序

    getTreeParameter:'/api/parameter-tree/get', //获取树数据post
    addTreeParameter:'/api/parameter-tree/add', //添加树数据post
    updateTreeParameter:'/api/parameter-tree/update', //更新树数据post
    deleteTreeParameter:'/api/parameter-tree/delete', //删除树数据post(url)
    moveTreeParameter:'/api/parameter-tree/move', //树节点排序数据post(url)


}