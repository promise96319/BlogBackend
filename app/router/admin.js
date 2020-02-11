module.exports = app => {
  const { router, controller } = app
  router.get('/api/admin/carousels', controller.admin.carousel.getCarouselList)
  router.post('/api/admin/carousels', controller.admin.carousel.editCarousel)
  router.delete('/api/admin/carousels', controller.admin.carousel.deleteCarouselByID)
}