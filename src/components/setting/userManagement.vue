<template>
    <div>
        <div class="form-box">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="用户名">
                    <el-input v-model="formInline.userName" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item label="用户昵称">
                    <el-input v-model="formInline.nickName" placeholder="用户昵称"></el-input>
                </el-form-item>
                <el-form-item label="是否有效">
                    <el-select v-model="formInline.active" placeholder="请选择">
                        <el-option label="是" value="Y"></el-option>
                        <el-option label="否" value="N"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                formInline: {
                    userInfoDTO : {
                        user: '',
                        nickName: '',
                        active: ''
                    }
                }
            }
        },
        methods: {
            onSubmit() {
                this.$http.post("/user/list", this.formInline, response => {
                    console.log(response);
                },fail => {
                    console.log(fail);
                })
            }
        }
    }
</script>

<style>
</style>
