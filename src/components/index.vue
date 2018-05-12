<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i> 自述</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="ms-doc">
            <h3>README.md</h3>
            <article>
                <h1>后台管理系统</h1>
                <p>后端基于SpringBoot + SpringMVC + Shiro，前端基于Vue.js 2.x系列 + Element UI 的后台管理系统解决方案</p>
                <h2>前言</h2>
                <p>
                    工作之余整理了SpringBoot整个常用框架的模板库[framework](https://github.com/lhrimperial/framework)，运用这个模板开发了一个基于粗粒度权限设计的管理后台[caiwei](https://github.com/lhrimperial/caiwei)，前端使用的是ExtJs。
                    ExtJs属于比较重的前端框架，基于当下流行的几种前端框架，选择了Vue + ElementUI重新实现了一个后台管理系统，权限管理选用了Shiro 权限管理框架，并且对权限进行了细粒度的设计，控制到按钮。
                    时间比较紧还有很多不完善和考虑不周全的地方，希望看到这份代码发现问题的可以给我留言，谢谢！
                </p>
                <h2>功能</h2>
                <p>
                    系统设计了管理系统比较通用的几个模块
                </p>
                <ul>
                    <li>用户管理</li>
                    <li>角色管理</li>
                    <li>菜单管理</li>
                    。。。。。。
                </ul>
            </article>
        </div>

    </div>
</template>

<script>
    export default {
        data: function(){
            return {}
        }
    }
</script>

<style scoped>
    .ms-doc{
        width:100%;
        max-width: 980px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    }
    .ms-doc h3{
        padding: 9px 10px 10px;
        margin: 0;
        font-size: 14px;
        line-height: 17px;
        background-color: #f5f5f5;
        border: 1px solid #d8d8d8;
        border-bottom: 0;
        border-radius: 3px 3px 0 0;
    }
    .ms-doc article{
        padding: 45px;
        word-wrap: break-word;
        background-color: #fff;
        border: 1px solid #ddd;
        border-bottom-right-radius: 3px;
        border-bottom-left-radius: 3px;
    }
    .ms-doc article h1{
        font-size:32px;
        padding-bottom: 10px;
        margin-bottom: 15px;
        border-bottom: 1px solid #ddd;
    }
    .ms-doc article h2 {
        margin: 24px 0 16px;
        font-weight: 600;
        line-height: 1.25;
        padding-bottom: 7px;
        font-size: 24px;
        border-bottom: 1px solid #eee;
    }
    .ms-doc article p{
        margin-bottom: 15px;
        line-height: 1.5;
    }
    .ms-doc article .el-checkbox{
        margin-bottom: 5px;
    }


</style>
