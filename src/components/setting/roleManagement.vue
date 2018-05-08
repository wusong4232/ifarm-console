<template>
    <div class="user-management-box">
        <div class="form-box">
            <el-form :inline="true" :model="searchFormData" class="demo-form-inline" size="mini">
                <el-form-item label="角色编码">
                    <el-input v-model="searchFormData.roleInfoDTO.roleCode" placeholder="角色编码"></el-input>
                </el-form-item>
                <el-form-item label="角色名称">
                    <el-input v-model="searchFormData.roleInfoDTO.roleName" placeholder="角色名称"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="searchFormData.roleInfoDTO.active" placeholder="请选择">
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
                    <el-button type="primary" @click="onDistributePermission" :disabled="disDisable">分配权限</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table-top">
            <el-table
                ref="multipleTable"
                :data="roleInfoDTOS"
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
                    prop="roleCode"
                    label="角色编码"
                    min-width="11%">
                </el-table-column>
                <el-table-column
                    prop="roleName"
                    label="角色名称"
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
                <el-form-item label="角色编码" prop="roleCode">
                    <el-input v-model="form.roleCode" auto-complete="off" :disabled="formColumnDisable"></el-input>
                </el-form-item>
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="form.roleName" auto-complete="off"></el-input>
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
        <el-dialog
            title="分配权限"
            :visible.sync="permissionDialogVisible"
            @close="closePermissionDialog"
            center>
            <el-tree
                :data="data5"
                show-checkbox
                node-key="id"
                default-expand-all
                :expand-on-click-node="false">
                  <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span>{{ node.label }}</span>
                    <div style="margin-right: 100px;">
                      <el-checkbox-group >
                        <el-checkbox v-for="item in data.permissions"  :label="item" :key="item"></el-checkbox>
                      </el-checkbox-group>
                    </div>
                  </span>
            </el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button @click="closePermissionDialog">取 消</el-button>
                <el-button type="primary" @click="handlePermissionSubmit">确 定</el-button>
              </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            const data = [{
            id: 1,
            label: '一级 1',
            permissions: ['菜单','新增','更新','删除'],
            children: [{
                        id: 4,
                        label: '二级 1-1',
                        permissions: ['菜单','新增','更新','删除'],
                        children: [{
                            id: 9,
                            label: '三级 1-1-1',
                            permissions: ['更新','删除'],
                        }, {
                            id: 10,
                            label: '三级 1-1-2',
                            permissions: ['菜单','新增','更新','删除'],
                        }]
                    }]
                }, {
                    id: 2,
                    label: '一级 2',
                    permissions: ['菜单','新增'],
                    children: [{
                        id: 5,
                        label: '二级 2-1',
                        permissions: ['菜单','新增','更新','删除'],
                    }, {
                        id: 6,
                        label: '二级 2-2',
                        permissions: ['菜单','新增','更新','删除'],
                    }]
                }, {
                    id: 3,
                    label: '一级 3',
                    permissions: ['菜单','新增','更新','删除'],
                    children: [{
                        id: 7,
                        label: '二级 3-1',
                        permissions: ['菜单','新增','更新','删除'],
                    }, {
                        id: 8,
                        label: '二级 3-2',
                        permissions: ['菜单','新增','更新','删除'],
                    }]
                }];
            return {
                data5: JSON.parse(JSON.stringify(data)),
                searchFormData:{
                    roleInfoDTO : {
                        roleCode: '',
                        roleName: '',
                        active: 'Y'
                    }
                },
                totalCount: 0,
                roleInfoDTOS: [],
                updateDisable: true,
                deleteDisable: true,
                disDisable: true,
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
                    roleCode: '',
                    roleName: '',
                    notes: '',
                    active: ''
                },
                rules: {
                    roleCode: [{
                        required: true, message: '请输入词条编码', trigger: 'blur'
                    }],
                    roleName: [{
                        required: true, message: '请输入词条名称', trigger: 'blur'
                    }]
                },
                permissionDialogVisible: false,
                props: {
                    tid:'',
                    code:'',
                    label:'',
                    isLeaf:''
                }
            }
        },
        methods: {
            //permission
            onDistributePermission(){
                this.permissionDialogVisible = true;
            },
            handlePermissionSubmit(){

            },
            closePermissionDialog(){
                this.permissionDialogVisible = false;
            },
            loadNode(node, resolve){
                if (node.level === 0) {
                    return resolve([{
                        code: 'console_1',
                        label: 'console系统',
                        nodeData: JSON.stringify(''),
                        isLeaf: false
                    }]);
                }
                if (node.level >= 1) {
                    let parentCode = node.data.code;
                    this.loadData(parentCode, resolve)
                }
            },
            loadData(parentCode, resolve) {
                this.$http.get(this.$global.remote().resourceFindByParentCode, {parentCode: parentCode}, response => {
                    let resources = response.result;
                    if (resources == null || resources == undefined || resources.length == 0) {
                        return resolve([]);
                    }
                    let temp = new Array();
                    for (let i = 0, len = resources.length; i < len; i++) {
                        let res = resources[i];
                        temp.push({
                            tid: res.tid,
                            code: res.resourceCode,
                            label: res.resourceName,
                            isLeaf: res.leafFlag == 'Y' ? true : false
                        })
                    }
                    return resolve(temp);
                }, fail => {
                    this.$message.error(fail.message);
                })
            },
            //role
            onSearch() {
                this.searchFormData.pageNo = this.currentPage;
                this.searchFormData.pageSize = this.pageSize;
                this.$http.post(this.$global.remote().roleList, this.searchFormData, response => {
                    this.roleInfoDTOS = response.result.roleInfoDTOS;
                    this.totalCount = response.result.totalCount;
                },fail => {
                    this.$message.error(fail.message);
                })
            },
            onAdd(){
                this.dialogTitle = '新增角色';
                this.dialogVisible = true;
                this.dialogCommand = 'add';
                this.formColumnDisable = false;
            },
            onUpdate() {
                if (this.multipleSelection.length > 1) {
                    this.$message({message:"只能选择其中一条数据进行修改",type: 'warning'});
                    return;
                }
                this.dialogTitle = '更新角色';
                this.dialogCommand = 'update';
                this.formColumnDisable = true;
                let tid = this.multipleSelection[0].tid;
                this.$http.get(this.$global.remote().roleFind, {tid:tid}, response => {
                    this.form = response.result;
                    this.dialogVisible = true;
                }, fail => {
                    this.$message.error(fail.message);
                })
            },
            handleSubmit(){
                let url = '';
                let param = {}
                param.roleInfoDTO = this.form;
                if (this.dialogCommand == 'add') {
                    url = this.$global.remote().roleAdd;
                } else if (this.dialogCommand == 'update') {
                    url = this.$global.remote().roleUpdate;
                }
                this.$http.post(url, param, response => {
                    this.closeDialog();
                    this.onSearch();
                    this.$global.flashRoleStore();
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
                    this.$http.post(this.$global.remote().roleDelete, {ids: array}, response => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.onSearch();
                        this.$global.flashRoleStore();
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
                    this.disDisable = false;
                } else {
                    this.updateDisable = true;
                    this.deleteDisable = true;
                    this.disDisable = true;
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
                this.resetForm();
            },
            resetForm(){
                this.form = {
                    tid: '',
                    roleCode: '',
                    roleName: '',
                    notes: '',
                    active: ''
                }
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
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
</style>
