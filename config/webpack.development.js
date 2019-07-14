const CopyPlugin = require('copy-webpack-plugin');
const path = require('path')
console.log(path.join(__dirname, '../', '/src/webapp/components'))
module.exports = {
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