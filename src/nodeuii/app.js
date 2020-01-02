// 使用babel进行编译
import koa from 'koa'
import router from 'koa-simple-router'
import serve from 'koa-static'
import render from 'koa-swig'
// 将generator转化为async/await
import co from 'co'
import log4js from 'log4js'
// import initController from './controllers/index.js'
import config from './config/index'
import errorHandle from './middleware/errorHandle'
const { asClass, asValue,Lifetime, createContainer } = require('awilix')
const { scopePerRequest, loadControllers } = require('awilix-koa')
const app = new koa();
// 创建一个容器管理服务和路由
const container = createContainer();
// 每一个controlor把需要的service注入进去
container.loadModules([__dirname + '/services/*.js'], {
  formatName: 'camelCase',
  registerOptions: {
    lifetime: Lifetime.SCOPED
  }
})
app.use(scopePerRequest(container))

// 静态资源
app.use(serve(config.staticDir))

// 模板引擎配置
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
// app.use(router(initController))
app.use(loadControllers(__dirname + '/controllers/*.js', {
  cwd: __dirname
}))

app.listen(config.port, function() {
  console.log(`服务已启动啦！！！>>>>> ${config.ip}:${config.port}`);
})