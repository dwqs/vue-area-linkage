const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HappyPack = require('happypack');

const getHappyPackConfig = require('./happypack');

const config = require('../config');

module.exports = {
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [{
                    loader: 'happypack/loader?id=vue'
                }]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['happypack/loader?id=js']
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        limit: 8192,
                        name: '[name].[ext]?[hash:8]'
                    }
                }]
            }
        ]
    },

    resolve: {
        extensions: ['.vue', '.js'],
        modules: [path.join(__dirname, '../node_modules')],
        alias: {
            '@src': path.resolve(__dirname, '../src'),
            '@gh': path.resolve(__dirname, '../gh'),
            '@components': path.resolve(__dirname, '../gh/components'),
            'vue$': 'vue/dist/vue.js'
        }
    },

    resolveLoader: {
        modules: [path.join(__dirname, '../node_modules')]
    },

    performance: {
        hints: false
    },

    plugins: [
        new HappyPack(getHappyPackConfig({
            id: 'vue',
            loaders: [{
                path: 'vue-loader',
                query: {
                    // https://github.com/vuejs/vue-loader/issues/863
                    esModule: false
                }
            }]
        })),

        new HappyPack(getHappyPackConfig({
            id: 'js',
            loaders: ['babel-loader']
        })),

        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'tpl.html',
            inject: true,
            env: process.env.NODE_ENV,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: false
            }
        })
    ]
};
