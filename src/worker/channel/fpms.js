/*
 * @Descripttion: 数据ws链接模块
 * @version: 
 * @Author: xdh.ss
 * @Date: 2020-04-02 17:30:40
 * @LastEditors: xdh.ss
 * @LastEditTime: 2020-04-03 16:31:57
 */
import postal from 'postal';
import socket from '../lib/socket';
import axios from "axios";
import {save_to_flight_schedule_DB, get_flight_schedule_data} from '../database/fpms';


axios.defaults.baseURL  =  "http://173.100.1.30/fpms/fpms-controller/"
axios.interceptors.request.use(
    config => {
        let token = null
		if(config.method  === 'post'){
            const formData = new FormData();
            Object.keys(config.data).forEach(key => formData.append(key, config.data[key]))
            config.data = formData
            token = formData.get("token")
        }
        if(config.method  === 'get'){
            token=config.params.token
        }
        config.headers['Authorization'] = token;
        config.headers['Accept'] = 'application/json';
		return config;
    },
    err => {
      return Promise.reject(err);
    }
);
axios.interceptors.response.use(
    response=>{
        return response;
    }, 
    err => {
        return Promise.reject(error);
    }
);


// socket链接 channel
const ws_channel = {
    warnning: 'warnning', // 告警
    flight_schedule: 'flight_schedule', // 航班计划
    flight_status: 'flight_status', // 航班动态
    urge: 'urge', // 催办
    deviation_report: 'deviation_report', // 偏离上报
    setting: 'setting', // 配置设置
}

export const init = (data) => {
    // example socket
    const getDataSocket = new socket('/',data.token);
    getDataSocket.socket_start(() => {
        getDataSocket.socket_on('flight_schedule', async data => {
            
            console.log('服务器数据', data);
            await save_to_flight_schedule_DB(data);
            const datas = await get_flight_schedule_data();
        
            console.log('数据库获取的数据', datas);
            postal.publish({
                channel: 'web.fpms',
                topic: 'flight_schedule_data_is_update',
                data: datas
            });
        });
    })

    const test_socket = new socket('/ws',data.token);
    test_socket.socket_start(() => {
        test_socket.socket_on('flight_schedule', async data => {
            console.log('服务器数据', data)
        })
    })

    // 航班计划socket
    const flight_schedule_socket = new socket(`/${ws_channel.flight_schedule}`,data.token);
    flight_schedule_socket.socket_start(() => {
        flight_schedule_socket.socket_on('flight_schedule', data => {
            console.log('服务器数据 warnning', data);

        });
    });
};

export const setStep2 = (data)=>{
    axios.get("/planConfig/query",{params:data})
    .then((res)=>{
        console.log(res)
    })
    // postal.publish({
    //     channel: 'web.fpms',
    //     topic: 'set_step2',
    //     data: data
    // });

}
