const Controller = require('egg').Controller

class CarouselController extends Controller {
  /**
   * 获取轮播图列表
   * method: GET
   * path:   /api/carousels
   *
   * return: [{}]
   */
  async getCarouselList() {
    const result = await this.app.mysql.select('carousel')
    this.ctx.body = result
  }
}

module.exports = CarouselController
