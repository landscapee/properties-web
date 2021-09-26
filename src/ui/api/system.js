/*
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2021-09-07 10:40:06
 * @LastEditors: yang fu ren
 * @LastEditTime: 2021-09-15 14:21:29
 */
export const system={
    save:'/api/param/system/save', //参数添加post(body)
    update:'/api/param/system/update', //分类修改post(body)
    delete:'/api/param/system/delete', //分类删除POST(url)
    getAll:'/api/param/system/getAllBySystemId', //获取分类post（url）
    moveCategories:'/api/param/system/move', //psot(body)
}