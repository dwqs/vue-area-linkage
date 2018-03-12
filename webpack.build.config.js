const path = require('path');
const webpack = require('webpack');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const os = require('os');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    entry: {
        index: path.resolve(__dirname, './src/index')
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].js',
        library: 'VueAreaLinkage',
        libraryTarget: 'commonjs2'
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
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'vue-style-loader',
                    use: ['css-loader', 'postcss-loader', 'less-loader']
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'vue-style-loader',
                    use: ['css-loader']
                })
            }
        ]
    },

    resolve: {
        extensions: ['.vue', '.js'],
        modules: [path.join(__dirname, './node_modules')],
        alias: {
            '@src': path.resolve(__dirname, './src')
        }
    },
    
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css'
        }),

        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            },
            cssProcessor: require('cssnano'),
            assetNameRegExp: /\.less|\.css$/g
        }),

        // new ParallelUglifyPlugin({
        //     workerCount: os.cpus().length,
        //     cacheDir: '.cache/',
        //     uglifyJS: {
        //         compress: {
        //             warnings: false,
        //             /* eslint-disable camelcase */
        //             drop_debugger: true,
        //             drop_console: true
        //         },
        //         comments: false,
        //         sourceMap: true,
        //         mangle: true
        //     }
        // }),
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
};
