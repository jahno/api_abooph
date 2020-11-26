'use strict'
const Article = use('App/Models/Article')
const Couturier = use('App/Models/Couturier')
const Coursier = use('App/Models/Coursier')
const Comande = use('App/Models/Commande')
const Mail = use('Mail')
const Event = use('Event')

const Commande = exports = module.exports = {}


/*Commande.sendMail = async (t,e) => {

	console.log(t,e)
	
}*/

Commande.sendMail =  async (article,infoUser,com,total)=> {
    
     //on recupere les articles du tableau en affectant les qte assoocie :)
     var result = article.map(a => a.id);
    
     let tabarticles = await Article.query()
                                  .with('images')
                                  .whereIn('id',result)
                                  //.where('etat',2)
                                  .fetch()

 
    let articles = tabarticles.toJSON().map((a)=>{
        let t=  article.find(r => r.id ==a.id)
        a.qte = t.qte
        return a
    })
  
    
         
   
      //on envoie le mail a l'utilisateur 
      await Mail.send('auth.emails.email_order',{articles,user:infoUser.toJSON(),commande:com.toJSON(),sub:total}, message => {
      message.to(infoUser.email)
      .from('aboophCouture@gmail.com')
      .subject('Récapitulatif de votre commande')
    })

      //on envoie le mail a l'admin 
      await Mail.send('auth.emails.admin',{commande:com.toJSON()}, message => {
        message.to("jeba760@gmail.com")
        .from('aboophCouture@gmail.com')
        .subject(`Creation Commande N°${com.toJSON().numeroCommande}`)
      })
    

     
      

      

  }


  Commande.sendMailMesure =  async (commande,mesure)=> {
    
      //on recupre les couturier de la commande
       let format = commande.getRelated('panier').getRelated('articles').toJSON()   
       let couturier_id = format.map(elt => elt.couturier_id).filter((value, index, self) => self.indexOf(value) === index)      

     
     //je relie la commande au different couturier
     couturier_id.forEach((elt)=>{
       commande.couturiers().attach([elt])
     })

       //je recupere les differents couturiers 
         
      
     couturier_id.map( async (elt)=> {
    	 const infoCouturier = await Couturier.findOrFail(elt)
                
                //on envoie pour notifier les couturier qu'ils ont reussir une new commande :)

    	  await Mail.send('auth.emails.affectation',{user:infoCouturier.toJSON(),interface:'http://couturierrec.abooph.com'}, message => {
	      message.to(infoCouturier.email)
	      .from('aboophCouture@gmail.com')
	      .subject('Nouvelle commande')
	    })

    })
         
   commande.etat=2
   commande.mesure_id= mesure.id
   await commande.save()     

  }


   Commande.AfectatioCoursier =  async (id_commande,id_coursier)=> {
    
         /*const Com = await Comande.query()
         						   .where('id',id_commande)
         						   .with('panier.articles')
         						   .first()
           let articles = Com.toJSON().panier.articles    
           articles.map(async (elt)=>{
           	  await Com.etatConfectionArticles().create({Etat:0,article_id:elt.id})
           })
*/
          const infoCoursier = await Coursier.findOrFail(id_coursier)


    	  await Mail.send('auth.emails.affectation',{user:infoCoursier.toJSON(),interface:'http://coursierrec.abooph.com'}, message => {
	      message.to(infoCoursier.email)
	      .from('aboophCouture@gmail.com')
	      .subject('Commande Affecter')
	    })


       

  }





  Commande.endCommande = async (commande) =>{

    await Mail.send('auth.emails.coursier_order_end',{commande:commande.toJSON()}, message => {
      message.to(commande.coursier.email)
      .from('aboophCouture@gmail.com')
      .subject(`Commande ${commande.id} Terminer`)
    })
  }




