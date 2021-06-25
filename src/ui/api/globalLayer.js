/*
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2021-04-01 10:33:58
 * @LastEditors: yang fu ren
 * @LastEditTime: 2021-05-12 10:17:52
 * 图层管理
 */
export function globalLayerRequest(){
    return {
        deleteCategory:'/api/globalLayer/deleteCategory', //删除分类delete
        updateCategory:'/api/globalLayer/updateCategory', //修改分类put
        createCategory:'/api/globalLayer/createCategory', //创建分类post
        getCategories:'/api/globalLayer/getCategories',   //获取分类get
        moveCategories:'/api/globalLayer/move',           //移动分类post
        createLayer:'/api/globalLayer/createLayer',       //创建图层post
        updateLayer:'/api/globalLayer/updateLayer',       //修改图层put
        deleteLayer:'/api/globalLayer/deleteLayer',       //删除图层 delete
        getLayerList:'/api/globalLayer/getLayerList',     //获取图层get
        getLayerAll:'/api/globalLayer/getLayerAll',       //获取所有图层get
        getLayerConfig:'/api/globalLayer/getLayerConfig', //获取图层全局样式 get
        setLayerConfig:'/api/globalLayer/setLayerConfig', //set图层全局样式 post
        moveLayer:'/api/globalLayer/moveLayer', // post
        updateLayerCategory:'/api/globalLayer/updateLayerCategory', //post移动图层
    }
}
