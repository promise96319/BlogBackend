'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  // const { router, controller } = app;
  // router.get('/', controller.client.home.index);
  require('./router/client')(app)
  require('./router/admin')(app)
};
