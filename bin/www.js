const Koa = require('koa');
const app = new Koa();
const log4js = require('log4js');
const dayjs = require('dayjs');
const appRouter = require('../app/router');
const KoaRouter = require('koa-router');
const configServer = require('../plugins/config-server');
const Controller = require('../plugins/controller');
let router = new KoaRouter();

let logger = log4js.getLogger('cheese');
log4js.configure({
  appenders: { cheese: { type: 'file', filename: `log/cheese-${dayjs().format('YYYY-MM-DD')}.log` } },
  categories: { default: { appenders: ['cheese'], level: 'error' } }
});

(async () => {
  //基本配置管理处理config
  let port = 8080;
  /**
   * 初始化config配置
   */
  app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
  });
  
  // 响应时间
  app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
  });

  let config = await configServer();
  let newController = new Controller().controller;

  /**
   * 绑定context到当前this
   * 
   * @param {this} ctx 上下文 
   */

  //错误事件监听
  //设置初始环境变量
  app.env = config.env ? config.env : app.env;
  //cookie签名验证
  app.keys = config.keys ? config.keys : app.env;

  //业务管理
  appRouter({
    router,
    ...newController
  });

  app.use(router.routes()).use(router.allowedMethods());
  app.use(log4js.connectLogger(logger, {level:log4js.levels.INFO}));
  app.listen(config.listen, () => {
    console.log(`当前服务器已经启动,请访问http://127.0.0.1:${config.listen}`);
  });
  
})()
