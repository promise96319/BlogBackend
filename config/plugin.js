'use strict'

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }

  // 链接 MySQL
  mysql: {
    enable: true,
    package: 'egg-mysql'
  },
  cors: {
    enable: true,
    package: 'egg-cors'
  },
  jwt: {
    enable: true,
    package: 'egg-jwt'
  },
}
