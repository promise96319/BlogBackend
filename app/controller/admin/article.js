'use strict'

const Controller = require('egg').Controller

class ArticleController extends Controller {
  /**
   * 获取文章列表
   * 
   * 如果传入参数 id, 则返回该文章 id 数据
   *
   * 如果传入参数 categoryID， 则返回该类别下的数据
   *
   * 如果传入参数 tagID, 则返回该标签下的数据
   *
   * 如果什么都不传，则返回所有的文章数据
   *
   */
  async getArticleList() {
    const { ctx, app } = this
    const { id, categoryID, tagID } = ctx.query

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

  async editArticle() {
    const { ctx, app } = this
    const { id, title, description, author_name, image_src, category_id, content, tags_id, add_time } = ctx.request.body
    if (id) {
      // 更新
      const articleResult = await app.mysql.update('article', {
        id, title, description, author_name, image_src, category_id
      })
      const article = await app.mysql.get('article', { id })
      const contentResult = await app.mysql.update('article_content', {
        content,
        id: article.content_id
      })

      await app.mysql.delete('article_tag', {
        article_id: id
      })

      const addSuccess = tags_id.every(async (item) => {
        const result = await app.mysql.insert('article_tag', {
          article_id: id, tag_id: item
        })
        return result.affectedRows == 1
      })
      
      ctx.body = {
        updateSuccess: articleResult.affectedRows == 1 
          && addSuccess 
          && contentResult.affectedRows == 1
      }
    } else {
      const contentResult = await app.mysql.insert('article_content', { content })
      const { affectedRows, insertId } = contentResult
      
      const articleResult = await app.mysql.insert('article', {
        title,
        description, 
        author_name,
        image_src,
        category_id,
        add_time,
        content_id: insertId
      })

      const insertSuccess = tags_id.every(async (item) => {
        const result = await app.mysql.insert('article_tag', {
          article_id: articleResult.insertId,
          tag_id: item
        })
        return result.affectedRows == 1
      })

      ctx.body = {
        addSuccess: affectedRows == 1 && articleResult.affectedRows == 1 && insertSuccess
      }
    }

  }

  // 隐藏显示
  async deleteArticleByID() {}
}

module.exports = ArticleController
