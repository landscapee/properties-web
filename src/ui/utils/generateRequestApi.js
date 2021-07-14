/*
 * @Author: your name
 * @Date: 2021-04-06 21:37:29
 * @LastEditTime: 2021-07-06 16:44:31
 * @LastEditors: yang fu ren
 * @Description: In User Settings Edit
 * @FilePath: \config-center-web\src\ui\utils\server.js
 */
// import request from '@/utils/request';
// function myServer(){
//     this.request=request
// }
// myServer.prototype.parseRouter=function(model,urls){
//     var ob=this[model]={};
//     Object.keys(urls).forEach((item)=>{
//         ob[item]=this.sendMes.bind(this,model,item,urls[item]);
//         ob[item].state='ready'; //初始化的状态为可以请求模式
//     })
// }
// myServer.prototype.sendMes=function(model,name,url,config){
//     let self=this;
//     let callback=function(res){
//         self[model][name].state='ready'
//         return res
//     }
//     let datesOption={
//         post:{url,method:'post',data:config.data},
//         get:{url,method:'get',params:config.params},
//         delete:{url,method:'delete',params:config.params},
//         put:{url,method:'put',data:config.data},
//     }
//     if(self[model][name].state==='ready'){
//         self[model][name].state='pending'; //当该接口发起请求后改为请求中
//         return this.request(datesOption[config.method]).then(callback);
//     }
// }
// export default new myServer()
/*
 * @Author: your name
 * @Date: 2021-04-06 21:37:29
 * @LastEditTime: 2021-06-15 16:32:11
 * @LastEditors: yang fu ren
 * @Description: In User Settings Edit
 * @FilePath: \config-center-web\src\ui\utils\server.js
 */
import request from './request';
function myServer(){
    this.request=request
}
myServer.prototype.parseRouter=function(model,urls){
    var ob=this[model]={};
    Object.keys(urls).forEach((item)=>{
        ob[item]=this.sendMes.bind(this,model,item,urls[item]);
        ob[item].state='ready'; //初始化的状态为可以请求模式
    })
}
myServer.prototype.sendMes=function(model,name,url,config){
    let self=this;
    let callback=function(res){
        self[model][name].state='ready'
        return res
    }
    let datesOption={
        post:{url:config.url||url,method:'post',data:config.data},
        get:{url:config.url||url,method:'get',params:config.params},
        postquery:{url:config.url||url,method:'post',data:config.data,params:config.params},
        delete:{url:config.url||url,method:'delete',params:config.params},
        put:{url:config.url||url,method:'put',data:config.data},
    }
    //首先判断配置是否需要重复调用
    if(config.repeat){
        return this.request(datesOption[config.method]).then(callback);
    }else{
        if(self[model][name].state==='ready'){
            self[model][name].state='pending'; //当该接口发起请求后改为请求中
            return this.request(datesOption[config.method]).then(callback).catch((err)=>{
                self[model][name].state='ready'
                console.log(err)
            });
        }
    }
   
}
export default new myServer()