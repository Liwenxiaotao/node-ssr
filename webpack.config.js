const merge = require('webpack-merge')
const webpack = require('webpack')
// 解析参数
const argv = require('yargs-parser')(process.argv.slice(2))
const mode = argv.mode || "development"
const _modeFlag = mode === 'production'
const mergeConfig = require(`./config/webpack.${mode}.js`)
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const HtmlAfterWebpackPlugin = require('./plugins/HtmlAfterWebpackPlugin')  // 自定义的插件,替换路径和插入css、js
const ManifestPlugin = require('webpack-manifest-plugin');  // 生成manifest.json 保存所有文件构建之后所对应的位置
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 把CSS从js中提取出来
const postcssPresetEnv = require('postcss-preset-env');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 入口文件
// {
//   "blog-add": "blog-add.entry.js"
//   "blog-index": "blog-index.entry.js"
// }
let _entry = {}
// 插件
let _plugin = []
// 找到所有入口文件：以.entry.js结尾
const files = glob.sync('./src/webapp/views/**/*.entry.js')
const reg = /.+\/([a-zA-Z]+-[a-zA-Z]+)(\.entry\.js$)/

for(let item of files) {
  if (reg.test(item)) {
    const key = RegExp.$1
    _entry[key] = item
    const [dist, template] = key.split('-')
    _plugin.push(new HtmlWebpackPlugin({           // 处理模板，对应放入模板插入相应的js
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

const cssLoader = [MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader',
    options: {
      // minimize: _modeFlag,
      importLoaders: 1
    },
  },
  {
    loader:'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: () => [
        postcssPresetEnv({
          stage: 3,
          features: {
            'nesting-rules': true
          }
        }),
        require('autoprefixer')
      ]
    }
  },
]
// 开发环境css热更新
!_modeFlag && cssLoader.unshift('css-hot-loader')
const webpackConfig = {
  entry: _entry,
  watch: !_modeFlag,
  plugins: [
    ..._plugin,
    new MiniCssExtractPlugin({
      filename: _modeFlag ? 'styles/[name].[contenthash:5].css' : 'style/[name].css',
      chunkFilename: _modeFlag ? 'styles/[name].[contenthash:5].css' : 'style/[name].css',
    }),
    new HtmlAfterWebpackPlugin(),
    new ManifestPlugin(),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoader
      }
    ]
  },
  // watch: !_modeFlag,
  output: {
    path: path.join(__dirname, './dist/assets'),
    publicPath: '/',
    filename: "scripts/[name].bundle.js"
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {   // 提取公用包
          chunks: 'initial',
          name: 'common',
          minChunks: 3,
          minSize: 0
        },
      },
    },
    runtimeChunk: {
      name: 'runtime'     // 提取webpack核心代码
    },
  },
}

module.exports = merge(webpackConfig, mergeConfig)