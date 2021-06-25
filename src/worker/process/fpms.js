/*
 * @Descripttion: 
 * @version: 
 * @Author: xdh.ss
 * @Date: 2020-04-02 17:30:40
 * @LastEditors: xdh.ss
 * @LastEditTime: 2020-04-13 15:51:08
 */
import postal from 'postal';
import {get} from 'lodash';
import '../manage/fpms';

const channel = postal.channel('web.fpms');
channel.subscribe('#', (data, envelope) => {
    console.log('worker---web---envelope', envelope);
    self.postMessage({
        channel: get(envelope, 'channel'),
        topic: get(envelope, 'topic'),
        data: get(envelope, 'data', [])
    });
});

self.onmessage = (event) => {
    console.log(event.data)
    postal.publish({
        channel: get(event, 'data.channel'),
        topic: get(event, 'data.topic'),
        data: get(event, 'data.data')
    })
}

console.log('我是worker线程，我被启动了！')