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

  /**
   * 添加 / 更新 标签名称
   * method: POST
   * path:   /api/admin/tags
   * 
   * params: { ... [, id : 1]}
   */
  async editTag() {
    let postData = this.ctx.request.body

    // 如果id存在，则是更新数据
    if (postData.id) {
      const result = await this.app.mysql.update('tag', postData)
      const updateSuccess = result.affectedRows === 1
      this.ctx.body = { updateSuccess }
    } else {
      // 否则是增加数据
      const result = await this.app.mysql.insert('tag', postData)
      const addSuccess = result.affectedRows === 1
      this.ctx.body = { addSuccess }
    }
  }
}

module.exports = TagController
