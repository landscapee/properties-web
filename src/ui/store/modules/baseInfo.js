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
        gisInfo:{
            coordinates:[],
            type:''
        }
    },
    mutations: {
        setActive:(state,data)=>{
            state.headerNavActive = data
        },
        setGisInfo:(state,data)=>{
            console.log('设置gis')
            console.log(data)
            state.gisInfo=Object.assign({},state.gisInfo,data)
        }
    },
    // getters: {
    //     getHeaderNavActive:(state)=>{
    //         return state.headerNavActive
    //     }
    // }
}

export default baseInfo