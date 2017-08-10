'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        index: path.resolve(__dirname, './src/index')
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].js',
        library: 'VueAreaLinkage',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
               loader: 'babel-loader'
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: '[name].[ext]?[hash:8]'
                    }
                }]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        limit: 8192,
                        name: '[name].[ext]?[hash:8]'
                    }
                }]
            }
        ]
    }
}
