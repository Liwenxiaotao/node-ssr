const Index = require('../models/indexmodel.js')
const cheerio = require('cheerio')

const index = new Index()
class IndexController {
  constructor() {

  }

  async actionIndex(ctx, next) {
    const result = await index.getData('http://localhost:8888/api/blog/list', {})
    const html = await ctx.render('blog/pages/index', { items: result.result })
    if (ctx.headers['x-pjax']) {
      // 分析html字符串
      const $ = cheerio.load(html)
      ctx.body = $('#app').html()
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
      ctx.body = $('#app').html()
    } else {
      ctx.body = html
    }
  }
}

module.exports = IndexController