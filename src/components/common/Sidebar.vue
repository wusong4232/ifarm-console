<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" @open="handleOpen" class="el-menu-vertical-demo" background-color="#324157" text-color="#fff"
                 unique-opened router>
            <template v-for="item in itemsCopy">
                <el-submenu :index="item.resourceCode"><!--二级菜单-->
                    <template slot="title"><i :class="item.nodeIcon"></i>{{ item.resourceName }}</template>
                    <el-menu-item v-for="(subItem,i) in subItemCopy" :key="i" :index="subItem.router">{{ subItem.resourceName }}
                    </el-menu-item>
                </el-submenu>
            </template>
        </el-menu>
    </div>

</template>

<script>
    import RouterUtils from '../../tools/RouterUtils';
    export default {
        data(){
          return {
              menuData: new Map(),
              subItemCopy: []
          }
        },
        methods: {
            handleOpen(index, indexPath){
                this.subItemCopy = [];
                let subMenu = this.menuData.get(index);
                if (this.$tools.isEmpty(subMenu)) {
                    this.$http.get(this.$global.remote().userMenu, {parentCode: index}, response => {
                        subMenu = response.result;
                        if (this.$tools.isNotEmpty(subMenu)) {
                            this.menuData.set(index, subMenu);
                            this.subItemCopy = subMenu;

                            let routers = [];
                            RouterUtils(routers,subMenu,'menu');
                            this.$router.options.routes[2].children = routers;
                            this.$router.addRoutes(this.$router.options.routes);//调用addRoutes添加路由
                        }
                    }, fail => {
                        this.message.error(fail.message);
                    });
                } else {
                    this.subItemCopy = subMenu;
                }
            }
        },
        computed: {
            onRoutes() {
                return this.$route.path.split('/')[2];
            },
            itemsCopy(){
                return this.$store.state.userMenu;
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
