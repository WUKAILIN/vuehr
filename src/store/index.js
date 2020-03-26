import Vue from "vue"
import Vuex from "vuex"
//用以管理应用状态
Vue.use(Vuex);
export default new Vuex.Store({
    state:{
        //响应数据数组(菜单项)
        routes:[]
    },
    mutations:{
        /*
          响应数据数组赋值
          state:待赋值数据数组
          data:响应数据
         */
        initRoutes(state,data)
        {
          state.routes=data;
        }
    },
    actions:{}
})