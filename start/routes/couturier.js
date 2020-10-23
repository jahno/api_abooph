'use strict'


const Route = use('Route')


 
Route.group(() => {
   /**
   * couturier resource Routes
   */
   Route.put('/profile', 'CouturierController.edit')
  

  /**
  * Commande routes
  */
  Route.get('/commande', 'CommandeController.index')
  Route.get('/commande/confection/:id_article/:id_commande/start', 'CommandeController.start')
  Route.get('/commande/confection/:id_article/:id_commande/end', 'CommandeController.end')
  Route.get('/commande/:id', 'CommandeController.show')


    /**
   * Article  Resource Rotues
   */
   Route.get('/categoriearticle/all','CategorieArticleController.ShowArticle')
    Route.put('/article/:id/publish','ArticleController.publish')
 Route.resource('article', 'ArticleController')
    .apiOnly() 


})
  .prefix('v1/couturier')
  .namespace('Couturier')
  .middleware('checkConnect')