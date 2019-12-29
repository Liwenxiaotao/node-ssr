const Index = require('../models/indexmodel.js')
const cheerio = require('cheerio')

const index = new Index()
class IndexController {
  constructor() {

  }

  async actionIndex(ctx, next) {
    const result = await index.getData('http://localhost:8888/api/blog/list', {})
    const html = await ctx.render('blog/pages/index', { items: result.result })
    if (ctx.headers['x-pjax']) {  // 特殊请求头，判断是否是站内切换
      // 分析html字符串
      const $ = cheerio.load(html)
      // 因js在#app之外，所以需要把js重新插到#app中去
      ctx.body = $('#app').append($('.preloadjs')).html();
    } else {
      ctx.body = html
    }
  }
  async actionAdd(ctx, next) {
    const html = await ctx.render('blog/pages/add')
    if (ctx.headers['x-pjax']) {
      // 分析html字符串
      const $ = cheerio.load(html)
      // const scripts = $('.preloadjs')
      // scripts.each(function() {
      //   _html += `<script src="${$(this).attr('src')}"></script>`
      // })
      // 因js在#app之外，所以需要把js重新插到#app中去
      ctx.body = $('#app').append($('.preloadjs')).html();
    } else {
      ctx.body = html
    }
  }
}

module.exports = IndexController