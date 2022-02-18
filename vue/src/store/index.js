import { createStore } from "vuex"

const store = createStore({    
    state:{
        user:{
            data:{name:"João"},
            token:true
        }
    },
    getters:{},
    actions:{},
    mutations:{},
    modules:{}
})

export default store;