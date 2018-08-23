const fs = require('fs');
const path = require('path');
const glob = require('glob');
const _ = require('lodash');

/**
 * 初始化业务逻辑代码类,规整
 * @example {
 *  controller: {
 *    api: [constructor Function]
 *  },
 *  server: {
 *    index: [constructor Function]
 *  }
 * }
 */


class Controller {
  constructor(ctx) {
    this.init(ctx);
  }

  init(ctx) {
    let root = process.cwd();
    let dirList = fs.readdirSync(`${root}/app`);

    dirList = dirList.filter((item) => {
      return !item.includes('.js');
    });
    //初始化目录分类
    let controller = {};
    dirList.map((dir, index) => {
      let currentDir = fs.readdirSync(path.join(`${root}/app/${dir}`));
      controller[dir] = {};
      currentDir.forEach((file, index) => {
        let name = file.split('.')[0];
        let Func = require(path.join(root,`app/${dir}/${file}`));
        controller[dir][name] = new Func(ctx);
      });
    });

    this.controller = controller;
  }
}

module.exports = Controller;



