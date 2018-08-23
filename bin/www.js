const http = require('http');
const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {

  ctx.body = 'Hello World';
});

app.listen(7001, () => {
  console.log('服务器已经启动,访问127.0.0.1:7001');
})


  