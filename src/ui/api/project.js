/*
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2021-04-08 10:09:02
 * @LastEditors: yang fu ren
 * @LastEditTime: 2021-04-29 10:10:31
 */
export const project={
    createProject:'/project/api/project/createProject',       //创建项目post
    updateProject:'/project/api/project/updateProject',       //修改项目put
    deleteProject:'/project/api/project/deleteProject',       //删除项目delete
    getList:'/project/api/project/getList',                     //查询项目get
    getProjectsByManagerId:'/project/api/project/getProjectsByManagerId', //根据登录人id查询拥有项目 get
    createDataTable:'/project/api/project/dataTable/createDataTable',     // 创建post
    deleteDataTable:'/project/api/project/dataTable/deleteDataTable',      //删除delete
    updateDataTable:'/project/api/project/dataTable/updateDataTable',      //修改put
    getDataTableList:'/project/api/project/dataTable/getList',             //查询get
    design:'/project/api/project/dataTable/design',                        //设计保存post
    publish:'/project/api/project/dataTable/publish',                        //发布post
}