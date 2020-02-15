const Controller = require('egg').Controller

class CetegoryController extends Controller {

  /**
   * 获取文章分类列表
   * method: GET
   * path:   /api/admin/categories
   * 
   * return: [{}]
   * 
   */
  async getCategoryList() {
    const result = await this.app.mysql.select('article_category', {
      orders: [['id', 'desc']], 
    })
    this.ctx.body = result
  }

  /**
   * 添加 / 更新 分类名称
   * method: POST
   * path:   /api/admin/categories
   * 
   * params: { ... [, id : 1]}
   */
  async editCategory() {
    let postData = this.ctx.request.body

    // 如果id存在，则是更新数据
    if (postData.id) {
      const result = await this.app.mysql.update('article_category', postData)
      const updateSuccess = result.affectedRows === 1
      this.ctx.body = { updateSuccess }
    } else {
      // 否则是增加数据
      const result = await this.app.mysql.insert('article_category', postData)
      const addSuccess = result.affectedRows === 1
      this.ctx.body = { addSuccess }
    }
  }
}

module.exports = CetegoryController
