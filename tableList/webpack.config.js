var path = require('path'), 
    webpack = require('webpack'), 
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CopyWebpackPlugin=require('copy-webpack-plugin');

  module.exports = { 
         devtool: 'eval-source-map', 
         entry:"./src/list.jsx", 
         output: { 
              path: __dirname + "/public", 
             filename: "bundle.js" ,
             publicPath: '/'
         }, 
         devServer: { 
             inline: true, 
             port: 8099 
         }, 
         module: { 
              loaders: [ 
                  { 
                      test: /\.(js|jsx)$/,
                      exclude: /node_modules/, 
                      loader: 'babel-loader', 
                      query:{ 
                          presets:['react','es2015'] 
                      } 
                  } 
              ] 

         }, 
         plugins: [ 
             new HtmlWebpackPlugin({ 
                 template: './index.html' 
             }), 
             new webpack.HotModuleReplacementPlugin() ,
             /*new CopyWebpackPlugin([  拷贝的作用
                      {
                      from: 'node_modules/bootstrap/dist/css/bootstrap.css',
                      to: 'public/bootstrap.css'
                  }
             ]),*/
         ] 
};

