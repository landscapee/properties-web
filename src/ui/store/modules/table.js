/*
 * @Descripttion: 
 * @version: 
 * @Author: fuhao
 * @Date: 2020-05-13 10:26:06
 * @LastEditors: xdh.ss
 * @LastEditTime: 2020-05-13 11:46:10
 */
import TabConfig from '../../config/tab';
import { map, extend, find, flow } from 'lodash';
// import Logger from 'logger';
// const log = new Logger('tables:');

const state = {
	tabId:null,
	tab: TabConfig
};

const getters = {
    getTabConfig: state => id => {
        try{
            return state.tab.find(tab => tab.id === id);
        }catch(e) {
            // log.error(e, `table ${id} 未在tab中注册`);
        }
    },
	getTabColumns: state => id => {
	    try{
            return state.tab.find(tab => tab.id === id).columns;
        }catch(e) {
            // log.error(e, `table ${id} 未在tab中注册`);
        }
	},
    getTabData: state => id => {
        return state.tab.find(tab => tab.id === id).data;
    },
    getTabHeight: state => id => {
        return state.tab.find(tab => tab.id === id).height;
    }
};

const mutations = {
    setTabId (state, id) {
      state.tabId = id;
    },
    setTabData (state, config) {
        map(state.tab, tab => {
            if(tab.id == config.id){
                tab.data = config.data;
            }
        });
    },
    // setTabSelectOptions (state, columnsConfig) {
    //     debugger;
    //     flow([
    //         res => {return res.find(tab => tab.id === columnsConfig.id)},
    //         re => {re.columns.map(d => {
    //             if (d.key == columnsConfig.key){log.info(d); return d.selectConfig = columnsConfig.data;
    //             }})},
    //     ])(state.tab);
    // },
  };

  const actions = {
      setTabColumns (state, config) {
          find(TabConfig, t => t.id = config.id).columns = config.columns;
      }
  };

export default {
	state,
	getters,
	mutations,
    actions
};
