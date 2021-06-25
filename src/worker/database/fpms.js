/*
 * @Descripttion: 数据库操作
 * @version: 
 * @Author: xdh.ss
 * @Date: 2020-04-02 10:55:04
 * @LastEditors: xdh.ss
 * @LastEditTime: 2020-04-03 14:51:56
 */
import loki from 'lokijs';
import Promise from 'bluebird';
import {omit, get, extend} from 'lodash';

const DB = new loki('fpms.db', { adapter: 'memory' });

const flight_schedule_DB = DB.addCollection('flight_schedule', {
    unique: ['id']
});

flight_schedule_DB.ensureUniqueIndex('id');


export const save_to_flight_schedule_DB = datas => {
    return Promise.map(datas, item => {
        let fixedItem = omit(item, ['$loki', 'mate']);
        try {
            let flight_schedule_id = get(fixedItem, 'id');
            let exist_flight_schedule = flight_schedule_DB.by('id', flight_schedule_id);
            if (!exist_flight_schedule) {
                flight_schedule_DB.insert(fixedItem);
            } else {
                flight_schedule_DB.update(extend(exist_flight_schedule, fixedItem))
            }
        } catch (error) {
            console.errot(fixedItem, error)
        }
        return Promise.resolve();
    });
};

export const get_flight_schedule_data = query => {
    return new Promise((resolve, reject) => {
        let data = flight_schedule_DB.chain().find().data();
        if (data) {
            resolve(data);
        } else {
            reject(null);
        }
    })
}