const cheerio = require('cheerio')
const { route, GET } = require('awilix-koa')

@route('/index')
class IndexController {
  constructor({ indexService }) {
    this.indexService = indexService
  }
  @route('/list')
  @GET()
  async actionIndex(ctx, next) {
    const result = await this.indexService.getData('http://localhost:8888/api/blog/list', {})
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
  @route('/add')
  @GET()
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