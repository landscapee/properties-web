/*
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2021-04-12 10:04:47
 * @LastEditors: yang fu ren
 * @LastEditTime: 2021-04-12 10:15:50
 */
const project={
    state:{
        currentProject:''
    },
    mutations:{
        setCurrentProject:(state,data)=>{
            state.currentProject=data;
        }
    }
}
export default project;