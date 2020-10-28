'use strict'

const Database = use('Database')
const Commande = use('App/Models/Commande')

class CommandeController {

	 async index ({request,auth,response}) {


  let  infoUser = await auth.authenticator(`jwt_coursier`).getUser()  
     
  let page = request.input('page') || 1
    
    
/*    const results = await Commande.query()
    					  .where('coursier_id',infoUser.id)
                          .with('user.mesure')
                          .with('panier.articles.couturier')
                          .orderBy('id', 'DESC')
                          .paginate(page, 10)*/

            const results = await Commande.query()
                .where('coursier_id',infoUser.id)
                          .with('user.mesure')
                          .with('panier.articles.couturier')
                          .with('panier.articles',(elt)=>{
                            elt.withPivot(['qte','EtatConfection'])
                          })
                          .orderBy('id', 'DESC')
                          .paginate(page, 10)


  return response.json({results})
  }


    async show ({request,response,params,auth}) {

    let  infoUser = await auth.authenticator(`jwt_coursier`).getUser()  
    const commande = await Commande.query()
    							  .where('coursier_id',infoUser.id)
                                  .where('id',params.id)
                                  .with('mesure')
                                  .with('user')
                                  .with('panier.articles',(elt)=>{
                                    elt.with('images')
                                    elt.with('couturier')
                                    elt.withPivot(['qte','EtatConfection'])
                                  })
                                  .first()
    return response.status(200).send(commande)

  }




}

module.exports = CommandeController
