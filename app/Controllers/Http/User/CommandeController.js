'use strict'
const User = use('App/Models/User')
const Panier = use('App/Models/Panier')
const Commande = use('App/Models/Commande')
const Article = use('App/Models/Article')
const Mail = use('Mail')
const Event = use('Event')

const {validateAll} = use('Validator')


class CommandeController {
  async index ({request,response,auth}) {

    
  let  infoUser = await auth.authenticator(`jwt_user`).getUser()  
     
  let page = request.input('page') || 1
    

 const results = await Commande.query()
                                .whereHas('user',(data)=>{
                                  data.where('id',infoUser.id)
                                })
                                .with('coursier')
                                .with('mesure')
                                .with('panier.articles',(elt)=>{
                                    elt.with('images')
                                    elt.withPivot(['qte','EtatConfection'])
                                  })
                                .paginate(page, 10)

  return response.json({results})


  }



  async show ({request,response,params,auth}) {

    let  infoUser = await auth.authenticator(`jwt_user`).getUser()  
    const commande = await Commande.query()
                                  .whereHas('user',(data)=>{
                                    data.where('id',infoUser.id)
                                  })
                                  .where('id',params.id)
                                  .with('mesure')
                                  .with('panier.articles',(elt)=>{
                                    elt.with('images')
                                    elt.withPivot(['qte','EtatConfection'])
                                  })
                                  .first()
    return response.status(200).send(commande)

  }


  async showPdf ({request,response,params,auth,view}) {

    let  infoUser = await auth.authenticator(`jwt_user`).getUser()  
    const commande = await Commande.query()
                                  .whereHas('user',(data)=>{
                                    data.where('id',infoUser.id)
                                  })
                                  .with('user')
                                  .where('id',params.id)
                                  .with('mesure')
                                  .with('panier.articles',(elt)=>{
                                    elt.with('images')
                                    elt.withPivot(['qte','EtatConfection'])
                                  })
                                  .first()
                                  
                                 // return response.status(200).send(commande)  
                               //  return view.render('auth.emails.commandepdf',{commande})            
    return view.render('auth.emails.commandepdf',{commande:commande.toJSON()})

  }


 

  async store ({request,response,auth}) {
   //let {infoUser} = request.post()
     let infoUser;
     
     try{
     let utilisateur =  await auth.authenticator(`jwt_user`).check()
       if(utilisateur){
         infoUser = await auth.authenticator(`jwt_user`).getUser()   
       }

     }catch(er){
        
         infoUser = await User.create(
         {
          nom:request.input('nom'),
          prenom:request.input('prenom'),
          numero:request.input('numero'),
          email:request.input('email'),
          pays:request.input('pays'),
          sexe:request.input('sexe'),
          ville:request.input('ville'),
          password: request.input('password'),
          Adresse_geographique: request.input('Adresse_geographique')
         })
      
     }
        

      
    
    const validation = await validateAll(request.all(),this.modelCommande())

    if(validation.fails()){
      return response.status(404).json(validation.messages()) 
    }


    const pan  = await  Panier.create({user_id : infoUser.id})
     let  articles = request.input('articles')
     let format = await this.getArticle(articles)
     let total  = await this.total(format)
    
 
    articles.forEach((elt)=>{
       pan.articles().attach([elt.id],(dat)=>{
        dat.qte = elt.qte
       })
     })
 

     const com = await  Commande.create(
     {
      adresse:request.input('adresse'),
      commune:request.input('commune'),
      livraison:request.input('livraison'),
      paiement:request.input('paiement'),
      notes:request.input('notes'),
      user_id:infoUser.id,
      panier_id:pan.id,
      total:parseInt(parseInt(request.input('livraison')) + parseInt(total))
    })


     Event.emit('new::commande', articles,infoUser,com,total)

     return response.json({msg:'ok'})

  }

 

  /*async email_order(articles,infoUser,com,total){
    
      //on envoie le mail a l'utilisateur 
     
     var result = articles.map(a => a.id);
    
     let tabarticles = await Article.query()
                                  .with('images')
                                  .whereIn('id',result)
                                  //.where('etat',2)
                                  .fetch()

 
    let articles = tabarticles.toJSON().map((a)=>{
        let t=  request.input('articles').find(r => r.id ==a.id)
        a.qte = t.qte
        return a
    })
         
   // console.log(e)
      await Mail.send('auth.emails.email_order',{articles,user:infoUser.toJSON(),commandes:com.toJSON(),sub:total}, message => {
      message.to('jeba760@gmail.com')
      .from('aboophCouture@gmail.com')
      .subject('Récapitulatif de votre commande')
    })

     return response.json({articles})
      

     

  }*/


  async getArticle(articles){
    let test = await  Promise.all(
    articles.map(async article => {
     let ar = await Article.findBy('id',article.id)
       return {prix:ar.toJSON().prix,qte:article.qte,couturie_id:ar.toJSON().couturier_id}
    }))
    return test
  }

  async total(tab){
     var tota=0
 
     tab.forEach((data)=>{
      tota += parseInt(data.qte * data.prix)
    })
     
     return tota
   }


  async destroy () {
  }

  modelCommande(){
    return {
       adresse: 'required',
       livraison: 'required',
       paiement: 'required',
       commune:'required',
       articles: 'required',
    }
  }
}

module.exports = CommandeController
