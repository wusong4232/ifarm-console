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

                this.$http.post('/login', params, response => {
                    localStorage.Authorization = response.result.Authorization;
                    this.getUserInfo();
                },fail =>{
                    self.tips = fail.message;
                });
            } ,
            getUserInfo: function () {
                let self = this;
                self.$http.get("/userInfo",null,response => {
                    if (self.$tools.isNotEmpty(response.result)) {
                        let userInfo = response.result.userInfoDTO;
                        let userMenu = response.result.userMenus;
                        self.$cookie.set('userName',userInfo.userName,{expires:"30m"});
                        self.$cookie.set('userInfo', JSON.stringify(userInfo));
                        self.$cookie.set('userMenu', JSON.stringify(userMenu));
                        this.$store.commit("saveUserInfo", userInfo);
                        this.$store.commit("saveUserMenu", userMenu);
                        self.$router.push('/home/index');
                    }
                },fail => {
                    console.log(fail);
                })
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
