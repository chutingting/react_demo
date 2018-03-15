var path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CopyWebpackPlugin=require('copy-webpack-plugin');

module.exports = {
    entry: ['webpack/hot/dev-server', path.resolve(__dirname, './app.js')],
    output: {
        path: path.resolve(__dirname, './__build__'),
        filename: 'bundle.js'
    },
    devServer: {
        inline: true,
        port: 8099
    },
    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react']
            }

        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        /*new CopyWebpackPlugin([  拷贝的作用
                      {
                      from: 'node_modules/bootstrap/dist/css/bootstrap.css',
                      to: 'public/bootstrap.css'  //index.html 引入
                  }
             ]),*/
    ]
};