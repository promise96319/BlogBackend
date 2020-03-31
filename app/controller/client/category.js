const Controller = require('egg').Controller

class CategoryController extends Controller {

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
}

module.exports = CategoryController