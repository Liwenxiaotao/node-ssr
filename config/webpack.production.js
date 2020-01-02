const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
console.log(path.join(__dirname, '../', '/src/webapp/components'))
/**
 *hash:全站js css 同一个版本号
 *contenthash 根据不同的文件生成不同的版本
 *chunkhash js+css
 */
module.exports = {
  output: {
    filename: "scripts/[name].[contenthash:5].bundle.js"
  },
  plugins: [
    new CopyPlugin([           // 复制不用处理的文件
      {
         from: path.join(__dirname, '../', '/src/webapp/views/common/layout.html'),
         to: '../views/common/layout.html'
      }
    ]),
    new CopyPlugin([
      {
        from: path.join(__dirname, '../', '/src/webapp/components'),
        to: '../components'
      }
    ], {
      ignore: ['*.js', '*.css']
    }),
  ],
};