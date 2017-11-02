var path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['webpack/hot/dev-server', path.resolve(__dirname, './js/app.jsx')],
    output: {
        path: path.resolve(__dirname, './__build__'),
        filename: 'bundle.js'
    },
    devServer: {
        inline: true,
        port: 2222
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
        new webpack.HotModuleReplacementPlugin()
    ]
};