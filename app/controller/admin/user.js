const Controller = require('egg').Controller

class UserController extends Controller {

  /**
   * 查看用户是否已经登录
   * 能访问这个 auth 证明已经能登录 （jwt 中间件）
   */
  async auth() {
    this.ctx.body = { authSuccess: true }
  }

  /**
   * 用户登录
   * method: POST
   * path:   /api/admin/login
   * 
   * params: username, password
   * 
   * return: 是否登录成功
   */ 

  async login() {
    const { ctx, app } = this

    const { username, password } = ctx.request.body

    const result = await app.mysql.get('user', { username, password })

    if (!result) {
      ctx.body = { loginSuccess: false }
      return
    }

    const token = app.jwt.sign({
      username
    }, app.config.jwt.secret)

    ctx.body = { loginSuccess: true, token }
  }
}

module.exports = UserController
