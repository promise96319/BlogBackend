const Controller = require('egg').Controller

class CetegoryController extends Controller {

  /**
   * 获取文章分类列表
   * method: GET
   * path:   /api/categories
   * 
   * return: [{}]
   * 
   */
  async getCategoryList() {}

  /**
   * 添加 / 更新 分类名称
   * method: POST
   * path:   /api/categories
   * 
   * params: { ... [, id : 1]}
   */
  async editCategory() {}
}

module.exports = CetegoryController
