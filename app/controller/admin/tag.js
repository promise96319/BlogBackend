const Controller = require('egg').Controller

class TagController extends Controller {

  /**
   * 获取文章标签列表
   * method: GET
   * path:   /api/tags
   * 
   * return: [{}]
   * 
   */
  async getTagList() {}

  /**
   * 添加 / 更新 标签名称
   * method: POST
   * path:   /api/tags
   * 
   * params: { ... [, id : 1]}
   */
  async editTag() {}
}

module.exports = TagController
