import Vue from 'vue';
import App from './App';
import router from './router';//引入router下的index.js文件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
import store from "./store/index.js"
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";
import apiAxios from './apiaxios';
import VueCookie from "vue-cookie";
import "./permission";

Vue.prototype.$http = apiAxios;
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueCookie);

const vue = new Vue({
    router,
    store,
    render: h => h(App),
    mounted() {
        this.$nextTick(function () {
            window.addEventListener('beforeunload', this.windowRefresh());
        })
    },
    methods: {
        windowRefresh: function () {
            var localStorageObj;
            var domRoute=window.location.hash.substr(1);
            console.log(domRoute);
            if(domRoute==="/"||domRoute==="/login"){
                this.$cookie.set('userName',"");
            }
            this.$store.commit('add_tabs', {route: '/home/index', name: '首页'});
            this.$store.commit('set_active_index', '/home/index');
            if(domRoute!=="/"&&domRoute!=="/login"){
                localStorageObj=JSON.parse(localStorage.getItem("loadSuccessInfo"));
                this.$store.commit("add_loadSuccess_info",localStorageObj);
                this.$router.push('/home/index');
            }


// TODO:为什么刷新后这里的this.$route.path始终是"/"呢，所以先用dom方法判断

/*            if(this.$route.path==="/"){
                this.$cookie.set('userName',"");
            }
            this.$store.commit('add_tabs', {route: '/home/index', name: '首页'});
            this.$store.commit('set_active_index', '/home/index');
            // if(this.$route.path!=="/"){
                this.$router.push('/home/index');*/
            // }
/*
            if(this.$router!=="/login"){
                this.$store.commit('add_tabs', {route: '/home', name: '首页'});
                this.$store.commit('set_active_index', '/home');
                this.$router.push('/home');
            }
*/
        }
    }
}).$mount('#app');
