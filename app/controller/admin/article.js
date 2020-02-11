'use strict';

const Controller = require('egg').Controller;

class ArticleController extends Controller {
  
  async index(title) {
    const { ctx } = this;
    ctx.body = 'admin';
    return 1
  }

  async getArticleList() {
    
  }
}

module.exports = ArticleController;
