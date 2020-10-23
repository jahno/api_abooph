'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

/**
 * Auth Routes used for admins and users
 */
Route.group(() => {
     
 Route.resource('espace', 'LeMalController')
    .apiOnly() 

})
  .prefix('lemal/')
  .namespace('LeMal')