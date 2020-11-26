'use strict'
const Article = use('App/Models/Article')
const Image = use('App/Models/Image')
const {validateAll} = use('Validator')
const base64Img = require('base64-img')
const base64ImgA = require('base64-img-promise')
const randomString = require('random-string')
//const base64Img = require('base64-img-promise')
const Database = use('Database')
const { Command } = require('@adonisjs/ace')

class ArticleController {
 async index ({request,auth,response}) {


    let  {infoUser} =  request.post()
  const { nom } = request.only(['nom'])
  let page = request.input('page') || 1
  const query = Article.query()
    if (nom) {
      query.where('nom', 'LIKE', `${nom}`)
    }
    const results = await query
                          .with('images')
                          .with('categories')
                          .with('couturier')
                          .orderBy('id', 'DESC')
                          .paginate(page, 10)
  return response.json({results})
  }


   async articlePublish ({request,auth,response}) {
   
  const { nom } = request.only(['nom'])
  const query = Article.query()
    let page = request.input('page') || 1
    if (nom) {
      query.where('nom', 'LIKE', `${nom}`)
    }
    const results = await query
                          .with('images')
                          .with('categories')
                          .with('couturier')
                          .orderBy('id', 'DESC')
                          .where('Etat',1)
                          .paginate(page, 10)
  return response.json({results})
  }


  

  async store ({request,auth,response}) {
 
 const validation = await validateAll(request.all(),this.modelArticle())

    if(validation.fails()){
      return response.status(400).json(validation.messages()) 
    }

 let  {infoUser} = request.post()
 const image = new Image()
 const transaction = await Database.beginTransaction()
    try {
      let article = request.only(['nom', 'description', 'prix','couturier_id','prix_barre','temps_confection'])
         
      let images  = request.input('images')
        article.Etat = 1


       article  = await Article.create(article, transaction)
                 await transaction.commit()
            
            await article.categories().attach(request.input('categorie_article_id'))

           await  this.decodedImage(request.input('images'),infoUser.nom,article.id)
      return response
        .status(201)
        .send({msg:'Article enregistre'})
    } catch (error) {
    
      await transaction.rollback()
      return response.status(400).send(error)
    }

  }
  async publish ({request,auth,response,params}) {
      
      const article = await Article.findOrFail(params.id)
            
            
            article.Etat  = (article.Etat == 0 || article.Etat == 1 ) ? 2 : 0            
            article.save()
          
          

      return response.status(200).send({msg:'etat  modifie',article})
  }





  async show ({request,auth,response,params}) {
    const article = await Article.query()
                                  .where('id',params.id)
                                  .with('images',)
                                  .with('categories')
                                  .with('couturier')
                                  .first()
    return response.status(200).send(article)
  }

  async edit () {
  }

  async update ({request,response,params}) {

 let  {infoUser} = request.post()

    const transaction = await Database.beginTransaction()
    const article = await Article.findOrFail(params.id)
    try {
      const data = request.only(['nom', 'description', 'prix','prix_barre','temps_confection'])
      article.merge(data)
      if(request.input('images')){
        this.decodedImageModifById(request.input('images'),infoUser.nom)
     }
     if(request.input('image_add')){
        this.decodedImage(request.input('image_add'),infoUser.nom,article.id)
     }
     
      await article.save(transaction)
    
     if(request.input('categorie_article_id')){
       await article.categories().sync(request.input('categorie_article_id'),null,transaction)
     }
      await transaction.commit()
      
       return response
        .status(201)
        .send({msg:'Article modifier'})
    } catch (error) {
      await transaction.rollback()
      return response.status(error.status).send(error)
    }



  }


  async destroy ({request,response,params}) {
    try {
      const article = await Article .query()
                                    .where('id', params.id)
                                    .delete()
      ///await article.delete()
       return response.status(200).send({msg:'suppression d`\'article effectué avec succès'})
    } catch (error) {
      return response
        .status(400)
        .send({ message: 'Erreur lors de la suppression' ,error})
    }

  }

  /*async destroy ({ params, response }) {
   // const transaction = await Database.beginTransaction()
    try {
    //const article = await Article.findOrFail(params.id)
      //await article.images().detach(null, transaction)
     
      //await article.delete()
     
     // await transaction.commit()
      return response.status(200).send({msg:'article suprime'})
    } catch (error) {
     // await transaction.rollback()
      return response.status(error.status).send(error)
    }

  }*/

   getEtat(etat){
    let msg;
      switch(etat){
        case 0: 
            msg ="desactive"
        break;
        case 1: 
            msg ="active"
        break;
        case 2: 
            msg ="publier"
        break;
        default:
           msg  ="desactiver"
           break
      }
      return msg
   }



    modelArticle(){
    return {
       nom: 'required',
       prix: 'required', 
       description: 'required',
       images: 'required',
       couturier_id: 'required',
       categorie_article_id: 'required',
       prix_barre:'required',
       temps_confection:'required'
    }
  }


   async decodedImageModifById(tab,nom){
            tab.map(async (elt)=>{
                 let im = await Image.findBy('id',elt.id)
                 let te = await base64ImgA.img(elt.image, `public/img/article/${nom}`, new Date().getTime());  
                  im.chemin = te.replace('public','').replace(/\\/g,"/")
                  im.save()                 
            })
  }



  async decodedImage(tab,nom,id){

/* let test = await  Promise.all(
    tab.map(async ima => {
      let  d = await base64Img.img(ima, `public/img/article/${nom}`, new Date().getTime());
      console.log(d)
       return d
    })
  ) */


    tab.map( ima => {
        base64Img.img(ima, `public/img/article/${nom}`, new Date().getTime()+randomString({length:1}),async (err,filePath)=>{
          let image = new Image()
          image.chemin = filePath.replace('public','').replace(/\\/g,"/")
          image.article_id = id
          await image.save()   
        });        
    })
 //  return test
  }
}

module.exports = ArticleController
