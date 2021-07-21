/*
 * @Descripttion: 
 * @version: 
 * @Author: xdh.ss
 * @Date: 2020-04-08 12:12:15
 * @LastEditors: yang fu ren
 * @LastEditTime: 2021-07-20 10:11:33
 */

const path = require('path');
const argv = require('yargs').argv;
const _ = require('lodash');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('vue-html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const webpack = require('webpack');

let html_webpack_plugin;
let indexJs = './index.js';


const HtmlWebpackPluginConfig = {
    title: '',
    template: path.resolve(__dirname, './index.hbs'),
    filename: 'index.html',
    vue: true,
    hash: true
}

if (argv.Program === 'fpms.dev' || argv.Program === 'fpms.build') {
    html_webpack_plugin = new HtmlWebpackPlugin(_.extend(HtmlWebpackPluginConfig, {title: '参数管理'}));
    indexJs = './index.js';
}

function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    entry: [
        'babel-polyfill',
        path.resolve(__dirname, indexJs)
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js',
        publicPath: "/parameter/",
        globalObject: 'this',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('lib'), resolve('workerRegist.js'), resolve('index.js')]
            },
            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader',
                include: [resolve('src/ui/icons')],
                options: {
                  symbolId: 'icon-[name]'
                }
            },
            {
                test: /\.scss|.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'vue-style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        // {
                        //     loader: 'px2rem-loader',
                        //     options: {
                        //       remUnit:100,
                        //       remPrecision: 8
                        //     }
                        // },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                exclude: [resolve('src/ui/icons')],
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: '[name].[ext]'
                    }
                }
            },
            {
                test: /\.hbs$/,
                use: [
                    {loader: 'handlebars-loader'}
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader',
                exclude: [resolve('src/ui/icons')]
            }
        ]
    },
    node:{
        fs: "empty"
    },
    plugins: [
        new ExtractTextPlugin({
            filename:'[name].styles.css',
            allChunks:true
        }),
        // 添加静态资源打包
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'static'),
                to: 'static',
                ignore: ['.*']
            }
        ]),
        
        new VueLoaderPlugin(),
        html_webpack_plugin,
        new webpack.DefinePlugin({
            PROGRAM: JSON.stringify(argv.Program)
        }),
    ],
    resolve: {
        // modules: ['node_modules', 'src', 'static', 'worker'],
        extensions:['.js','.vue'], // 后缀省略设置
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src/ui'),
        }
    }
}