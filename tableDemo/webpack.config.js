var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
var WebpackDevServer = require("webpack-dev-server");
/*var compiler = webpack({
    // configuration
})*/

module.exports = {
    context: path.join(__dirname),
    devtool: debug ? "inline-sourcemap" : null,
    entry: "./js/list.jsx",
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    },
    output: {
        path: __dirname + '/public',
        filename: "bundle.js"
    },
    devServer: {
        inline: true
    },

    // plgoogoougins是用来拓展webpack功能，它们会在整个构建过程中生效，执行相关的任务。
    plugins: debug ? [] : [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.DedupePlugin(),//查找相等或近似的模块，避免在最终生成的文件中出现重复的模块
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }), //丑化js 混淆代码而用
        /*new WebpackDevServer(compiler, {
            hot: true,
            historyApiFallback: false,
            compress: true
        })*/
    ]
};
