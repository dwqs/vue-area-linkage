const path = require('path');
const webpack = require('webpack');

const Components = require('./components.json');

module.exports = {
    entry: Components,
    output: {
        path: path.join(__dirname, './dist/lib'),
        filename: '[name].js',
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
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
};
