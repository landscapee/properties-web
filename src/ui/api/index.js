/*
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2021-03-31 16:19:20
 * @LastEditors: yang fu ren
 * @LastEditTime: 2021-09-07 10:44:03
 */
import generateRequestApi from '@/utils/generateRequestApi';
import {parameterManage} from './parameterManage';
import {system} from './system';
generateRequestApi.parseRouter('parameterManage',parameterManage);
generateRequestApi.parseRouter('system',system);
export default generateRequestApi;