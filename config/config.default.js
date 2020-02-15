/* eslint valid-jsdoc: "off" */

'use strict'

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {})

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_96319'

  // add your middleware config here
  config.middleware = []

  // add your user config here
  const userConfig = {
    mysql: {
      // database configuration
      client: {
        // host
        host: 'www.qinguanghui.com',
        // port
        port: '3306',
        // username
        user: 'qinguanghui',
        // password
        password: 'Qgh3006486**',
        // database
        database: 'blog'
      },
      // load into app, default is open
      app: true,
      // load into agent, default is close
      agent: false
    },
    security: {
      csrf: {
        enable: false
      },
      domainWhiteList: ['http://localhost:8001']
    },
    cors: {
      origin: 'http://localhost:8001',
      credentials: true,
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
    },
    jwt: {
      secret: 'qinguanghui-blog'
    }
  }

  return {
    ...config,
    ...userConfig
  }
}
