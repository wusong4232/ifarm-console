import router from './router';
import VueCookie from "vue-cookie";


router.beforeEach((to,from,next)=>{
    if(VueCookie.get("userName")==="admin"){
        next()
    }else {
        if(to.path==="/login"){
            next()
        }else {
            next("/login")
        }

    }
});
