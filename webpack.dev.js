/*
 * @Descripttion: 
 * @version: 
 * @Author: xdh.ss
 * @Date: 2020-04-08 12:12:33
 * @LastEditors: yang fu ren
 * @LastEditTime: 2021-10-26 11:16:15
 */
const merge = require('webpack-merge');
const argv = require('yargs').argv;
const common = require('./webpack.common.js');
const webpack = require('webpack');

let port = 8000;

if (argv.Program === 'fpms.dev') {
    port = 8087;
}
;

module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
        port: port,
        open: false,
        host:'localhost',
        progress: true, // 打包过程中的进度条
        noInfo: false, // 隐藏bundle信息
        historyApiFallback: true,
        proxy: { // 代理
            "/api/param":{
                //target: "http://173.101.3.112:6066"
                target: "http://173.100.1.154:18080", //邛崃测试,
                pathRewrite: {
                    '^/api/param': ''
                }
                
            }      
        },
        //lazy: true, // 惰性模式
        after() {
            console.log('111111111111111 webpack devServer after')
        },
        before() {
            console.log('222222222222222')
        }
    },
    plugins: [
        // 热更新插件
        new webpack.HotModuleReplacementPlugin(),
    ]
})