// 从https://www.webpackjs.com/官网照着配置
const {resolve} = require('path');

module.exports = {
    // 入口
    entry: './src/index.js',
    // 出口
    output: {
        filename:'build.js',
        path:resolve(__dirname,'build')
    },
    devServer: {
        // 端口号
        port: 8081,
        // 静态资源文件夹
        contentBase: resolve(__dirname,'build'),
    }
};