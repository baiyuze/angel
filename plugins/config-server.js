
const fs = require('fs');
const path = require('path');
const glob = require('glob');

module.exports = async (ctx, next) => {
  let fileJson = {};
  let root = process.cwd();
  
  glob('config/config.*.js',(err, files) => {
    if(err) throw err;
    files.forEach(item => {
      let file = require(path.join(root, item));
      let obj = {};
      if(typeof file === 'function') {
        obj[item.split('/')[1]] = file();
      } else {
        obj[item.split('/')[1]] = file;
      }
      fileJson = { fileJson, ...obj }
    });
  })
}