<template>
    <div class="user-management-box">
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
                <el-form-item label="状态">
                    <el-select v-model="formData.userInfoDTO.active" placeholder="请选择">
                        <!--<el-option label="是" value="Y"></el-option>-->
                        <!--<el-option label="否" value="N"></el-option>-->
                        <el-option v-for="item in activeItems" :label="item.valueName" :value="item.valueCode" :key="item.valueCode"></el-option>
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
                size="mini"
            >
                <el-table-column
                    type="selection"
                    min-width="5%">
                </el-table-column>
                <el-table-column
                    prop="userName"
                    label="用户名"
                    min-width="11%">
                </el-table-column>
                <el-table-column
                    prop="nickName"
                    label="昵称"
                    min-width="11%">
                </el-table-column>
                <el-table-column
                    prop="email"
                    label="邮箱"
                    min-width="17%">
                </el-table-column>
                <el-table-column
                    prop="mobileNo"
                    label="手机号"
                    min-width="11%">
                </el-table-column>
                <el-table-column
                    prop="empCode"
                    label="工号"
                    min-width="11%">
                </el-table-column>
                <el-table-column
                    prop="deptCode"
                    label="部门"
                    min-width="11%">
                </el-table-column>
                <el-table-column
                    prop="notes"
                    label="备注"
                    min-width="11%">
                </el-table-column>
                <el-table-column
                    prop="active"
                    label="是否可用"
                    min-width="11%">
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
            }
        },
        computed : {
            activeItems(){
                return this.$global.getTermsValueStore('ACTIVE');
            }
        }
    }
</script>

<style>
    .user-management-box{
        width: 100%;
        min-width: 1000px;
    }
    .form-box{
        width: 100%;
    }
    .table-top{
        border-top: 1px solid #eee;
    }
    .pagination{
        text-align: center;
    }
    tr div{
        overflow: hidden !important;
        text-overflow:ellipsis !important;
        white-space: nowrap !important;
    }

</style>
