const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: resolve(__dirname, "./src/index.js"),
  output: {
    filename: "[name].[hash:8].js",
    path: resolve(__dirname, "../vuedist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "./public/index.html"),
    }),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    // 端口号
    port: 8086,
    // 静态资源文件夹
    contentBase: "www",
  },
};
