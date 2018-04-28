<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" background-color="#324157" text-color="#fff"
                 unique-opened router>
            <template v-for="item in itemsCopy">
                <el-submenu :index="item.resourceCode"><!--二级菜单-->
                    <template slot="title"><i :class="item.nodeIcon"></i>{{ item.resourceName }}</template>
                    <el-menu-item v-for="(subItem,i) in item.childrenNode" :key="i" :index="subItem.router">{{ subItem.resourceName }}
                    </el-menu-item>
                </el-submenu>
            </template>
        </el-menu>
    </div>

</template>

<script>
    export default {
        computed: {
            onRoutes() {
                console.log(this.$route.path);
                return this.$route.path.split('/')[2];
            },
            itemsCopy(){
                let userMenu = this.$store.state.userMenu;
                return userMenu[0].childrenNode;
            }
        }
    }
</script>

<style>
    .sidebar {
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom: 0;
        background: #2E363F;
    }

    .sidebar > ul {
        height: 100%;
    }

    .el-menu-item, .el-submenu__title {
        height: 45px !important;
        line-height: 45px !important;
    }
</style>
