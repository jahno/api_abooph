'use strict'

const Database = use('Database')
const Commande = use('App/Models/Commande')
const Article = use('App/Models/Commande')
const ArticlePanier = use('App/Models/ArticlePanier')
const Couturier = use('App/Models/Couturier')
const Event = use('Event')
 

class CommandeController {

    



	 async index ({request,auth,response}) {


  let  infoUser = await auth.authenticator(`jwt_couturier`).getUser()  
     
  let page = request.input('page') || 1
    

 const results = await Commande.query()
                                .whereHas('couturiers',(data)=>{
                                  data.where('couturiers.id',infoUser.id)
                                })
                                .with('coursier')
                                .with('mesure')
                                .with('panier.articles',(elt)=>{
                                    elt.where('couturier_id',infoUser.id)
                                    elt.with('images')
                                   //elt.with('etatConfectionArticle')
                                    elt.withPivot(['qte','EtatConfection'])
                                  })
                                .orderBy('id', 'DESC')
                                .paginate(page, 10)

  return response.json({results})
  }


    async show ({request,response,params,auth}) {

    let  infoUser = await auth.authenticator(`jwt_couturier`).getUser()  
    const results = await Commande.query()
                                  .where('id',params.id)
                                  .whereHas('couturiers',(co)=>{
                                    co.where('couturiers.id',infoUser.id)
                                  })
                                  .with('user')
                                  .with('mesure')
                                  .with('coursier')
                                  .with('panier.articles',(elt)=>{
                                    elt.where('couturier_id',infoUser.id)
                                    elt.with('images')
                                    elt.withPivot(['qte','EtatConfection'])
                                  })
                                   
                                  .first()
    return response.status(200).send(results)

  }



 async start ({request,response,params,auth}) {

    let  infoUser = await auth.authenticator(`jwt_couturier`).getUser()  
    const commande = await Commande.query()
                                  .where('id',params.id_commande)
                                   
                                  .whereHas('panier.articles',(elt)=>{
                                    elt.where('articles.id',params.id_article)
                                    elt.where('couturier_id',infoUser.id)
                                  })
                                  .first()
                                  const com = await Commande.query().where('id',params.id_commande).update({ etat : 4 })    
 
         const results = await Database.table('article_panier')
                                  .where('article_id',params.id_article)
                                  .where('panier_id', commande.panier_id)
                                  .update({ EtatConfection : 1 })
                                


    return response.status(200).send({msg:"Debut Confection"})

  }


  async end ({request,response,params,auth}) {

      let  infoUser = await auth.authenticator(`jwt_couturier`).getUser()  
    const commande = await Commande.query()
                                  .where('id',params.id_commande)
                                  .with('coursier')
                                   
                                  .whereHas('panier.articles',(elt)=>{
                                    elt.where('articles.id',params.id_article)
                                    elt.where('couturier_id',infoUser.id)
                                  })
                                  .first()

                                                    

 
         const results = await Database.table('article_panier')
                                  .where('article_id',params.id_article)
                                  .where('panier_id', commande.panier_id)
                                  .update({ EtatConfection : 2 })

        const veri = await Database.table('article_panier')
                                   .where('panier_id',commande.panier_id)
                               
     let t = veri.every(this.checkAll)
         
         if(t){
           commande.Etat = 5
           await commande.save()
           //bon on peut envoyer le mail ici 

           Event.emit('end::commande', commande)
            
         }

    return response.status(200).send({msg:"Fin Confection"})

  }


  checkAll(el,index,arr){
    return el.EtatConfection == 2
  }





}

module.exports = CommandeController
