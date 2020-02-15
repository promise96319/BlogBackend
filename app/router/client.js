module.exports = app => {
  const { router, controller } = app
  router.get('/api/carousels', controller.client.carousel.getCarouselList)
}
