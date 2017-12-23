/**
 * Created by Administrator on 2017/2/15.
 */
//1.0导入vue
import Vue from 'Vue';
//2.0导入App.vue
import App from '../App.vue';

//3.0创建路由对象
Vue.use(App);
//4.0引入组件
improt login from './';
import register from './';

//5.
var router = new VueRouter({
    routes:[
        {paht:"/",component:""},
        {paht:"/",component:""}
    ]

})
//6 使路由生效
new Vue({
    el:"#app",
    router:router
})