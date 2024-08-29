const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { options } = require('less');

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
                },
            },
            {
                test: /\.(css|less)$/, //匹配 css 文件
                use: ['style-loader', 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: ['autoprefixer']
                        }
                    }
                }, 'less-loader']
            },
            {
                test: /.(png|jpg|jpeg|gif|svg)$/, // 匹配图片文件
                type: "asset", // type选择asset
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb转base64位
                    }
                },
                generator: {
                    filename: 'static/images/[name][ext]', // 文件输出目录和命名
                },
            },
            {
                test: /.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
                type: "asset", // type选择asset
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb转base64位
                    }
                },
                generator: {
                    filename: 'static/fonts/[name][ext]', // 文件输出目录和命名
                },
            },
            {
                test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
                type: "asset", // type选择asset
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb转base64位
                    }
                },
                generator: {
                    filename: 'static/media/[name][ext]', // 文件输出目录和命名
                },
            },

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack5',
            template: path.resolve(rootPath, 'public/index.html'),
            filename: 'index.html',
            publicPath: '/',
            inject: true,
        }),
        new webpack.DefinePlugin({
            'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV)
        }),
    ],
    resolve: {
        extensions: ['.js', '.tsx', '.ts'] // 文件后缀
    },
    optimization: {},
    catch: {
        type: 'filesystem', // 使用文件缓存
    }
}