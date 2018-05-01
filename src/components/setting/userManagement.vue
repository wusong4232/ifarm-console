<template>
    <div class="user-management-box">
        <div class="form-box">
            <el-form :inline="true" :model="searchFormData" class="demo-form-inline" size="mini">
                <el-form-item label="用户名">
                    <el-input v-model="searchFormData.userInfoDTO.userName" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item label="用户昵称">
                    <el-input v-model="searchFormData.userInfoDTO.nickName" placeholder="用户昵称"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="searchFormData.userInfoDTO.mobileNo" placeholder="手机号"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="searchFormData.userInfoDTO.active" placeholder="请选择">
                        <el-option label="--全部--" value=""></el-option>
                        <el-option v-for="item in activeItems" :label="item.valueName" :value="item.valueCode" :key="item.valueCode"></el-option>
                    </el-select>
                </el-form-item>
                <br/>
                <el-form-item >
                    <el-button type="primary" @click="onSearch">查询</el-button>
                    <el-button type="primary" @click="onAdd">新增</el-button>
                    <el-button type="primary" @click="onUpdate" :disabled="updateDisable">修改</el-button>
                    <el-button type="primary" @click="onDelete" :disabled="deleteDisable">删除</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table-top">
            <el-table
                ref="multipleTable"
                :data="userInfoDTOS"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                @row-click="rowClick"
                @row-dblclick="rowDblClick"
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
                    :formatter="handleActive"
                    label="状态"
                    min-width="11%">
                </el-table-column>
            </el-table>
        </div>
        <div class="pagination">
            <el-pagination
                small
                background
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleSizeChange"
                @current-change="handleCurrentPageChange"
                :page-size="pageSize"
                :current-page="currentPage"
                :total="totalCount">
            </el-pagination>
        </div>
        <el-dialog
            :title="dialogTitle"
            :visible.sync="dialogVisible"
            @close="closeDialog"
            center>
            <el-form label-width="80px" :model="form" :rules="rules" ref="form" size="small" :inline="true">
                <el-input type="hidden" v-model="form.tid" auto-complete="off"></el-input>
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="form.userName" auto-complete="off" :disabled="formColumnDisable"></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="nickName">
                    <el-input v-model="form.nickName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password" auto-complete="off" :disabled="formColumnDisable"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="form.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="mobileNo">
                    <el-input v-model="form.mobileNo" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="工号" prop="empCode">
                    <el-input v-model="form.empCode" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="部门" prop="deptCode">
                    <el-input v-model="form.deptCode" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="form.active" placeholder="请选择">
                        <el-option v-for="item in activeItems" :label="item.valueName" :value="item.valueCode" :key="item.valueCode"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="form.notes" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">取 消</el-button>
                <el-button type="primary" @click="handleSubmit">确 定</el-button>
              </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                searchFormData:{
                    userInfoDTO : {
                        userName: '',
                        nickName: '',
                        mobileNo: '',
                        active: 'Y'
                    }
                },
                totalCount: 0,
                userInfoDTOS: [],
                updateDisable: true,
                deleteDisable: true,
                //多选数组
                multipleSelection: [],
                currentPage: 1,
                pageSize: 10,
                dialogTitle: '',
                dialogVisible: false,
                dialogCommand: '',
                formLabelWidth: '120px',
                formColumnDisable: false,
                form: {
                    tid: '',
                    userName: '',
                    password: '',
                    nickName: '',
                    email: '',
                    mobileNo: '',
                    empCode: '',
                    deptCode: '',
                    notes: '',
                    active: ''
                },
                rules: {
                    userName: [{
                        required: true, message: '请输入用户名', trigger: 'blur'
                    }],
                    password: [{
                        required: true, message: '请输入密码', trigger: 'blur'
                    }/*,{
                        min: 6, max: 15, message: '长度在 6 到 15 个字符'
                    }*/],
                    nickName: [{
                        required: true, message: '请输入用户昵称', trigger: 'blur'
                    }],
                    email: [{
                        required: true, message: '请输入邮箱', trigger: 'blur'
                    }, {
                        validator: function (rule, value, callback) {
                            /*if (!this.$tools.isMail(value)) {
                                callback(new Error("请输入邮箱"));
                            } else {
                                callback();
                            }*/
                        }
                    }],
                    mobileNo:[{
                        required: true, message: '请输入手机号', trigger: 'blur'
                    },{
                        validator:function(rule,value,callback){
                            /*if(!this.$tools.isMobileNo(value)){
                                callback(new Error("请输入手机号"));
                            }else{
                                callback();
                            }*/
                        }
                    }],
                    empCode: [{
                        required: true, message: '请输入工号', trigger: 'blur'
                    }],
                    deptCode: [{
                        required: true, message: '请输入部门', trigger: 'blur'
                    }]
                }
            }
        },
        methods: {
            onSearch() {
                this.searchFormData.pageNo = this.currentPage;
                this.searchFormData.pageSize = this.pageSize;
                this.$http.post(this.$global.remote().userList, this.searchFormData, response => {
                    this.userInfoDTOS = response.result.userInfoDTOS;
                    this.totalCount = response.result.totalCount;
                },fail => {
                    this.$message.error(fail.message);
                })
            },
            onAdd(){
                this.dialogTitle = '新增用户';
                this.dialogVisible = true;
                this.dialogCommand = 'add';
                this.formColumnDisable = false;
            },
            onUpdate() {
                if (this.multipleSelection.length > 1) {
                    this.$message({message:"只能选择其中一条数据进行修改",type: 'warning'});
                    return;
                }
                this.dialogTitle = '更新用户';
                this.dialogVisible = true;
                this.dialogCommand = 'update';
                this.formColumnDisable = true;
                let tid = this.multipleSelection[0].tid;
                this.$http.get(this.$global.remote().userFind, {tid:tid}, response => {
                    this.form = response.result;
                }, fail => {
                    this.$message.error(fail.message);
                })
            },
            handleSubmit(){
                let url = '';
                let param = {}
                param.userInfoDTO = this.form;
                if (this.dialogCommand == 'add') {
                    url = this.$global.remote().userAdd;
                } else if (this.dialogCommand == 'update') {
                    url = this.$global.remote().userUpdate;
                }
                this.$http.post(url, param, response => {
                    this.closeDialog();
                    this.onSearch();
                }, fail => {
                    this.$message.error(fail.message);
                })
            },
            onDelete() {
                this.$confirm('确认删除选中数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var array = [];
                    this.multipleSelection.forEach((item) => {
                        array.push(item.tid);
                    });
                    this.$http.post(this.$global.remote().userDelete, {ids: array}, response => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.onSearch();
                    }, fail => {
                        this.$message.error(fail.message);
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                if (val.length > 0) {
                    this.updateDisable = false;
                    this.deleteDisable = false;
                } else {
                    this.updateDisable = true;
                    this.deleteDisable = true;
                }

            },
            handleSizeChange(pageSize) {
                this.pageSize = pageSize;
                this.onSearch();
            },
            handleCurrentPageChange(currentPage) {
                this.currentPage = currentPage;
                this.onSearch();
            },
            rowClick(row, event, column){
                this.$refs.multipleTable.toggleRowSelection(row);
            },
            rowDblClick(row, event){
            },
            closeDialog(){
                this.dialogVisible = false;
                this.$refs.form.resetFields();
            },
            handleActive(row, column, cellValue, index){
                return this.$global.transformActive(cellValue);
            }
        },
        computed : {
            activeItems(){
                return this.$global.getTermsValueStore('DATA_STATUE');
            }
        }
    }
</script>

<style scoped="scoped">
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
    .el-form input {
        width: 190px;
    }
    .el-form textarea {
        width: 475px;
    }
</style>
