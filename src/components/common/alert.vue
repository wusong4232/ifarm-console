<template>
    <el-button type="text" v-if="false">btn</el-button>
</template>

<script>
    export default {
        methods: {
            open() {
                this.$alert('您还没有登录，请点击确认按钮进行登录！', '提示', {
                    confirmButtonText: '确定',
                    callback: () => {
                        this.$router.push("/login");
                    }
                });
            }
        },
/*        computed:{
            alertInfo:function () {
                return Boolean(this.$cookie.get("userName"))||false;
            }
        },*/
        mounted() {
            var status=this.$store.state.loadSuccess.success;
            console.log(status);
            console.log(this.$cookie.get("userName"));
            /*console.log(userName);*/
            /*console.log(!Boolean(this.$cookie.get("userName")));
            console.log(this.$cookie.get("userName"));*/
            if (!status||!Boolean(this.$cookie.get("userName"))) {
                console.log(1);
                    this.open();
            }
            /*
                        this.$store.commit("add_loadSuccess_info",{"userName":});
                        console.log(this.$store.state.loadSuccess.result.userName);
            */
            /*console.log(this.$cookie.get("userName"));
            if(this.$store.state.loadSuccess.result.userName!==this.$cookie.get("userName")){
                this.open();
            }*/
        }
    }
</script>

<style scoped>

</style>
