const Index = require('./controller/index');
/**
 * 
 * @param {angel 实例化对象} app 
 */

module.exports = (app) => {
  let { ctx, router } = app;
  // console.log(app,' -----')
  // ctx.body = '大家好，我是天使!';
  router.get('/', new Index(ctx).index);
}