const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = function (opts) {
    return {
        id: opts.id,
        threadPool: happyThreadPool,
        verbose: true,
        loaders: opts.loaders
    };
};
