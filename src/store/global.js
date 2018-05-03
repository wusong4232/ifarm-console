import apiAxios from '../apiaxios';
import {Message} from 'element-ui';
import tools from '../tools';

const global = {}
global.menuStore = new Array();

global.remoteUrl = {
    login: '/login',
    logout: '/logout',
    //user manage
    userInfo: '/userInfo',
    userList: '/user/list',
    userFind: '/user/find',
    userDelete: '/user/delete',
    userAdd: '/user/save',
    userUpdate: '/user/update',
    //terms manage
    dictionary: '/terms/dictionary',
    termsCodeList: '/terms/code/list',
    termsCodeFind: '/terms/code/find',
    termsCodeSave: '/terms/code/save',
    termsCodeUpdate: '/terms/code/update',
    termsCodeDelete: '/terms/code/delete',
    termsValueList: '/terms/value/list',
    termsValueFind: '/terms/value/find',
    termsValueSave: '/terms/value/save',
    termsValueUpdate: '/terms/value/update',
    termsValueDelete: '/terms/value/delete',
    //role manage
    roleList: '/role/list',
    roleFind: '/role/find',
    roleDelete: '/role/delete',
    roleAdd: '/role/save',
    roleUpdate: '/role/update',
    //resource manage
    resourceFindByParentCode: '/resource/findByParentCode',
    resourceList: '/resource/list',
    resourceFind: '/resource/find',
    resourceDelete: '/resource/delete',
    resourceAdd: '/resource/save',
    resourceUpdate: '/resource/update',
}

/**
 * flash dictionary
 */
let loadDictionary = function() {
    apiAxios.get(global.remoteUrl.dictionary, null, response => {
        let dictionary = new Map();
        let termsCodeMap = new Map();
        let termsCodes = new Array();
        let dataArr = response.result.termsCodeDTOS;
        for(let i = 0; i < dataArr.length; i++) {
            dictionary.set(dataArr[i].termsCode, dataArr[i].termsValues);
            termsCodeMap.set(dataArr[i].termsCode, dataArr[i].termsName);
            termsCodes.push({
                termsCode:dataArr[i].termsCode,
                termsName:dataArr[i].termsName
            })
        }
        global.dictionary = dictionary;
        global.termsCodes = termsCodes;
        global.termsCodeMap = termsCodeMap;
        return loadDictionary;
    }, fail => {
        Message.error(fail.message);
    })
}

export default {
    remote(){
        return global.remoteUrl;
    },
    flashDictionary : function () {
        setInterval(loadDictionary(),10 * 60 * 1000);
    },
    getTermsCodeMap : function () {
        return global.termsCodeMap;
    },
    getTermsCodeStore: function () {
        return global.termsCodes;
    },
    getTermsValueStore: function (termsCode) {
        if (tools.isEmpty(termsCode)) {
            return [];
        }
        let valueData = global.dictionary.get(termsCode);
        let result = new Array();
        for (let i = 0, len = valueData.length; i < len; i++) {
            result.push({
                'valueCode': valueData[i].valueCode,
                'valueName': valueData[i].valueName
            })
        }
        return result;
    },
    transformActive(cell) {
        let value = '';
        if (cell == 'Y') {
            value = '有效';
        } else {
            value = '无效';
        }
        return value;
    },
    setMenuCodeValueStore(menuData) {
        for (let i = 0,len = menuData.length; i < len; i++) {
            global.menuStore.push({
                resourceCode: menuData[i].resourceCode,
                resourceName: menuData[i].resourceName,
            });
            if (menuData[i].childrenNode != null && menuData[i].childrenNode.length > 0) {
                this.setMenuCodeValueStore(menuData[i].childrenNode);
            }
        }
    },
    getMenuCodeValueStore(){
        return global.menuStore;
    }

}
