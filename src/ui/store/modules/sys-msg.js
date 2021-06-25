const sysMsg = {
    state: { 
        userMsg:null
    },
    mutations: {
        setUserMsg:(state,data)=>{
            state.userMsg = data
        }
    },
    getters: {
        getUserMsg:(state)=>{
            return state.userMsg
        }
    }
}

export default sysMsg