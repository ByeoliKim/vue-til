const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const merge = require('webpack-merge')

require('@babel/polyfill')


module.exports = (env, opts) => {
    const config = {
        //중복되는 옵션들...
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
        ]
    }

    //개발용
    if (opts.mode === 'development') {
        return merge(config, {
            //추가 개발용 옵션
            devtool : 'eval', //빌드 시간이 적고 디버깅이 가능한 대신에, 최적화가 덜 되어 있고 용량이 클수 있음
            devServer : {
                open: true,
                hot: true
            }
        })

    //제품용 (서비스용)
    } else {
        return merge(config, {
            //추가 제품용 옵션
            devtool : 'cheap-module-source-map', //빌드 시간이 길고, 디버깅이 되지 않고, 용량이 적고 최적화됨
            plugins: [
                new CleanWebpackPlugin()
            ]
        })

    }

}