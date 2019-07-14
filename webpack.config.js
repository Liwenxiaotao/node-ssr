const merge = require('webpack-merge')
// 解析参数
const argv = require('yargs-parser')(process.argv.slice(2))
const mode = argv.mode || "development"
const _modeFlag = mode === 'production'
const mergeConfig = require(`./config/webpack.${mode}.js`)
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const LiveReloadPlugin = require('webpack-livereload-plugin');
const HtmlAfterWebpackPlugin = require('./plugins/HtmlAfterWebpackPlugin')
const ManifestPlugin = require('webpack-manifest-plugin');

// 入口文件
// {
//   "blog-add": "blog-add.entry.js"
//   "blog-index": "blog-index.entry.js"
// }
let _entry = {}
// 插件
let _plugin = []
const files = glob.sync('./src/webapp/views/**/*.entry.js')
const reg = /.+\/([a-zA-Z]+-[a-zA-Z]+)(\.entry\.js$)/

for(let item of files) {
  if (reg.test(item)) {
    const key = RegExp.$1
    _entry[key] = item
    const [dist, template] = key.split('-')
    _plugin.push(new HtmlWebpackPlugin({           // 处理模板
      title: template,
      filename: `../views/${dist}/pages/${template}.html`,
      template: `src/webapp/views/${dist}/pages/${template}.html`,
      inject: false,
      chunks: ['runtime', 'common', key],
      minify: {
        collapseWhitespace: _modeFlag,
        removeComments: _modeFlag
      }
    }))
  }
}

const webpackConfig = {
  entry: _entry,
  plugins: [
    ..._plugin,
    new HtmlAfterWebpackPlugin(),
    new ManifestPlugin(),
    new LiveReloadPlugin()   // 模块热加载
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      }
    ]
  },
  // watch: !_modeFlag,
  output: {
    path: path.join(__dirname, './dist/assets'),
    publicPath: '/',
    filename: "scripts/[name].bundle.js"
  }
}

module.exports = merge(webpackConfig, mergeConfig)