'use strict';

const Controller = require('egg').Controller;

class ArticleController extends Controller {
  async getArticleList() {
    const { ctx, app } = this
    
    const { id, categoryID, tagID } = ctx.query
    console.log(ctx.query);
    
    let sql = ''
    if (id) {
      sql = `
        SELECT 
          a.id, a.title, a.author_name, a.description, a.add_time, a.image_src, a.category_id, ac.category_name, GROUP_CONCAT(t.tag_name) AS tags, GROUP_CONCAT(t.id) AS tags_id, acontent.content
        FROM 
          article a
        LEFT JOIN 
          article_category ac
        ON 
          a.category_id = ac.id
        LEFT JOIN 
          article_tag at
        ON 
          a.id = at.article_id
        LEFT JOIN
          tag t
        ON 
          at.tag_id = t.id
        LEFT JOIN
          article_content acontent
        ON
          a.content_id = acontent.id
        WHERE
          a.id = ${id}
        GROUP BY
          a.id
      `
    }

    if (categoryID) {
      sql = `
        SELECT 
          a.id, a.title, a.author_name, a.description, a.add_time, a.image_src, ac.category_name, GROUP_CONCAT(t.tag_name) AS tags
        FROM 
          article a
        LEFT JOIN 
          article_category ac
        ON 
          a.category_id = ac.id
        LEFT JOIN 
          article_tag at
        ON 
          a.id = at.article_id
        LEFT JOIN
          tag t
        ON 
          at.tag_id = t.id
        WHERE 
          a.category_id = ${categoryID}
        GROUP BY
          a.id
        ORDER BY
          a.add_time DESC
      `
    }

    if (tagID) {
      const idListSql = `
         SELECT 
           GROUP_CONCAT(article_id) AS ids
         FROM
           article_tag at
         WHERE
           at.tag_id = ${tagID}
         GROUP BY
           tag_id
       `

      const idArr = await app.mysql.query(idListSql)
      if (idArr.length === 0) {
        ctx.body = []
        return
      }
      
      const ids = '(' + idArr[0].ids + ')'

      sql = `
        SELECT 
          a.id, a.title, a.author_name, a.description, a.add_time, a.image_src, ac.category_name, GROUP_CONCAT(t.tag_name) AS tags
        FROM 
          article a
        LEFT JOIN 
          article_category ac
        ON 
          a.category_id = ac.id
        LEFT JOIN
          article_tag at
        ON 
          a.id = at.article_id
        LEFT JOIN
          tag t
        ON 
          at.tag_id = t.id
        WHERE
          a.id in ${ids}
        GROUP BY
          a.id
        ORDER BY
          a.add_time DESC
      `
    }

    if (JSON.stringify(ctx.query) === '{}') {
      sql = `
        SELECT 
          a.id, a.title, a.author_name, a.description, a.add_time, a.image_src, ac.category_name, GROUP_CONCAT(t.tag_name) AS tags
        FROM 
          article a
        LEFT JOIN 
          article_category ac
        ON 
          a.category_id = ac.id
        LEFT JOIN 
          article_tag at
        ON 
          a.id = at.article_id
        LEFT JOIN
          tag t
        ON 
          at.tag_id = t.id
        GROUP BY
          a.id
        ORDER BY 
          a.add_time DESC
      `
    }

    const result = await app.mysql.query(sql)
    if (id) {
      let dealResult = result.map((item, index) => {
        // 将 tags 字符串转化成数组
        if (item.tags) {
          item.tags = item.tags.split(',')
        } else {
          item.tags = []
        } 
        
        if (item.tags_id) {
          item.tags_id = item.tags_id.split(',').map(item => Number(item))
        } else {
          item.tags_id = []
        }

        return item
      })
      ctx.body = dealResult.length === 0 ? {} : dealResult[0]
    } else {
      let dealResult = result.map((item, index) => {
        // 将 tags 字符串转化成数组
        if (item.tags) {
          item.tags = item.tags.split(',')
        } else {
          item.tags = []
        }
        return item
      })
      ctx.body = dealResult
    }
  }
}

module.exports = ArticleController;
