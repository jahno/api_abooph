const Event = use('Event')

Event.on('new::commande', 'Commande.sendMail')
Event.on('new::mesure', 'Commande.sendMailMesure')
Event.on('afectation::coursier', 'Commande.AfectatioCoursier')
Event.on('end::commande', 'Commande.endCommande')

/*Event.on('new::commande', async (user) => {
   console.log(user)
})*/