const path = require('path');

const rootPath = Path.resolve(__dirname, '.');

module.exports = {
    mode: 'none',
    entry: {
        main: {
            import: path.resolve(rootPath, 'src/index.tsx'),
            dependOn: 'vendors',
        },
        vendors: ['axios', 'react', 'react-dom', 'react-router-dom'],
    },
    output: {
        filename: 'static/js/[name].js', //输出js的名称加 chunkhash
        path: path.join(__dirname, '../dist'),
        clean: true, // 以前需要 clean-webpack-plugin来删除dist文件，webpack5内置了，
        publicPath: '/', // 打包后的公共后缀
    },
    module: {},
    plugins: [],
    resolve: {},
    optimization: {},
    cache: {
        type: 'filesystem',
    }
}