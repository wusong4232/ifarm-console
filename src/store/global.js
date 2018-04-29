import apiAxios from '../apiaxios';
import {Message} from 'element-ui';
import tools from '../tools';

const global = {}

/**
 * flash dictionary
 */
let loadDictionary = function() {
    apiAxios.get('/terms//dictionary', null, response => {
        let dictionary = new Map();
        let dataArr = response.result.termsCodeDTOS;
        for(let i = 0; i < dataArr.length; i++) {
            dictionary.set(dataArr[i].termsCode, dataArr[i].termsValues);
        }
        global.dictionary = dictionary;
        return loadDictionary;
    }, fail => {
        Message.error(fail.message);
    })
}

export default {
    flashDictionary : function () {
        setInterval(loadDictionary(),10 * 60 * 1000);
    },
    getDictionary : function () {
        return global.dictionary;
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
    }
}
