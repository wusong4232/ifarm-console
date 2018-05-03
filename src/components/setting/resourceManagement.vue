<template>
    <div class="user-management-box">
        <div class="form-box">
            <el-form :inline="true" size="mini">
                <el-form-item >
                    <el-button type="primary" @click="onAdd">新增</el-button>
                    <el-button type="primary" @click="onUpdate" :disabled="updateDisable">修改</el-button>
                    <el-button type="primary" @click="onDelete" :disabled="deleteDisable">删除</el-button>
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
                        show-checkbox
                        node-key="id"
                        lazy
                        :load="loadNode"
                        :props="defaultProps"
                        :default-expand-all="defaultExpand"
                        @node-expand="handleNodeExpand"
                        @node-collapse="handleNodeCollapse"
                        @node-click="handleNodeClick">
                    </el-tree>
                </div>
                <div class="form-container">
                    <div class="container-top">组织架构基本信息</div>
                    <el-container>
                        <el-main style="padding: 20px;height: 300px;">
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
                                            {{resourceLevel}}
                                        </el-form-item>
                                        <el-form-item label="菜单类型：">
                                            {{resourceType}}
                                        </el-form-item>

                                        <el-form-item label="展示顺序：">
                                            {{nodeData.displayOrder}}
                                        </el-form-item>

                                        <el-form-item label="是否叶子节点：">
                                            {{leafFlag}}
                                        </el-form-item>
                                        <el-form-item label="是否有效：">
                                            {{active}}
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
                </div>
            </el-container>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                defaultExpand: false,
                updateDisable: true,
                deleteDisable: true,
                defaultProps:{
                    code: "code",
                    label: 'label',
                    nodeData: 'nodeData',
                    isLeaf:'isLeaf'
                },
                nodeData: {
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
                }
            }
        },
        methods: {
            onAdd(){

            },
            onUpdate(){

            },
            onDelete(){

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
            active(){
                return this.$global.transformActive(this.nodeData.active);
            },
            leafFlag(){
                return this.nodeData.leafFlag == 'Y' ? '是' : '否';
            },
            resourceLevel(){
                return this.$global.getValueNameByTermsCodeAndValueCode('RESOURCES_LEVEL', this.nodeData.resourceLevel);
            },
            resourceType(){
                let temp = this.$global.getValueNameByTermsCodeAndValueCode('JURISDICTION_TYPE', this.nodeData.resourceType);
                return temp;
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

    .el-aside {
        color: #333;
    }
    form.el-form{
        height: 40px;
    }
    .form-container{
        position: relative;
        /*height: 1000px;*/
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
    .el-menu{
        border:none !important;
    }
    div.form-div .el-form-item--mini.el-form-item{
        margin-top: 10px;
        margin-left: 5px;
    }
    div.form-container .el-main{
        padding: 0;
    }
    div.scoped-table{
        td div.cell{
            line-height: 20px;
        }
    }
    div.scoped-table{
        div.el-table__header-wrapper table{
            height: 47px !important;
        }
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
