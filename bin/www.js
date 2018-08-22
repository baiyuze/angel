const Koa = require('koa');
const app = new Koa();
const log4js = require('log4js');
const dayjs = require('dayjs');
const appRouter = require('../app/router');
const Router = require('koa-router');
const configServer = require('../plugins/config-server');
const controller = require('../plugins/controller');
let router = new Router();

log4js.configure({
  appenders: { cheese: { type: 'file', filename: `log/cheese-${dayjs().format('YYYY-MM-DD')}.log` } },
  categories: { default: { appenders: ['cheese'], level: 'error' } }
});

class Context {
  constructor() {
    //基本配置管理处理config
    this.port = 8080;
    this.initConfig();
  }

  /**
   * 初始化config配置
   */
  async initConfig() {
    this.config = await configServer();
    this.controller = new controller();
    console.log(this.controller,'this.controller ')
    this.initContext(this.config);
  }

  /**
   * 绑定context到当前this
   * 
   * @param {this} ctx 上下文 
   */
  initContext(config) {
    this.config = config;
    //业务管理
    this.codeManage();
    //错误事件监听
    this.appError();
    //设置初始环境变量
    app.env = config.env ? config.env : app.env;
    //cookie签名验证
    app.keys = config.keys ? config.keys : app.env;
    //日志
    this.loggerServer(config);
  }

  codeManage(config) {
    app.use(async (ctx) => {
      ctx.config = config;
      this.ctx = ctx;
      this.router = router;
      // console.log(this.controller.controller,'this')
      await appRouter(this);
    });
  }

  appError() {
    app.on('error', err => {
      console.error(new Error(err));
    });
  }

  /**
   * 日志服务
   */
  loggerServer(config) {
    this.logger = log4js.getLogger('cheese');
    app.use(log4js.connectLogger(this.logger, {level:log4js.levels.INFO}));
    app.listen(config.listen);
  }

}

new Context();