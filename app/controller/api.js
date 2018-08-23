

class Api {
  constructor(ctx) {
    
  }

  index(ctx) {
    console.log(this,'-===---=-==-')
  }

  test(ctx) {
    ctx.body = 'test'
  }
}

module.exports = Api;