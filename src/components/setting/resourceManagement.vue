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
                        :data="treeData"
                        show-checkbox
                        node-key="id"
                        :lazy="true"
                        :load="loadChildren"
                        :default-expand-all="defaultExpand"
                        @node-expand="handleNodeExpand"
                        @node-collapse="handleNodeCollapse"
                        @node-click="handleNodeClick">
                    </el-tree>
                </div>
                <div class="form-container">
                    <el-container>
                        <el-main>
                            <div class="scoped-table">
                            </div>
                        </el-main>
                    </el-container>
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
                treeData: [{
                    id: 'console_1',
                    label: 'console系统'
                }]
            }
        },
        methods: {
            onAdd(){

            },
            onUpdate(){

            },
            onDelete(){

            },
            loadChildren(node, resolve){
                node.childNodes = this.loadData(node.id);
            },
            handleNodeExpand(data) {
            },
            handleNodeCollapse(data){
            },
            handleNodeClick(data, node, nodeArr){
            },
            loadData(parentCode) {
                this.$http.get(this.$global.remote().resourceFindByParentCode, {parentCode: parentCode}, response => {
                    let resources = response.result;
                    let temp = new Array();
                    for (let i = 0, len = resources.length; i < len; i++) {
                        let res = resources[i];
                        temp.push({
                            id: res.tid,
                            label: res.resourceName,
                            data: res,
                            children: []
                        })
                    }
                    return temp;
                }, fail => {
                    this.$message.error(fail.message);
                })
            }
        },
    };
</script>


<style lang="less">
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
        height: 1000px;
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
</style>
