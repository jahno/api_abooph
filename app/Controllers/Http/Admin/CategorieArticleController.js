'use strict'
const CategorieArticle = use('App/Models/CategorieArticle')
const {validateAll} = use('Validator')
const Database = use('Database')
const Logger = use('Logger')

class CategorieArticleController {
  async index ({request,response}) {

      const { nom } = request.only(['nom'])
  const query = CategorieArticle.query()
    if (nom) {
      query.where('nom', 'LIKE', `${nom}`)
    }
    const results = await query
                          .orderBy('id', 'DESC')
                          .paginate(1, 10)
  return response.status(200).send({results})

  }


async ShowArticle ({request,response}) {


    const categorieArticle = await CategorieArticle.query()
                                      .select('id','nom')
                                      .fetch()
     
    return response.send(categorieArticle)


  }
 

  async store ({request,response}) {
     const validation = await validateAll(request.all(),this.modelA())

    if(validation.fails()){
      return response.status(404).json(validation.messages()) 
    }

    const data = request.only(Object.keys(this.modelA()))
    
 

    const categorieArticle = await CategorieArticle.create(data)

    return response
      .status(201)
      .send({msg:'creation de la categorie effectue'})

  }

  async show ({params,request,response}) {
      const categorieArticle = await CategorieArticle.findOrFail(params.id)
    return response.send(categorieArticle)
  }

  async childrens ({request,response}) {
      const { nom } = request.only(['nom'])
  const query = CategorieArticle.query()
    if (nom) {
      query.where('nom', 'LIKE', `${nom}`)
    }
    const results = await query
                          .orderBy('id', 'DESC')
                          .with('children')
                          .paginate(1, 10)
  return response.json({results})

  }

  

  async update ({request,response,params}) {
    const categorieArticle = await CategorieArticle.findOrFail(params.id)


   const validation = await validateAll(request.all(),this.modelA())

    if(validation.fails()){
      return response.status(404).json(validation.messages()) 
    }

    const data = request.only(Object.keys(this.modelA()))

    categorieArticle.merge(data)
    await categorieArticle.save()
    return response.send({msg:'modification de la categorie article effectue',categorieArticle})

  }

  async destroy ({request,response,params}) {
       const transaction = await Database.beginTransaction()
    const categorieArticle = await CategorieArticle.findOrFail(params.id)
    try {
      //await categorieArticle.articles().detach(null, transaction)
      await categorieArticle.delete(transaction)
      await transaction.commit()
      return response.status(200).send({msg:'categorie Article suprime'})
    } catch (error) {
      await transaction.rollback()
      return response.status(error.status).send(error)
    }

  }


    modelA(){
    return {
      // parent_id:'required',
       nom: 'required',
    }
  }

}

module.exports = CategorieArticleController
