const fs = require('fs');
const path = require('path');
const glob = require('glob');
const _ = require('lodash');

//初始化业务逻辑代码类,规整
class Controller {
  constructor(ctx) {
    this.ctx = ctx;
    this.initContext();
  }

  /**
   * 拿到所有app
   * 
   * @param {this} app 
   */
  initContext(config) {
    let root = process.cwd();
    let dirList = fs.readdirSync(`${root}/app`);

    dirList = dirList.filter((item) => {
      return !item.includes('.js');
    });

    // console.log(files)
    let app = {};
    dirList.map((dir, index) => {
      let currentDir = fs.readdirSync(path.join(`${root}/app/${dir}`));
      currentDir.forEach((file, index) => {
        app[dir] = {};
        app[dir][file.split('.')[0]] = require(path.join(root,`app/${dir}/${file}`));
      });
    });
    
    this.controller = app;

  }

}

module.exports = Controller;