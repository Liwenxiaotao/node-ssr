const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const minify = require('html-minifier').minify;
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
        to: '../components',
        transform(content, path) {
          return minify(content.toString('utf-8'), {
            removeAttributeQuotes: true
          });
        },
      }
    ], {
      ignore: ['*.js', '*.css']
    }),
    new LiveReloadPlugin(),   // 模块热加载
  ],
};