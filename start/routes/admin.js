'use strict'


const Route = use('Route')


 
Route.group(() => {
  

  /**
   * Article resource Routes
   */
  //Route.resource('article', 'ArticleController').apiOnly()


    


  /**
   * Users Resource Rotues
   */
 Route.resource('users', 'UserController')
    .apiOnly() 


   /**
   * Coursier Resource Rotues
   */
    Route.put('/coursier/:id/publish','CoursierController.publish')
 Route.resource('coursier', 'CoursierController')
    .apiOnly() 


  /**
   * Couturier Resource Rotues
   */
   Route.get('/couturier/all','CouturierController.ShowCouturier')
 Route.put('/couturier/:id/publish','CouturierController.publish')
 Route.resource('couturier', 'CouturierController')
    .apiOnly() 

  /**
   * CategorieCouturier Resource Rotues
   */
   Route.get('/categoriecouturier/all','CategorieCouturierController.ShowCouturier')
 Route.resource('categoriecouturier', 'CategorieCouturierController')
    .apiOnly() 


   /**
   * Article Resource Rotues
   */

   Route.put('/article/:id/publish','ArticleController.publish')
 Route.resource('article', 'ArticleController')
    .apiOnly() 



    /**
   * Commande Resource Rotues
   */

 Route.put('/commande/affectation/:id_commande/:id_coursier','CommandeController.affectation')
 Route.resource('commande', 'CommandeController')
    .apiOnly()
    .except(['store','update']) 


  /**
   * CategorieArticle Resource Rotues
   */
     Route.get('/categoriearticle/all','CategorieArticleController.ShowArticle')
      Route.get('/categoriearticle/children','CategorieArticleController.childrens')
 Route.resource('categoriearticle', 'CategorieArticleController')
    .apiOnly() 

 Route.put('/publish/:id','AdminController.publish')
    
 
    
 Route.put('/profile/','AdminController.profile')
 Route.get('/show/','AdminController.index')
 Route.get('/show/:id','AdminController.show')
 Route.post('/create','AdminController.store')
 Route.put('/update/:id','AdminController.update')
 Route.delete('/destroy/:id','AdminController.destroy')




/* Route.post('/create/roles/admin','AdminController.createRole')
*/

     

  /**
   * Dashboard Routes
   */
  //Route.get('dashboard', 'DashboardController.index').as('dahboard')
})
  .prefix('v1/admin')
  .namespace('Admin')
  .middleware('checkConnect')
 // .middleware(['auth', 'is:(admin || manager)'])
