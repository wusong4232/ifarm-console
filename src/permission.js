import router from './router';
import VueCookie from "vue-cookie";


router.beforeEach((to,from,next)=>{
    console.log(VueCookie.get("userName"));
    if(VueCookie.get("userName")==="admin"){
        next()
    }else {
        if(to.path==="/login"){
            next()
        }else {
            console.log("a");
            next("/login")
        }

    }
});
