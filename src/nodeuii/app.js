// 使用babel进行编译
import koa from 'koa'
import router from 'koa-simple-router'
import serve from 'koa-static'
import render from 'koa-swig'
// 将generator转化为async/await
import co from 'co'
import log4js from 'log4js'
import initController from './controllers/index.js'
import config from './config/index'
import errorHandle from './middleware/errorHandle'
const app = new koa();

// 静态资源
app.use(serve(config.staticDir))

// 模板
app.context.render = co.wrap(render({
  root: config.viewDir,
  autoescape: true,
  // cache: 'memory', // disable, set to false
  cache: false,
  ext: 'html',
  writeBody: false
}));

// 打日志
log4js.configure({
  appenders: { cheese: { type: 'file', filename: './logs/cheese.log' } },
  categories: { default: { appenders: ['cheese'], level: 'error' } }
});
const logger = log4js.getLogger('cheese');

// 错误处理
errorHandle.error(app, logger)

// 路由
app.use(router(initController))

app.listen(config.port, function() {
  console.log('服务已启动')
})