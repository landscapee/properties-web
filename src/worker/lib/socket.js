/*
 * @Descripttion: socket.io封装
 * @version: 
 * @Author: xdh.ss
 * @Date: 2020-04-02 17:30:40
 * @LastEditors: xdh.ss
 * @LastEditTime: 2020-04-08 10:57:47
 */

import io from 'socket.io-client';

class socket{
    
    constructor(path,token,option){
        this.path = path;
        this.token = token
        this.option = option
        this.socket = null;
    }

    /**
     * @name: start
     * @test: test font
     * @msg: 创建socket，并返回成功或失败状态
     * @param {type} 
     * @return: 
     */
    socket_start(callback){
        // 创建io链接
        this.socket = io.connect(`${this.path}?token=${this.token}`, this.option);
        // 链接成功
        this.socket.on('connect', () => {
            callback(this.socket)
        });
        // 链接错误
        this.socket.on('connect_error', err => {
            // console.error('链接错误' + this.path, err)
        });
        // 超时
        this.socket.on('connect_timeout', err => {
            // console.error('链接超时' + this.path, err)
        })
        // 重新链接次数
        this.socket.on('reconnect_attempt', attempt => {
            // console.log(`${this.path} 重新链接 ${attempt} 次`)
            if (attempt === 10) {
                console.info(`socket ${this.path} 多次重连失败,系统关闭socket`)
                this.socket_close()
                setTimeout(() => {
                    this.socket_open()
                }, 10000);
            }
        })
    }

    /**
     * @name: socket_on
     * @test: test font
     * @msg: socket接收后台数据函数，返回promise
     * @param {type} 
     * @return: promise
     */
    socket_on(path, callback){
        this.socket.on(path, data => {
            callback(data);
        });
    }

    /**
     * @name: socket_emit
     * @test: test font
     * @msg: socket发送数据到后台
     * @param {type} 
     * @return: 
     */
    socket_emit(path, data){
        this.socket.emit(path, data)
    }

    /**
     * @name: socket_close
     * @test: test font
     * @msg: 手动关闭socket
     * @param {type} 
     * @return: 
     */
    socket_close(){
        this.socket.close()
    }

    /**
     * @name: socket_open
     * @test: test font
     * @msg: socket手动重连
     * @param {type} 
     * @return: 
     */
    socket_open(){
        this.socket.open()
    }
}


export default socket;