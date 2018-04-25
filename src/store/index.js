import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

/**
 * Vuex全局状态管理
 * @param options {Array} 用于渲染tabs的数组
 */
const store = new Vuex.Store({
    state: {
        options: [],
        activeIndex: '/home/index',
        userInfo: {},
        loadSuccess:{},
        forgeData:{
            "success": true,
            "resCode": "100000",
            "resMsg": "成功！",
            "result": {
                "tid": 1,
                "status": null,
                "createUser": null,
                "modifyUser": null,
                "createTime": 1523680750000,
                "modifyTime": 1523680750000,
                "active": "Y",
                "page": 1,
                "start": 0,
                "limit": 10,
                "totalCount": null,
                "userName": "admin",
                "password": null,
                "nickName": null,
                "salt": null,
                "email": null,
                "mobileNo": null,
                "empCode": null,
                "deptCode": null,
                "notes": null,
                "roles": [
                    "admin"
                ],
                "permissions": [
                    "ALL"
                ],
                "menuResources": [
                    {
                        "tid": 1,
                        "status": null,
                        "createUser": null,
                        "modifyUser": null,
                        "createTime": null,
                        "modifyTime": null,
                        "active": null,
                        "page": 1,
                        "start": 0,
                        "limit": 10,
                        "totalCount": null,
                        "resourceCode": "console_1",
                        "resourceName": "console系统",
                        "entryUrl": null,
                        "parentCode": null,
                        "resourceLevel": 1,
                        "resourceType": 1,
                        "displayOrder": 1,
                        "nodeIcon": null,
                        "leafFlag": "N",
                        "notes": null,
                        "childrenNode": [
                            {
                                "tid": 3,
                                "status": null,
                                "createUser": null,
                                "modifyUser": null,
                                "createTime": null,
                                "modifyTime": null,
                                "active": null,
                                "page": 1,
                                "start": 0,
                                "limit": 10,
                                "totalCount": null,
                                "resourceCode": "console_102",
                                "resourceName": "基础数据",
                                "entryUrl": null,
                                "parentCode": "console_1",
                                "resourceLevel": 2,
                                "resourceType": 2,
                                "displayOrder": 2,
                                "nodeIcon": "el-icon-menu",
                                "leafFlag": "N",
                                "notes": null,
                                "childrenNode": [
                                    {
                                        "tid": 5,
                                        "status": null,
                                        "createUser": null,
                                        "modifyUser": null,
                                        "createTime": null,
                                        "modifyTime": null,
                                        "active": null,
                                        "page": 1,
                                        "start": 0,
                                        "limit": 10,
                                        "totalCount": null,
                                        "resourceCode": "console_10201",
                                        "resourceName": "词条管理",
                                        "entryUrl": null,
                                        "parentCode": "console_102",
                                        "resourceLevel": 3,
                                        "resourceType": 3,
                                        "displayOrder": 1,
                                        "nodeIcon": "",
                                        "leafFlag": "Y",
                                        "notes": null,
                                        "childrenNode": null
                                    }
                                ]
                            },
                            {
                                "tid": 4,
                                "status": null,
                                "createUser": null,
                                "modifyUser": null,
                                "createTime": null,
                                "modifyTime": null,
                                "active": null,
                                "page": 1,
                                "start": 0,
                                "limit": 10,
                                "totalCount": null,
                                "resourceCode": "console_103",
                                "resourceName": "系统设置",
                                "entryUrl": null,
                                "parentCode": "console_1",
                                "resourceLevel": 2,
                                "resourceType": 2,
                                "displayOrder": 3,
                                "nodeIcon": "el-icon-date",
                                "leafFlag": "N",
                                "notes": null,
                                "childrenNode": [
                                    {
                                        "tid": 6,
                                        "status": null,
                                        "createUser": null,
                                        "modifyUser": null,
                                        "createTime": null,
                                        "modifyTime": null,
                                        "active": null,
                                        "page": 1,
                                        "start": 0,
                                        "limit": 10,
                                        "totalCount": null,
                                        "resourceCode": "console_10301",
                                        "resourceName": "用户管理",
                                        "entryUrl": null,
                                        "parentCode": "console_103",
                                        "resourceLevel": 3,
                                        "resourceType": 3,
                                        "displayOrder": 1,
                                        "nodeIcon": "",
                                        "leafFlag": "Y",
                                        "notes": null,
                                        "childrenNode": null
                                    },
                                    {
                                        "tid": 7,
                                        "status": null,
                                        "createUser": null,
                                        "modifyUser": null,
                                        "createTime": null,
                                        "modifyTime": null,
                                        "active": null,
                                        "page": 1,
                                        "start": 0,
                                        "limit": 10,
                                        "totalCount": null,
                                        "resourceCode": "console_10302",
                                        "resourceName": "角色管理",
                                        "entryUrl": null,
                                        "parentCode": "console_103",
                                        "resourceLevel": 3,
                                        "resourceType": 3,
                                        "displayOrder": 2,
                                        "nodeIcon": "",
                                        "leafFlag": "Y",
                                        "notes": null,
                                        "childrenNode": null
                                    }
                                ]
                            },
                            {
                                "tid": 2,
                                "status": null,
                                "createUser": null,
                                "modifyUser": null,
                                "createTime": null,
                                "modifyTime": null,
                                "active": null,
                                "page": 1,
                                "start": 0,
                                "limit": 10,
                                "totalCount": null,
                                "resourceCode": "console_101",
                                "resourceName": "综合管理",
                                "entryUrl": null,
                                "parentCode": "console_1",
                                "resourceLevel": 2,
                                "resourceType": 2,
                                "displayOrder": 1,
                                "nodeIcon": "el-icon-setting",
                                "leafFlag": "N",
                                "notes": null,
                                "childrenNode": []
                            }
                        ]
                    }
                ],
                "credentialsSalt": "admin"
            }
        }

    },
    mutations: {
        // 添加tabs
        addTabs (state, data) {
            this.state.options.push(data);
        },
        // 删除tabs
        deleteTabs (state, route) {
            let index = 0;
            for (let option of state.options) {
                if (option.route === route) {
                    break;
                }
                index++;
            }
            this.state.options.splice(index, 1);
        },
        // 设置当前激活的tab
        setActiveIndex (state, index) {
            this.state.activeIndex = index;
        },
        // 设置详情信息
        saveUserInfo (state, info) {
            this.state.userInfo = info;
        }
    }
});

export default store;
