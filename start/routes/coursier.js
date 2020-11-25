'use strict'


const Route = use('Route')


 
Route.group(() => {
   /**
   * Coursier resource Routes
   */
  Route.get('/commande', 'CommandeController.index')
  Route.get('/commande/:id', 'CommandeController.show')
  Route.get('/mesure/:type', 'CommandeController.mesure')
  Route.post('/commande/Mesure/:id', 'MesureController.store')
  Route.put('/profile', 'CoursierController.edit')
  

})
  .prefix('v1/coursier')
  .namespace('Coursier')
  .middleware('checkConnect')
