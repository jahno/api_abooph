'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

/**
 * Auth Routes used for admins and users
 */
Route.group(() => {
     
Route.post('login/user', 'AuthController.Login').middleware('setJwtLogin')
Route.post('login/coursier', 'AuthController.Login').middleware('setJwtLogin')
Route.post('login/couturier', 'AuthController.Login').middleware('setJwtLogin')
Route.post('register','AuthController.register').middleware('setJwtLogin')
Route.post('login/admin', 'AuthController.Login').middleware('setJwtLogin')

Route.post('logout','AuthController.logout').middleware(['auth'])


Route.post('/reset/user','PasswordResetController.sendReset').middleware(['resetEmail'])
Route.post('/reset/admin','PasswordResetController.sendReset').middleware(['resetEmail'])
Route.post('/reset/coursier','PasswordResetController.sendReset').middleware(['resetEmail'])
Route.post('/reset/couturier','PasswordResetController.sendReset').middleware(['resetEmail'])



Route.post('/reset/password/user','PasswordResetController.reset').middleware(['resetPass'])
Route.post('/reset/password/admin','PasswordResetController.reset').middleware(['resetPass'])
Route.post('/reset/password/coursier','PasswordResetController.reset').middleware(['resetPass'])
Route.post('/reset/password/couturier','PasswordResetController.reset').middleware(['resetPass'])
 


})
  .prefix('v1/auth')
  .namespace('Auth')
