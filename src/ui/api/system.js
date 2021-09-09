/*
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2021-09-07 10:40:06
 * @LastEditors: yang fu ren
 * @LastEditTime: 2021-09-09 14:25:49
 */
export const system={
    save:'/api/param/api/system/save', //参数添加post(body)
    update:'/api/param/api/system/update', //分类修改post(body)
    delete:'/api/param/api/system/delete', //分类删除POST(url)
    getAll:'/api/param/api/system/getAllBySystemId', //获取分类post（url）
    moveCategories:'/api/param/api/system/move', //psot(body)
}