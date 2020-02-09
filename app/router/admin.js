module.exports = app => {
  const { router, controller } = app
  router.get('/', controller.admin.article.index)
}