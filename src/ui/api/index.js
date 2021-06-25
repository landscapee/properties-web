/*
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2021-03-31 16:19:20
 * @LastEditors: yang fu ren
 * @LastEditTime: 2021-05-14 14:29:17
 */
import generateRequestApi from '@/utils/generateRequestApi';
import {globalLayerRequest} from './globalLayer';
import {mapCustomized} from './mapCustomized';
import {project} from './project';
import {user} from './user';
import {layerDraft} from './layerDraft';
import {projectLayer} from './projectLayer';
import {fileupload} from './fileupload';
generateRequestApi.parseRouter('globalLayer',globalLayerRequest());
generateRequestApi.parseRouter('mapCustomized',mapCustomized);
generateRequestApi.parseRouter('project',project);
generateRequestApi.parseRouter('user',user);
generateRequestApi.parseRouter('layerDraft',layerDraft);
generateRequestApi.parseRouter('projectLayer',projectLayer);
generateRequestApi.parseRouter('fileupload',fileupload);
export default generateRequestApi;