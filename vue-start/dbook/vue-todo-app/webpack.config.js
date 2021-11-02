const path = require('path')

module.exports = {
    //진입점
    entry: {
        app: path.join(__dirname, 'main.js') //별칭
    },
    //결과물에 대한 설정
    output: {
        filename: '[name].js', //app.js
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    },
    Plugins: [
        new VueLoaderPlugin()
    ]
}