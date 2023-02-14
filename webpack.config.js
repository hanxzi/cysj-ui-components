/*
 * @Description: 
 * @Author: handongliang dongliang.han@12301.cn
 * @Date: 2023-02-06 16:20:46
 * @LastEditors: handongliang dongliang.han@12301.cn
 * @LastEditTime: 2023-02-09 17:00:00
 */
const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const cwd = process.cwd();

function getProjectPath(...filePath) {
    return path.join(cwd, ...filePath);
}

function resolve(moduleName) {
    return require.resolve(moduleName);
}

const pkg = require(getProjectPath('package.json'));
const babelConfig = require('./getBabelCommonConfig')(false);
module.exports = {
    mode: 'development',
    entry: {
        [pkg.name]: './index.js',
    },
    output: {
        filename: '[name].js',
        path: getProjectPath('./dist/'),
        library: pkg.name,
        libraryTarget: 'umd',
    },
    externals: {
        react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react',
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom',
        },
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        alias: {
            [pkg.name]: process.cwd(),
        },
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: resolve('babel-loader'),
                options: babelConfig,
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: resolve('babel-loader'),
                        options: babelConfig,
                    },
                    {
                        loader: resolve('ts-loader'),
                        options: {
                            transpileOnly: true,
                        },
                    },
                ],
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: resolve('css-loader'),
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: resolve('postcss-loader'),
                        options: {
                            postcssOptions: {
                                plugins: ['autoprefixer'],
                            },
                            sourceMap: true,
                        },
                    },
                    {
                        loader: resolve('less-loader'),
                        options: {
                            lessOptions: {
                                javascriptEnabled: true,
                            },
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)(\?v=\d+\.\d+\.\d+)?$/i,
                type: 'asset'
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
          filename: '[name].css',
        }),
      ],
};