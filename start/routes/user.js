'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

/**
 * Auth Routes used for admins and users
 */
Route.group(() => {
     
Route.post('register', 'UserController.store')
Route.get('profile', 'UserController.profile').middleware('checkConnect')
Route.post('edit', 'UserController.edit').middleware('checkConnect')
Route.get('commande', 'CommandeController.index').middleware('checkConnect')
Route.get('commande/pdf/:id', 'CommandeController.showPdf').middleware('checkConnect')
Route.get('commande/:id', 'CommandeController.show').middleware('checkConnect')
Route.post('commande', 'CommandeController.store')//.middleware('checkConnect')
Route.post('image', 'UserController.addImage')
Route.get('articles/couturier/:id', 'ArticleController.show')
Route.post('newsletter', 'UserController.newsletter')
Route.post('contact', 'UserController.contact')
Route.get('public', 'UserController.public')
Route.post('numero', 'UserController.numero')

})
  .prefix('v1/user')
  .namespace('User')


/*Route.get('v1/me', 'UserController.me')
  .as('me')
  .middleware('auth')*/