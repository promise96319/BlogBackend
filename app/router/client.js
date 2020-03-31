module.exports = app => {
  const { router, controller } = app
  
  router.get('/api/carousels', controller.client.carousel.getCarouselList)

  router.get('/api/articles', controller.client.article.getArticleList)

  router.get('/api/categories', controller.client.category.getCategoryList)

  router.get('/api/tags', controller.client.tag.getTagList)
}
