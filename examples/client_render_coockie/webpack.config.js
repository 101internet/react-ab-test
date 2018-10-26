"use strict";

var path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devtool: "source-map",
  entry: {
    app: ["@babel/polyfill", "./application/index.js"]
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    port: 9090,
    hot: true,
    hotOnly: true,
    open: true,
    historyApiFallback: true
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    chunkFilename: "[name]-[id].js",
    publicPath: "/",
    library: "[name]",
    libraryTarget: "umd"
  },
  target: "web",
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        context: path.resolve(__dirname, "dist")
      }
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new HtmlWebpackPlugin({
      template: __dirname + "/../share/index.tpl.html",
      inject: "body",
      filename: "index.html"
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // new CleanWebpackPlugin(["dist"]),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: "babel-loader",
            options: {
              // This is a feature of `babel-loader` for Webpack (not Babel itself).
              // It enables caching results in ./node_modules/.cache/babel-loader/
              // directory for faster rebuilds.
              cacheDirectory: true
            }
          }
        ]
      }
    ]
  }
};
