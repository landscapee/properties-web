/*
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2021-03-31 16:19:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-02 10:08:01
 */
import generateRequestApi from '@/utils/generateRequestApi';
import {parameterManage} from './parameterManage';
generateRequestApi.parseRouter('parameterManage',parameterManage);
export default generateRequestApi;