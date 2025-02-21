const { merge } = require("webpack-merge");
const { readEnv } = require("./utils");
const config = readEnv("./.env.development");
const { DefinePlugin } = require("webpack");
const webpackCommonConfig = require("./webpack.common.js");

//读取环境变量
module.exports = merge(webpackCommonConfig, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  // devtool:false,
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new DefinePlugin({
      BASE_URL: JSON.stringify("/"),
      "process.env": config,
    }),
  ],
  devServer: {
    port: "auto",
    hot: true,
    compress: true,
    host: "localhost",
    historyApiFallback: true, //history路由错误问题
    client: {
      logging: "warn",
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
  stats: "errors-warnings",
});
