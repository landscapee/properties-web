/*
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2021-04-06 09:55:07
 * @LastEditors: yang fu ren
 * @LastEditTime: 2021-04-15 15:44:10
 */
export const layerDraft={
    layerDraftCreate:'/api/layerDraft/create',       //创建项目post
    layerDraftUpdate:'/api/layerDraft/update',       //修改项目put
    layerDraftDelete:'/api/layerDraft/delete',       //删除项目delete
    layerDraftPublish:'/api/layerDraft/publish',     //发布图层POST
    layerDraftGetList:'/api/layerDraft/getList', //查询列表 get
    againPublish:'/api/layerDraft/againPublish', //post
    setLayerConfig:'/api/layerDraft/setLayerConfig', //设置全局样式 post
   
}