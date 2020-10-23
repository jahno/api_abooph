'use strict'


const Route = use('Route')


 
Route.group(() => {
  

 
    
 Route.get('/create/superadmin/','AdminController.super')
 Route.post('/create/roles/','AdminController.createRole')
 Route.get('/roles/index','AdminController.roleIndex')


     

  /**
   * Dashboard Routes
   */
  //Route.get('dashboard', 'DashboardController.index').as('dahboard')
})
  .prefix('v1/superadmin')
  .namespace('SuperAdmin')
  .middleware('checkConnect')
 // .middleware(['auth', 'is:(admin || manager)'])
