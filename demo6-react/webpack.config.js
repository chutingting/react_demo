var webpack = require('webpack'),
	path = require('path'),
	fs = require('fs'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: {
		app: ["./app.js"]
	},
	output: { //输出目录
		path: __dirname + './__build__',
		publicPath: "",
		filename: 'shared.js',
		chunkFilename: '[name].[chunkhash:3].min.js',
	},
	module: { //在配置文件里添加JSON loader
		loaders: [{
			test: /\.js$/,
			exclude: /^node_modules$/,
			loader: 'babel'
		}, {
			test: /\.css$/,
			exclude: /^node_modules$/,
			loader: ExtractTextPlugin.extract('style', ['css', 'autoprefixer'])
		}, {
			test: /\.less$/,
			exclude: /^node_modules$/,
			loader: ExtractTextPlugin.extract('style', ['css', 'autoprefixer', 'less'])
		}, {
			test: /\.scss$/,
			exclude: /^node_modules$/,
			loader: ExtractTextPlugin.extract('style', ['css', 'autoprefixer', 'sass'])
		}, {
			test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
			exclude: /^node_modules$/,
			loader: 'file-loader?name=[name].[ext]'
		}, {
			test: /\.(png|jpg|gif)$/,
			exclude: /^node_modules$/,
			loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
				//注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图
		}, {
			test: /\.jsx$/,
			exclude: /^node_modules$/,
			loaders: ['jsx', 'babel']
		}]
	},
	resolve: {
		extensions: ['', '.js', '.json']
	},
	postcss: [
		require('autoprefixer') //调用autoprefixer插件,加入各个浏览器的前缀
	],
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.html'
		}),
		new ExtractTextPlugin('[name]-[hash:3].css'), //css随机数
		new webpack.HotModuleReplacementPlugin(), //热加载插件
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': '"development"'
		}),
	]
};