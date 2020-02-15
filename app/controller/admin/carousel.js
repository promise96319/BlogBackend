const Controller = require('egg').Controller

class CarouselController extends Controller {
  /**
   * 获取轮播图列表
   * method: GET
   * path:   /api/admin/carousels
   *
   * return: [{}]
   */
  async getCarouselList() {
    const result = await this.app.mysql.select('carousel', {
      orders: [['order_number', 'desc'], ['id', 'desc']], 
    })
    this.ctx.body = result
  }

  /**
   * 添加 / 更新轮播图
   * method: POST
   * path:   /api/admin/carousels
   *
   * params: [...[, id: 1]]
   */
  async editCarousel() {
    let postData = this.ctx.request.body

    // 如果id存在，则是更新数据
    if (postData.id) {
      const result = await this.app.mysql.update('carousel', postData)
      const updateSuccess = result.affectedRows === 1
      this.ctx.body = { updateSuccess }
    } else {
      // 否则是增加数据
      const result = await this.app.mysql.insert('carousel', postData)
      const addSuccess = result.affectedRows === 1
      this.ctx.body = { addSuccess }
    }
  }

  /**
   * 根据 ID 删除轮播图
   * method: DELETE
   * path:   /api/admin/carousels
   * 
   */
  async deleteCarouselByID() {
    const id = this.ctx.request.body.id
    const result = await this.app.mysql.delete('carousel', { id })
    const deleteSuccess = result.affectedRows === 1
    this.ctx.body = { deleteSuccess }
  }
}

module.exports = CarouselController
