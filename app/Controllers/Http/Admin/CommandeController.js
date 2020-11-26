'use strict'
const Database = use('Database')
const Commande = use('App/Models/Commande')
const Event = use('Event')

class CommandeController {

	 async index ({request,auth,response}) {


    let  {infoUser} =  request.post()
   
  let page = request.input('page') || 1
    
    
    const results = await Commande.query()
                          .with('user')
                          .with('coursier')
                          .with('panier.articles.couturier')
                          .orderBy('id', 'DESC')
                          .paginate(page, 10)
  return response.json({results})
  }


  async show ({request,response,params}) {
    const commande = await Commande.query()
                                  .where('id',params.id)
                                  .with('user')
                                  .with('mesure')
                          		  .with('coursier')
                                .with('panier.articles',(elt)=>{
                                  elt.with('images')
                                  elt.with('couturier')
                                  
                                  elt.withPivot(['qte','EtatConfection'])
                                })
                                  .first()
    return response.status(200).send(commande)

  }

  

    async destroy ({ params, response }) {
    const transaction = await Database.beginTransaction()
    try {
    const commande = await Commande.findOrFail(params.id)
      //await commande.panier().detach(null, transaction)
      await commande.delete()
      await transaction.commit()
      return response.status(200).send({msg:'commande supprimé'})
    } catch (error) {
      await transaction.rollback()
      return response.status(error.status).send(error)
    }
  }


   async affectation ({request,response,params}) {
      
      const commande = await Commande.query()
                                     .where('id',params.id_commande)
                                     .update({coursier_id:params.id_coursier,etat:1})   
       //j'envoie le mail au coursier 
           Event.emit('afectation::coursier', params.id_commande,params.id_coursier)                             

      return response.status(200).send({msg:'Commande affecter au couturier'})
  }


}

module.exports = CommandeController
