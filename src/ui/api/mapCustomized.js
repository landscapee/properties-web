/*
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2021-04-08 09:39:35
 * @LastEditors: yang fu ren
 * @LastEditTime: 2021-04-08 16:21:15
 */
export const mapCustomized={
    createCategory:'/api/projectLayer/createCategory', //创建分类post
    updateCategory:'/api/projectLayer/updateCategory', //修改分类put
    deleteCategory:'/api/projectLayer/deleteCategory', //删除分类delete
    getCategories:'/api/projectLayer/getCategories',   //查询图层分类get
    moveCategory:'/api/projectLayer/moveCategory',     //上下移动分类post
    addLayers:'/api/projectLayer/addLayers',           //创建图层post
    deleteLayer:'/api/projectLayer/deleteLayer',        //删除图层delete
    moveLayer:'/api/projectLayer/moveLayer',            //移动图层 post
    saveMapConfig:'/api/projectLayer/saveMapConfig',    //添加地图配置post
    updateMapConfig:'/api/projectLayer/updateMapConfig', //修改地图配置put
    getMapConfig:'/api/projectLayer/getMapConfig',      //查询地图配置get
    selected:'/api/projectLayer/selected',              //默认选中图层post
    getLayerList:'/api/projectLayer/getLayerList',      //查询选择图层get
    getMap:'/api/projectMap/getLayerList',              //根据项目id查询图层分类及图层信息get
}