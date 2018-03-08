const path = require('path');
const webpack = require('webpack');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HappyPack = require('happypack');   

const getHappyPackConfig = require('./happypack');

const devConfig = require('./webpack.base.config');
const config = require('../config');
const url = `http://localhost:${config.dev.port}`;

devConfig.module.rules.unshift({
    test: /\.less$/,
    use: ['happypack/loader?id=less-dev']
}, {
    test: /\.css$/,
    use: ['happypack/loader?id=css-dev']
});

devConfig.plugins = (devConfig.plugins || []).concat([
    new webpack.HotModuleReplacementPlugin(),

    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify(config.dev.env)
        }
    }),

    new HappyPack(getHappyPackConfig({
        id: 'less-dev',
        loaders: ['vue-style-loader', 'css-loader', 'postcss-loader', 'less-loader']
    })),

    new HappyPack(getHappyPackConfig({
        id: 'css-dev',
        loaders: ['vue-style-loader', 'css-loader', 'postcss-loader']
    })),

    new webpack.NoEmitOnErrorsPlugin(),
    new OpenBrowserPlugin({ url: url })
]);

// see https://webpack.github.io/docs/webpack-dev-server.html
devConfig.devServer = {
    hot: true,
    noInfo: false,
    quiet: false,
    port: config.dev.port,
    // #https://github.com/webpack/webpack-dev-server/issues/882
    disableHostCheck: true,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    },
    inline: true,
    // 解决开发模式下 在子路由刷新返回 404 的情景
    historyApiFallback: {
        index: config.dev.assetsPublicPath
    },
    stats: {
        colors: true,
        modules: false
    },
    contentBase: config.dev.contentBase,
    publicPath: config.dev.assetsPublicPath
};

module.exports = Object.assign({}, devConfig, {
    entry: {
        index: [
            'webpack/hot/dev-server',
            `webpack-dev-server/client?http://localhost:${config.dev.port}/`,
            path.resolve(__dirname, '../gh/page/index.js')
        ]
    },
    output: {
        filename: '[name].js',
        path: config.dev.assetsRoot,
        publicPath: config.dev.assetsPublicPath,
        sourceMapFilename: '[file].map',
        chunkFilename: '[name].js'
    },
    devtool: 'source-map'
});
