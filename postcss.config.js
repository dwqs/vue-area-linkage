// fix: https://github.com/akveo/ng2-admin/issues/604
// 使用 happypack 之后 需单独提供 postcss 配置文件
module.exports = {
    plugins: [
        require('autoprefixer')({ browsers: ['last 5 versions', 'Android >= 4.0', 'iOS >= 7'] }),
    ]
};
