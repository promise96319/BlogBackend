'use strict';

const Controller = require('egg').Controller;

class ArticleController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hahah';
  }
}

module.exports = ArticleController;
