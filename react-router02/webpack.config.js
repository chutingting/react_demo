var path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['webpack/hot/dev-server', path.resolve(__dirname, './src/app.jsx')],
    output: {
        path: path.resolve(__dirname, './__build__'),
        filename: 'bundle.js'
    },
    devServer: {
        inline: true,
        port: 1234
    },
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react']
            }

        }]
    },
    /*resolve:{
        extensions:['','.css','.js','jsx']
    },*/
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};