
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const _ = require('lodash');

//config 配置
module.exports = () => {

  let root = process.cwd();

  return new Promise((resolve, reject) => {
    glob(`${root}/config/config.*.js`, (err, files) => {
      if(err) throw err;
      let configObj = [];
      let fileJson = {};
  
      files.forEach((item, index) => {
        let file = require(item);
  
        if(typeof file === 'function') {
          configObj[index] = file();
        } else {
          configObj[index] = file;
        }
  
      });
  
      fileJson = _.assign( {}, ...configObj );
      resolve(fileJson);
    })
  })

}