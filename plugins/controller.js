const Koa = require('koa');
const app = new Koa();

class Context {
  constructor(ctx) {
    this.ctx = ctx;
  }

  /**
   * 绑定context到当前this
   * 
   * @param {this} ctx 上下文 
   */
  initContext(config) {
    app.use(async (ctx) => {
      ctx.config = config;
      this.ctx = ctx;
      this.router = router;
      await appRouter(this);
    });
  }

}

module.exports = Context;