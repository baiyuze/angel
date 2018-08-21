
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const _ = require('lodash');

module.exports = () => {

  let root = process.cwd();

  return new Promise((resolve, reject) => {
    glob('config/config.*.js', (err, files) => {
      if(err) throw err;
      let configObj = [];
      let fileJson = {};
  
      files.forEach((item, index) => {
        let file = require(path.join(root, item));
  
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