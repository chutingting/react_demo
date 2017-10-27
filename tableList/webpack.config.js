var path = require('path'), 
    webpack = require('webpack'), 
    HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = { 
         devtool: 'eval-source-map', 
         entry: __dirname + "/src/list.jsx", 
         output: { 
              path: __dirname + "/public", 
             filename: "bundle.js" 
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
                  } ,
                  {
                      test: /\.css$/, loader: "style!css"
                  },
                  {
                      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
                      loader: 'url-loader?limit=10000'
                  },
                  //fonts loader
                  { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&mimetype=application/font-woff" },
                  { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=application/octet-stream" },
                  { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file" },
                  { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=image/svg+xml" },

              ] 

         }, 
         plugins: [ 
             new HtmlWebpackPlugin({ 
                 template: './index.html' 
             }), 
             new webpack.HotModuleReplacementPlugin() ,
             new webpack.optimize.OccurenceOrderPlugin()
         ] 
};

