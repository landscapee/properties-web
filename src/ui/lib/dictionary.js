/*
 * @Descripttion: 
 * @version: 
 * @Author: fuhao
 * @Date: 2020-05-13 11:06:08
 * @LastEditors: xdh.ss
 * @LastEditTime: 2020-05-13 11:12:23
 */
import moment from 'moment';
import {get} from 'lodash';


class Dictionary {
    constructor(){}

    // 日期格式化
    static formatDateTime(datetime, format) {
        try {
            return datetime ? moment(parseInt(datetime)).format(format) : '－－';
        } catch (e) {
            return '－－';
        }
    }
}

export default Dictionary;