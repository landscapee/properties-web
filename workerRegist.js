import postal from 'postal';
import {get} from 'lodash';
import Fpms from 'worker-loader!./src/worker/process/fpms.js';
class workerRegist{
    constructor(){}

    start(){
        this.worker = new Fpms();
        const channel = postal.channel("worker.fpms");
        channel.subscribe('#', (data, envelope) => {
            console.log('web---worker---envelope', envelope);
            this.worker.postMessage({
                channel: get(envelope, 'channel'),
                topic: get(envelope, 'topic'),
                data: get(envelope, 'data')
            });
        })

        this.worker.onmessage = (event) => {
            console.log('客户端接收', event.data)
            postal.publish({
                channel: get(event, 'data.channel'),
                topic: get(event, 'data.topic'),
                data: get(event, 'data.data')
            })
        }
    }
};

export default workerRegist;