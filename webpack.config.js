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
                enforce: 'pre',
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'tslint-loader'
                // Enabling the typeCheck option here causes builds to fail:
                // "Ensure that the files supplied to lint have a .ts, .tsx, .d.ts, .js or .jsx extension."
                // Commented out like this, the build runs, but all lines of *.vue files are linted, including
                // <template> and <script> blocks.
                // , options: {
                //     typeCheck: true
                // }
            },
            {
                test: /\.ts$/,
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
