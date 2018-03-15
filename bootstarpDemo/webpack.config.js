var path = require('path'), 
    webpack = require('webpack'), 
    HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = { 
         devtool: 'eval-source-map', 
         entry:"./src/ToDoapp.jsx", 
         output: { 
              path: __dirname + "/public", 
             filename: "bundle.js" ,
             publicPath: '/'
         }, 
         devServer: { 
             inline: true, 
             port: 9999
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
          /*resolve:{  //自动补全识别后缀
              extensions:['','.css','.js','jsx']
          },*/
         plugins: [ 
             new HtmlWebpackPlugin({ 
                 template: './index.html' 
             }), 
             new webpack.HotModuleReplacementPlugin() 
         ] 
};

