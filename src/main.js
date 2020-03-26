
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI, {Message} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {postKeyValueRequest} from "./utils/api";
import {postRequest} from "./utils/api";
import {getRequest} from "./utils/api";
import {deleteRequest} from "./utils/api";
import {putRequest} from "./utils/api";
import {initMenu} from "./utils/menus";
import 'font-awesome/css/font-awesome.min.css'
 Vue.prototype.postKeyValueRequest=postKeyValueRequest;
Vue.prototype.postRequest=postRequest;
Vue.prototype.getRequest=getRequest;
Vue.prototype.putRequest=putRequest;
Vue.prototype.deleteRequest=deleteRequest;

Vue.config.productionTip = false
Vue.use(ElementUI);
/*
全局导航守卫
导航：表示路由信息正在发生改变
导航守卫：导航开始变化到导航变化结束过程中，根据导航变化做出响应
to:去哪里
from:从哪来
next:往下走
 */
router.beforeEach((to, from, next) => {
    //目的地路径为'/'表示登出
    if (to.path == '/') {
        next();
    }else {
        /*
           sessionStorage.getItem("user"):sessionStorage中存在登录用户信息
         */
        if(window.sessionStorage.getItem("user")){
            initMenu(router,store);
            next();
        }
        else
        {
            Message.error({message: '无法在未登录情况下对系统进行操作，请登录'});
            //登录成功后重定向至未登录前浏览器请求路径
            next('/?redirect='+to.path);
        }

    }
})
new Vue({
    router,
    store,
  render: h => h(App)
}).$mount('#app')
