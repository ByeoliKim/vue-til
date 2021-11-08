const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

require('@babel/polyfill')

module.exports = {
    entry: {
        app: [
            '@babel/polyfill',
            path.join(__dirname, 'main.js')
        ]
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist')
    },
    module:{
        rules: [
            {
              test: /\.vue$/,
              loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            }
          ]
    },
    plugins:[
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.html')
        }),
        new CopyPlugin(
            {
                patterns: [
                    { from: 'assets/', to: '' }
                ]
                
            }
        ),
        new CleanWebpackPlugin()
    ]
}