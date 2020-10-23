const Route = use('Route')

Route.group(() => {
  

  /**
   * Article resource Routes
   */
  Route.get('index', 'ArticleController.index')
  Route.get('all', 'ArticleController.all')
  Route.get('accueil', 'ArticleController.accueil')
  Route.get(':id', 'ArticleController.show')

 
     

})
  .prefix('v1/article')
  .namespace('Article')