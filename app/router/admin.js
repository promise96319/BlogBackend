module.exports = app => {
  const { router, controller, jwt } = app
  
  router.get('/api/admin/auth', jwt, controller.admin.user.auth)
  router.post('/api/admin/login', controller.admin.user.login)

  router.get('/api/admin/carousels', jwt, controller.admin.carousel.getCarouselList)
  router.post('/api/admin/carousels', jwt, controller.admin.carousel.editCarousel)
  router.delete('/api/admin/carousels', jwt, controller.admin.carousel.deleteCarouselByID)

  router.get('/api/admin/categories', jwt, controller.admin.category.getCategoryList)
  router.post('/api/admin/categories', jwt, controller.admin.category.editCategory)

  router.get('/api/admin/tags', jwt, controller.admin.tag.getTagList)
  router.post('/api/admin/tags', jwt, controller.admin.tag.editTag)

  router.get('/api/admin/articles', jwt, controller.admin.article.getArticleList)
  router.post('/api/admin/articles', jwt, controller.admin.article.editArticle)
  
  // router.post('/api/admin/tags', jwt, controller.admin.tag.editTag)
  // router.post('/api/admin/tags', jwt, controller.admin.tag.editTag)

}