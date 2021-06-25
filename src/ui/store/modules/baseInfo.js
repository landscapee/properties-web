/*
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2021-03-30 09:47:54
 * @LastEditors: yang fu ren
 * @LastEditTime: 2021-04-02 09:28:13
 * 保存一些路由用的基本配置
 */
const baseInfo = {
    state: { 
        headerNavActive:'',
    },
    mutations: {
        setActive:(state,data)=>{
            state.headerNavActive = data
        },
    },
    // getters: {
    //     getHeaderNavActive:(state)=>{
    //         return state.headerNavActive
    //     }
    // }
}

export default baseInfo