'use strict';

const path = require('path');
const webpack = require('webpack');

let vendors = [
    'mobx', 'vue-mobx'
];

module.exports = {
    entry: {
        vendor: vendors.concat('vue', 'vue-router', 'async-await-error-handling', 'axios')
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].dll.js',
        //定义输出：window.${output.library}
        library: '[name]_library'
    },
    plugins: [
        new webpack.DllPlugin({
          path: path.join(__dirname, './dist', '[name]-manifest.json'),
          // 和 output.library 一样即可
          name: '[name]_library'
      })
    ]
}
