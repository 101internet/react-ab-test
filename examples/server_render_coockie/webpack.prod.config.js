"use strict";
// var ReactLoadablePlugin = require("react-loadable/webpack").ReactLoadablePlugin;
const clone = require("clone");
const path = require("path");
// const webpack = require("webpack");
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
var base = {
  node: {
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
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
};

const server = clone(base);
const client = clone(base);

server.entry = {
  app: ["@babel/polyfill", "./application/server.js"]
};

client.entry = {
  app: ["@babel/polyfill", "./application/client.js"]
};

server.output = {
  path: path.resolve(__dirname + "/public/static/server"),
  filename: "[name].js",
  publicPath: "/",
  library: "App",
  libraryTarget: "commonjs"
};

(client.output = {
  path: path.resolve(__dirname + "/public/static/client"),
  filename: "[name].js",
  chunkFilename: "[name].js",
  publicPath: "/"
}),
  (module.exports = [server, client]);
