'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        vendor: ['vue', 'element-ui', 'area-data']
    },
    output: {
        path: path.join(__dirname, './demo'),
        filename: '[name].dll.js',
        //定义输出：window.${output.library}
        library: '[name]_library'
    },
    plugins: [
        new webpack.DllPlugin({
          path: path.join(__dirname, './demo', '[name]-manifest.json'),
          // 和 output.library 一样即可
          name: '[name]_library'
      })
    ]
}
