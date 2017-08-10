'use strict';

let path = require('path');

module.exports =  {
    dev:{
        env: 'development',
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsPublicPath: '/',
        contentBase: path.resolve(__dirname, '../dist'),
        port: 3000,
        prefix: ''
    },
    build:{
        env: 'production',
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsPublicPath: '/',
        prefix: ''
    }
}
