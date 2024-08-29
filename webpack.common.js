const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootPath = path.resolve(__dirname, '.');

module.exports = {
    mode: 'none',
    entry: {
        main: {
            import: path.resolve(rootPath, 'src/index.tsx'),
            // dependOn: 'vendors',
        },
        // vendors: ['axios', 'react', 'react-dom', 'react-router-dom'],
    },
    output: {
        filename: 'static/js/[name].js', //输出js的名称加 chunkhash
        path: path.join(__dirname, './dist'),
        clean: true, // 以前需要 clean-webpack-plugin来删除dist文件，webpack5内置了，
        publicPath: '/', // 打包后的公共后缀
    },
    module: {
        rules: [
            {
                test: /.(ts|tsx)$/,
                exclude: '/node_modules/',
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-react',
                            '@babel/preset-typescript'
                        ]
                    }
                },
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack5',
            template: path.resolve(rootPath, 'public/index.html'),
            filename: 'index.html',
            publicPath: '/',
            inject: true,
        })
    ],
    resolve: {
        extensions: ['.js', '.tsx', '.ts'] // 文件后缀
    },
    optimization: {},
    cache: {
        type: 'filesystem',
    }
}