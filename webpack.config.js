const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const devBuild = process.env.NODE_ENV === 'dev';
console.log(`Starting webpack build with NODE_ENV: ${process.env.NODE_ENV}`);

const config = {
    entry: {
        main: [ path.resolve('./src/app/index.ts') ]
    },
    output: {
        publicPath: '/',
        path: path.resolve('dist/'),
        filename: '[name].js'
    },
    resolve: {
        extensions: [ '.ts', '.vue' ],
        modules: [ 'src/app', 'node_modules' ],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    mode: devBuild ? 'development' : 'production',
    devtool: devBuild ? 'cheap-eval-source-map' : undefined,
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/html/index.html',
            inject: 'body',
            hash: true
        }),
        new webpack.ProvidePlugin({
        }),
        // http://vuejs.github.io/vue-loader/en/workflow/production.html
        new webpack.DefinePlugin({
            'process.env': { // Short-circuits all vue.js warning code in "production" builds
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.ts?$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                exclude: /node_modules/,
                options: {
                    typeCheck: true
                }
            },
            {
                test: /\.ts?$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [ /\.vue$/ ]
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    }
};

module.exports = config;
