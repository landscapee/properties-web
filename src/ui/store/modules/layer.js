/*
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2021-04-02 15:54:49
 * @LastEditors: yang fu ren
 * @LastEditTime: 2021-04-27 15:33:38
 */
const layer = {
    state: { 
        activeLayerList:[],
    },
    mutations: {
        setActiveLayer:(state,data)=>{
            state.activeLayerList = data
        },
    },
}

export default layer