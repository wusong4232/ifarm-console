<template>
    <div class="login-wrap">
        <div class="ms-title">后台管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <p style="font-size:12px;line-height:30px;color:#999;">Tips : {{tips}}</p>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                tips:'请填写正确的用户名和密码登录。',
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                const self = this;
                let params = {
                    userName: self.ruleForm.username,
                    password: self.ruleForm.password
                };
                // self.$cookie.set('userName',"admin",{expires:"30m"});
                // self.$router.push('/home/index');

                // this.$http.get('userMenu');

                this.$http.post('/login', params, response => {
                    console.log(response);
                    // self.$cookie.set('userName',response.result.userName,{expires:"30m"});
                    // this.$store.commit("add_loadSuccess_info",response);
                    // let localStorageStr=JSON.stringify(response);
                    // console.log(localStorageStr);
                    // localStorage.loadSuccessInfo=localStorageStr;
                    localStorage.Authorization = response.result.Authorization;
                    console.log("token:" + localStorage.token);
                    this.getUserInfo();
                },fail =>{
                    console.log(fail);
                    let localStorageStr=JSON.stringify(fail);
                    localStorage.loadSuccessInfo=localStorageStr;
                    let localStorageObj=JSON.parse(localStorage.getItem("loadSuccessInfo"));
                    this.$store.commit("add_loadSuccess_info",localStorageObj);
                    self.tips = fail.resMsg;
                });
            } ,
            getUserInfo: function () {
                this.$http.get("/userInfo",null,response => {
                    console.log(response);
                },fail => {
                    console.log(fail);
                })
                self.$router.push('/home/index');
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>
