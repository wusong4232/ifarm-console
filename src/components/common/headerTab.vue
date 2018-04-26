<template>
    <div class="headerTabs">
        <el-tabs
            v-model="activeIndex"
            type="border-card"
            closable
            @tab-click="tabClick"
            v-if="options.length"
            @tab-remove="tabRemove"
        >
            <el-tab-pane
                :key="item.name"
                v-for="(item, index) in options"
                :label="item.name"
                :name="item.route"
            >
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    export default {
        methods: {
            // tab切换时，动态的切换路由
            tabClick (tab) {
                let path = this.activeIndex;
                // 用户详情页的时候，对应了二级路由，需要拼接添加第二级路由
                this.$router.push(path);
            },
            tabRemove (targetName) {
                // 首页不可删除
                if(targetName == '/home/index') {
                    return;
                }
                this.$store.commit('deleteTabs', targetName);
                if (this.activeIndex === targetName) {
                    // 设置当前激活的路由
                    if (this.options && this.options.length >= 1) {
                        this.$store.commit('setActiveIndex', this.options[this.options.length-1].route);
                        this.$router.push(this.activeIndex);
                    } else {
                        this.$router.push('/home/index');
                    }
                }
            }
        },
        computed: {
            options () {
                return this.$store.state.options;
            },
            activeIndex: {
                get () {
                    return this.$store.state.activeIndex;
                },
                set (val) {
                    this.$store.commit('set_active_index', val);
                }
            }
        },
        watch: {
            '$route'(to) {
                let flag = false;
                for (let option of this.options) {
                    if (option.name === to.name) {
                        flag = true;
                        this.$store.commit('setActiveIndex', to.path);
                        break
                    }
                }
                if (!flag) {
                    this.$store.commit('addTabs', {route: to.path, name: to.name});
                    this.$store.commit('setActiveIndex', to.path);
                }

            }
        }
    }
</script>
<style lang="less">
    .headerTabs{
        div.el-tabs__nav>div.el-tabs__item:nth-child(1) span{
            display: none !important;
        }
    }
</style>
