const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const os = require('os');
const CompressionPlugin = require("compression-webpack-plugin");
const HappyPack = require('happypack');

const getHappyPackConfig = require('./happypack');

const prodConfig = require('./webpack.base.config');
const config = require('../config');

prodConfig.module.rules.unshift({
    test: /\.less$/,
    use: ExtractTextPlugin.extract({
        fallback: 'vue-style-loader',
        use: ['happypack/loader?id=less-prod']
    })
}, {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
        fallback: 'vue-style-loader',
        use: ['happypack/loader?id=css-prod']
    })
});

prodConfig.plugins = (prodConfig.plugins || []).concat([
    new CleanWebpackPlugin(['demo'], {
        root: path.join(__dirname, '../'),
        verbose: true,
        dry: false
    }),

    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify(config.build.env)
        }
    }),

    new ExtractTextPlugin({
        filename: '[name].[contenthash:8].css'
    }),

    new HappyPack(getHappyPackConfig({
        id: 'less-prod',
        loaders: ['css-loader', {
            path: 'postcss-loader',
            query: {
                sourceMap: 'inline'
            }
        }, 'less-loader']
    })),

    new HappyPack(getHappyPackConfig({
        id: 'css-prod',
        loaders: ['css-loader', {
            path: 'postcss-loader',
            query: {
                sourceMap: 'inline'
            }
        }]
    })),

    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
        cssProcessorOptions: {
            safe: true
        },
        assetNameRegExp: /\.less$/g
    }),

    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: ({ resource }) => (
            resource &&
            resource.indexOf('node_modules') >= 0 &&
            resource.match(/\.js$/)
        )
    }),

    // gzip
    new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.(js|html|less)$/,
        threshold: 10240,
        minRatio: 0.8
    }),

    new ParallelUglifyPlugin({
        workerCount: os.cpus().length,
        cacheDir: '.cache/',
        uglifyJS: {
            compress: {
                warnings: false,
                /* eslint-disable camelcase */
                drop_debugger: true,
                drop_console: true
            },
            comments: false,
            sourceMap: true,
            mangle: true
        }
    }),

    new webpack.optimize.ModuleConcatenationPlugin(),
    new WebpackMd5Hash()
]);

module.exports = Object.assign({}, prodConfig, {
    entry: {
        gh: path.resolve(__dirname, '../gh/page/index.js')
    },
    output: {
        filename: '[name].[chunkhash:8].js',
        path: config.build.assetsRoot,
        publicPath: config.build.assetsPublicPath,
        sourceMapFilename: '[file].map',
        chunkFilename: '[name].[chunkhash:8].js'
    }
});
