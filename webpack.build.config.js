'use strict';

const path = require('path');
const webpack = require('webpack');
let ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
let os = require('os');

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
                test:/\.less$/,
                use: [ 'vue-style-loader', 'css-loader', 'less-loader']
            }, 
            {
                test:/\.css$/,
                use: [ 'vue-style-loader', 'css-loader' ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'fonts/[name].[hash:7].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        new ParallelUglifyPlugin({
            workerCount: os.cpus().length,
            cacheDir: '.cache/',
            uglifyJS: {
                compress: {
                    warnings: false,
                    drop_debugger: true,
                    drop_console: true
                },
                comments: false,
                sourceMap: true,
                mangle: true
            }
        }),
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
}
