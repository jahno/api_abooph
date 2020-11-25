'use strict'
const Article = use('App/Models/Article')
const Image = use('App/Models/Image')
const {validateAll} = use('Validator')
const base64Img = require('base64-img')
const randomString = require('random-string')
const base64ImgA = require('base64-img-promise')
const Database = use('Database')
class ArticleController {
  
  async index ({request,response,auth}) {
  let  infoUser = await auth.authenticator(`jwt_couturier`).getUser()  

  const { nom } = request.only(['nom'])
  const query = Article.query()
    if (nom) {
      query.where('nom', 'LIKE', `${nom}`)
    }
    const results = await query
                          .with('images')
                          .with('categories')
                          .where('couturier_id',infoUser.id)
                          .orderBy('id', 'DESC')
                          .paginate(1, 10)
  return response.json({results})
    
  }

 

  async store ({request,response}) {
    const validation = await validateAll(request.all(),this.modelArticle())
   let  {infoUser} =  request.post()
    if(validation.fails()){
      return response.status(404).json(validation.messages()) 
    }

 const image = new Image()
 const transaction = await Database.beginTransaction()
    try {
      let article = request.only(['nom', 'description', 'prix','prix_barre'])
         
      let images  = request.input('images')
        article.couturier_id = infoUser.id


       article  = await Article.create(article, transaction)
                 await transaction.commit()
            
            article.categories().attach(request.input('categorie_article_id'))

           await  this.decodedImage(request.input('images'),infoUser.nom,article.id)
      return response
        .status(201)
        .send({msg:'Article enregistre'})
    } catch (error) {
      await transaction.rollback()
   
      return response.status(error.status).send(error)
    }

  }

  async show ({request,auth,response,params}) {
     let  infoUser = await auth.authenticator(`jwt_couturier`).getUser() 
    const article = await Article.query()
                                  .where('couturier_id',infoUser.id)
                                  .where('id',params.id)
                                  .with('images')
                                  .with('categories')
                                  .first()
    return response.status(200).send(article)
  }

  async update ({request,response,params}) {
    
    let  {infoUser} =  request.post()
    const transaction = await Database.beginTransaction()
    const article = await Article.findOrFail(params.id)
    try {
      const data = request.only(['nom', 'description', 'prix','prix_barre'])
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

  async destroy ({ params, response }) {
     const transaction = await Database.beginTransaction()
    const article = await Article.findOrFail(params.id)
    try {
      //await article.images().detach(null, transaction)
      await article.delete(transaction)
      await transaction.commit()
      return response.status(200).send({msg:'article suprime'})
    } catch (error) {
      await transaction.rollback()
      return response.status(error.status).send(error)
    }

  }


   async publish ({request,auth,response,params}) {
      
      const article = await Article.findOrFail(params.id)

     
            
                    
            article.Etat  = article.Etat ==  2  ? 2 : article.Etat ==  1 ? 0 : 1           
            article.save()
          
          

      return response.status(200).send({msg:'etat  modifie',article})
  }



   modelArticle(){
    return {
       nom: 'required',
       prix: 'required', 
       description: 'required',
       images: 'required',
       categorie_article_id: 'required',
    }
  }



  async decodedImage(tab,nom,id){
    tab.map( ima => {
        base64Img.img(ima, `public/img/article/${nom}`, new Date().getTime()+randomString({length:1}),async (err,filePath)=>{
          let image = new Image()
          image.chemin = filePath.replace('public','').replace(/\\/g,"/")
          image.article_id = id
          await image.save()   
        });        
    })
  }

 

   async decodedImageModifById(tab,nom){
            tab.map(async (elt)=>{
                 let im = await Image.findBy('id',elt.id)
                 let te = await base64ImgA.img(elt.image, `public/img/article/${nom}`, new Date().getTime());  
                  im.chemin = te.replace('public','').replace(/\\/g,"/")
                  im.save()                 
            })
  }


}

module.exports = ArticleController
