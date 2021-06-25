/*
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2021-03-29 14:34:12
 * @LastEditors: yang fu ren
 * @LastEditTime: 2021-04-27 17:24:04
 */
const getters={
    permission_routes:(state) => state.permission.routes,
    headerNavActive:(state)=>state.baseInfo.headerNavActive,
    token: (state) => state.user.token,
    leftNavItems:(state)=>{
        let r=state.permission.routes.find((item)=>{
            return item.code===state.baseInfo.headerNavActive
          });
        return r.children
    },
    //获取已经选中的图层
    activeLayerList:(state)=>state.layer.activeLayerList,
    userInfo:(state)=>state.user.userInfo,
    currentProject:(state)=>state.project.currentProject,
};
export default getters