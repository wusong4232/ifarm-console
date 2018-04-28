<template>
    <div>
        <div class="form-box">
            <el-form :inline="true" :model="formData" class="demo-form-inline" size="mini">
                <el-form-item label="用户名">
                    <el-input v-model="formData.userInfoDTO.userName" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item label="用户昵称">
                    <el-input v-model="formData.userInfoDTO.nickName" placeholder="用户昵称"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="formData.userInfoDTO.mobileNo" placeholder="手机号"></el-input>
                </el-form-item>
                <el-form-item label="是否有效">
                    <el-select v-model="formData.userInfoDTO.active" placeholder="请选择">
                        <el-option label="是" value="Y"></el-option>
                        <el-option label="否" value="N"></el-option>
                    </el-select>
                </el-form-item>
                <br/>
                <el-form-item >
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                    <el-button type="primary" @click="onSubmit">新增</el-button>
                    <el-button type="primary" @click="onSubmit">修改</el-button>
                    <el-button type="primary" @click="onSubmit">删除</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table-top">
            <el-table
                :data="userInfoDTOS"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                size="small"
            >
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    prop="userName"
                    label="用户名"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="nickName"
                    label="昵称"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="email"
                    label="邮箱"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="mobileNo"
                    label="手机号"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="empCode"
                    label="工号"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="deptCode"
                    label="部门"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="notes"
                    label="备注"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="active"
                    label="是否可用"
                    width="120">
                </el-table-column>
            </el-table>
        </div>
        <div class="pagination">
            <el-pagination
                small
                background
                layout="prev, pager, next"
                :total="totalCount">
            </el-pagination>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                formData:{
                    userInfoDTO : {
                        userName: '',
                        nickName: '',
                        mobileNo: '',
                        active: ''
                    }
                },
                totalCount: 0,
                userInfoDTOS: [],
                multipleSelection: []
            }
        },
        methods: {
            onSubmit() {
                this.$http.post("/user/list", this.formData, response => {
                    this.userInfoDTOS = response.result.userInfoDTOS;
                    this.totalCount = response.result.totalCount;
                },fail => {
                    console.log(fail);
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                console.log(this.multipleSelection);
            }
        }
    }
</script>

<style scoped>
    .form-box{
        width: 100%;
    }
    .table-top{
        border-top: 1px solid #eee;
        height: 450px;
        min-height: 450px;
    }
    .pagination{
        text-align: center;
    }
</style>
