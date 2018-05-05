<template>
    <div class="user-management-box">
        <div class="form-box">
            <el-form :inline="true" size="mini">
                <el-form-item >
                    <el-button type="primary" @click="onAdd">新增菜单</el-button>
                    <el-button type="primary" @click="onUpdate" :disabled="updateDisable">修改菜单</el-button>
                    <!--<el-button type="primary" @click="onDelete" :disabled="deleteDisable">删除</el-button>-->
                    <el-button type="primary" @click="onUpdate" :disabled="addPermissionDisable">新增权限</el-button>
                    <el-button type="primary" @click="onDelete" :disabled="updatePermissionDisable">修改权限</el-button>
                    <el-button type="primary" @click="onDelete" :disabled="deletePermissionDisable">删除权限</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div>
            <el-container style="border: 1px solid #eee" class="form-container">
                <div class="form-div">
                    <el-form :inline="true" size="mini">
                        <el-form-item style="width: 100px;">
                            <el-input placeholder="菜单名称"></el-input>
                        </el-form-item>
                        <el-form-item >
                            <el-button type="primary" @click="onAdd">查询</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="form-aside">
                    <el-tree
                        lazy
                        show-checkbox
                        ref="tree"
                        node-key="id"
                        :check-strictly="checkStrictly"
                        :load="loadNode"
                        :props="defaultProps"
                        :default-expand-all="defaultExpand"
                        @check-change="handleCheckChange"
                        @node-expand="handleNodeExpand"
                        @node-collapse="handleNodeCollapse"
                        @node-click="handleNodeClick">
                    </el-tree>
                </div>
                <div class="form-container">
                    <div class="container-top">菜单基本信息</div>
                    <el-container>
                        <el-main style="padding: 20px;height: 320px;">
                            <el-form label-position="right" label-width="110px" :model="nodeData" size="small" :inline="false">
                                <div class="from-item-container">
                                    <div class="form-item-left">
                                        <el-form-item label="菜单编码：">
                                            {{nodeData.resourceCode}}
                                        </el-form-item>
                                        <el-form-item label="菜单名称：">
                                            {{nodeData.resourceName}}
                                        </el-form-item>
                                        <el-form-item label="父级编码：">
                                            {{nodeData.parentCode}}
                                        </el-form-item>
                                        <el-form-item label="菜单路由：">
                                            {{nodeData.router}}
                                        </el-form-item>
                                        <el-form-item label="菜单组件：">
                                            {{nodeData.component}}
                                        </el-form-item>
                                        <el-form-item label="菜单图标：">
                                            {{nodeData.nodeIcon}}
                                        </el-form-item>
                                    </div>
                                    <div class="form-item-right">
                                        <el-form-item label="菜单层级：">
                                            {{resourceLevelShow}}
                                        </el-form-item>
                                        <el-form-item label="菜单类型：">
                                            {{resourceTypeShow}}
                                        </el-form-item>

                                        <el-form-item label="展示顺序：">
                                            {{nodeData.displayOrder}}
                                        </el-form-item>
                                        <el-form-item label="是否叶子节点：">
                                            {{leafFlagShow}}
                                        </el-form-item>
                                        <el-form-item label="是否有效：">
                                            {{activeShow}}
                                        </el-form-item>
                                        <el-form-item label="备注：">
                                            {{nodeData.notes}}
                                        </el-form-item>
                                    </div>
                                </div>
                            </el-form>
                        </el-main>
                    </el-container>
                    <div class="container-top mt20">权限信息</div>
                    <el-container>
                        <el-main style="padding: 20px;height: 320px;">
                            <el-checkbox-group>
                                <el-checkbox v-for="item in nodeData.permissions" :label="item.permissionName" :key="item.permissionCode"></el-checkbox>
                            </el-checkbox-group>
                        </el-main>
                    </el-container>
                </div>
            </el-container>
        </div>
        <el-dialog
            :title="resourceDialogTitle"
            :visible.sync="resourceDialogVisible"
            @close="resourceCloseDialog"
            center>
            <el-form label-width="120px" :model="form" :rules="rules" ref="form" size="small" :inline="true">
                <el-input type="hidden" v-model="form.tid" auto-complete="off"></el-input>
                <el-form-item label="菜单编码：">
                    <el-input v-model="form.resourceCode" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="菜单名称：">
                    <el-input v-model="form.resourceName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="父级菜单：">
                    <el-select v-model="form.parentCode" filterable placeholder="请选择">
                        <el-option
                            v-for="item in resourceOptions"
                            :key="item.resourceCode"
                            :label="item.resourceName"
                            :value="item.resourceCode">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="菜单路由：">
                    <el-input v-model="form.router" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="菜单组件：">
                    <el-input v-model="form.component" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="菜单图标：">
                    <el-input v-model="form.nodeIcon" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="菜单层级：">
                    <el-select v-model="form.resourceLevel" placeholder="请选择">
                        <el-option v-for="item in resourceLevelItems" :label="item.valueName" :value="item.valueCode" :key="item.valueCode"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="菜单类型：">
                    <el-select v-model="form.resourceType" placeholder="请选择">
                        <el-option v-for="item in resourceTypeItems" :label="item.valueName" :value="item.valueCode" :key="item.valueCode"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="展示顺序：">
                    <el-input type="number" v-model="form.displayOrder" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="是否叶子节点：">
                    <el-checkbox-group v-model="form.leafFlag">
                        <el-checkbox name="active"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="是否有效：">
                    <el-checkbox-group v-model="form.active">
                        <el-checkbox name="active" value=""></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="备注：">
                    <el-input v-model="form.notes" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="resourceCloseDialog">取 消</el-button>
                <el-button type="primary" @click="resourceHandleSubmit">确 定</el-button>
              </span>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                checkStrictly: true,
                defaultExpand: false,
                updateDisable: true,
                // deleteDisable: true,
                addPermissionDisable: true,
                updatePermissionDisable: true,
                deletePermissionDisable: true,
                multipleSelection: [],
                defaultProps:{
                    code: "code",
                    label: 'label',
                    nodeData: 'nodeData',
                    isLeaf:'isLeaf'
                },
                nodeData: {
                    tid: '',
                    resourceCode:'',
                    resourceName:'',
                    router:'',
                    component:'',
                    parentCode:'',
                    resourceLevel:'',
                    resourceType:'',
                    displayOrder:'',
                    nodeIcon:'',
                    leafFlag:'',
                    notes:'',
                    permissions:[]
                },
                resourceDialogTitle: '',
                resourceDialogVisible: false,
                resourceDialogCommand: '',
                form: {
                    tid: '',
                    resourceCode:'',
                    resourceName:'',
                    router:'',
                    component:'',
                    parentCode:'',
                    resourceLevel:'',
                    resourceType:'',
                    displayOrder:'',
                    nodeIcon:'',
                    leafFlag:'',
                    notes:''
                },
                rules: {

                }
            }
        },
        methods: {
            onAdd(){
                this.resourceDialogVisible = true;
                this.resourceDialogTitle = '新增菜单';
                this.resourceDialogCommand = 'add';
            },
            onUpdate(){
                if (this.multipleSelection.length > 1) {
                    this.$message({message:"只能选择其中一条数据进行修改",type: 'warning'});
                    return;
                }
                this.resourceDialogVisible = true;
                this.resourceDialogTitle = '修改菜单';
                this.resourceDialogCommand = 'update';
                let tid = JSON.parse(this.multipleSelection[0].nodeData).tid
                this.$http.get(this.$global.remote().resourceFind, {tid:tid}, response => {
                    let data = response.result;
                    if (this.$tools.isNotEmpty(data)) {
                        this.form = data;
                        this.form.active = data.active=='Y';
                        this.form.leafFlag = data.leafFlag=='Y';
                    }
                }, fail => {
                    this.$message.error(fail.message);
                })
            },
            resourceHandleSubmit(){
                let url = '';
                let param = {};
                param.resourceDTO = this.form;
                param.resourceDTO.active = this.form.active ? 'Y' : 'N';
                param.resourceDTO.leafFlag = this.form.leafFlag ? 'Y' : 'N';
                if (this.resourceDialogCommand == 'add') {
                    url = this.$global.remote().resourceAdd;
                } else if (this.resourceDialogCommand == 'update') {
                    url = this.$global.remote().resourceUpdate;
                }
                this.$http.post(url, param, response => {
                    this.resourceCloseDialog();

                }, fail => {
                    this.$message.error(fail.message);
                })
            },
            resourceCloseDialog(){
                this.$refs.form.resetFields();
                this.resourceDialogVisible = false;
            },
            onDelete(){
                this.$confirm('确认删除选中数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var array = [];
                    this.multipleSelection.forEach((item) => {
                        array.push(JSON.parse(item.nodeData).tid);
                    });
                   this.$http.post(this.$global.remote().resourceDelete, {ids: array}, response => {
                        //删除节点
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
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
            handleCheckChange(data, checked){
                if (checked) {
                    this.multipleSelection.push(data);
                } else {
                    this.$global.removeArrayItemByValue(this.multipleSelection,data);
                }
                if (this.multipleSelection.length > 0) {
                    this.updateDisable = false;
                    // this.deleteDisable = false;
                    this.addPermissionDisable = false;
                    this.updatePermissionDisable = false;
                    this.deletePermissionDisable = false;
                } else {
                    this.updateDisable = true;
                    // this.deleteDisable = true;
                    this.addPermissionDisable = true;
                    this.updatePermissionDisable = true;
                    this.deletePermissionDisable = true;
                }
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
                            code: res.resourceCode,
                            label: res.resourceName,
                            nodeData: JSON.stringify(res),
                            isLeaf: res.leafFlag == 'Y' ? true : false
                        })
                    }
                    return resolve(temp);
                }, fail => {
                    this.$message.error(fail.message);
                })
            },
            handleNodeClick(data, node){
                if ('console_1' == data.code) {
                    return;
                }
                let temp = JSON.parse(data.nodeData);
                if (temp == null || temp == undefined) {
                    return;
                }
                this.nodeData = temp;
            },
            handleNodeExpand(data) {
            },
            handleNodeCollapse(data){
            },
        },
        computed: {
            activeShow(){
                return this.$global.transformActive(this.nodeData.active);
            },
            leafFlagShow(){
                return this.nodeData.leafFlag == 'Y' ? '是' : '否';
            },
            resourceLevelShow(){
                return this.$global.getValueNameByTermsCodeAndValueCode('RESOURCES_LEVEL', this.nodeData.resourceLevel);
            },
            resourceTypeShow(){
                return this.$global.getValueNameByTermsCodeAndValueCode('JURISDICTION_TYPE', this.nodeData.resourceType);;
            },
            resourceLevelItems(){
                return this.$global.getTermsValueStore('RESOURCES_LEVEL');
            },
            resourceTypeItems(){
                return this.$global.getTermsValueStore('JURISDICTION_TYPE');
            },
            resourceOptions(){
                return this.$global.getMenuCodeValueStore();
            }
        },
        mounted(){

        }
    };
</script>


<style lang="less" scoped>
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
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }
    .form-container{
        position: relative;
    }
   div.form-div{
       height: 47.8px;
       position: absolute;
       top:0;
       left:0;
   }
    div.form-aside{
        position: absolute;
        top:46.8px;
        left:0;
    }
    div.form-container{
        position: absolute;
        left:200px;
        right:0;
    }
    div.form-div .el-form-item--mini.el-form-item{
        margin-top: 10px;
        margin-left: 5px;
    }
    div.form-container .el-main{
        padding: 0;
    }
    .el-tree{
        width: 180px !important;
    }
    .container-top{
        background-color: #a0cfff;
        color:white;
        height: 40px;
        line-height: 40px;
        padding-left: 10px;
        font-size: 16px;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
        border:none;
    }
    .mt20{
        margin-top: 20px;
    }
    .from-item-container{
        position: relative;
    }
    .form-item-left,.form-item-right{
        position: absolute;
        width: 50%;
    }
    .form-item-left{
        top:0;
        left:0;
    }
    .form-item-right{
        top:0;
        left: 50%;
    }
</style>
