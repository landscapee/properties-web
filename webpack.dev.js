/*
 * @Descripttion: 
 * @version: 
 * @Author: xdh.ss
 * @Date: 2020-04-08 12:12:33
 * @LastEditors: yang fu ren
 * @LastEditTime: 2021-07-08 09:39:51
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
        host:'127.0.0.1',
        progress: true, // 打包过程中的进度条
        noInfo: false, // 隐藏bundle信息
        historyApiFallback: true,
        proxy: { // 代理
            "/api":{
                target: "http://173.101.3.113:18080",
            },
            "/project/api":{
                target: "http://173.101.3.31:8089",
                pathRewrite: {
                    '^/project/api': ''
                }
            } ,
            "/sso/api":{
                target: "http://173.101.3.31:8082",
                pathRewrite: {
                    '^/sso/api': ''
                }
            },
            "/map/api":{
                target: "http://173.101.3.31:8080",
                pathRewrite: {
                    '^/map/api': '/geoserver/sccsky'
                }
            } ,
            "/sys/api":{
                target: "http://173.101.3.31:9089",
                pathRewrite: {
                    '^/sys/api': ''
                }
            },
            "/file/api":{
                target: "http://173.101.3.31:8845",
                pathRewrite: {
                    '^/file/api': ''
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