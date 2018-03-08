const path = require('path');

module.exports = {
    dev: {
        env: 'development',
        assetsRoot: path.resolve(__dirname, '../demo'),
        assetsPublicPath: '/',
        contentBase: path.resolve(__dirname, '../demo'),
        port: 4000
    },
    build: {
        env: 'production',
        assetsRoot: path.resolve(__dirname, '../demo'),
        assetsPublicPath: './demo/'
    }
};
