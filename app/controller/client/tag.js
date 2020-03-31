const Controller = require('egg').Controller

class TagController extends Controller {

  /**
   * 获取文章标签列表
   * method: GET
   * path:   /api/admin/tags
   * 
   * return: [{}]
   * 
   */
  async getTagList() {
    const result = await this.app.mysql.select('tag', {
      orders: [['id', 'desc']], 
    })
    this.ctx.body = result
  }
}

module.exports = TagController