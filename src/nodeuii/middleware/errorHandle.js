const errorHandle = {
  error(app, logger) {
    app.use(async (ctx, next) => {
      try {
        await next()
      } catch(err) {
        logger.error(err)
        ctx.status = err.status || 500
        // ctx.body = await ctx.render("error")
        ctx.body = err
      }
    })
    app.use(async (ctx, next) => {
      await next()
      if (404 !== ctx.status) {
        return
      }
      ctx.status = 200
      ctx.body = '<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8"></script>'
    })
  }
}

module.exports = errorHandle