/*
 * @Descripttion: 
 * @version: 
 * @Author: xdh.ss
 * @Date: 2020-04-01 14:50:55
 * @LastEditors: xdh.ss
 * @LastEditTime: 2020-04-13 15:47:31
 */
import postal from 'postal';
import {get_flight_schedule_data} from '../database/fpms';
import {init as fpmsinit,setStep2} from '../channel/fpms';


postal.subscribe({
    channel: 'worker.fpms',
    topic: 'get_flight_schedule_data',
    callback: async data => {
        const flight_schedule_data = await get_flight_schedule_data();
        postal.publish({
            channel: 'web.fpms',
            topic: 'flight_schedule_data_is_update',
            data: flight_schedule_data
        })
    }
})

postal.subscribe({
    channel: 'worker.fpms',
    topic: 'get_flight_schedule_data_server',
    callback:data => {
        fpmsinit(data)
    }
})

postal.subscribe({
    channel: 'worker.fpms',
    topic: 'set_step2',
    callback: data => {
        setStep2(data)
    }
})