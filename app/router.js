/**
 * 
 * @param {angel 实例化对象} app 
 */

module.exports = async (app) => {
  let { router, controller } = app;
  router.get('/',controller.api.index );
  
}