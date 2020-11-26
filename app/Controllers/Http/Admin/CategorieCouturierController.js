'use strict'
const CategorieCouturier = use('App/Models/CategorieCouturier')
const {validateAll} = use('Validator')
const Database = use('Database')
class CategorieCouturierController {
  
    async index ({request,response}) {

      const { nom } = request.only(['nom'])
  const query = CategorieCouturier.query()
    if (nom) {
      query.where('nom', 'LIKE', `${nom}`)
    }
    const results = await query
                          .orderBy('id', 'DESC')
                          .paginate(1, 10)
  return response.json({results})

  }


async ShowCouturier ({request,response}) {


    const categorieCouturier = await CategorieCouturier.query()
                                      .select('id','nom')
                                      .fetch()
     
    return response.send(categorieCouturier)


  }
 

  async store ({request,response}) {
     const validation = await validateAll(request.all(),this.modelA())

    if(validation.fails()){
      return response.status(404).json(validation.messages()) 
    }

    const data = request.only(Object.keys(this.modelA()))
    
 

    const categorieCouturier = await CategorieCouturier.create(data)

    return response
      .status(201)
      .send({msg:'creation de la categorie couturier effectué avec succès'})

  }

  async show ({params,request,response}) {
      const categorieCouturier = await CategorieCouturier.findOrFail(params.id)
    return response.send(categorieCouturier)
  }

  async listeCouturierArticle ({request,response}) {
        const { nom } = request.only(['nom'])
  const query = Article.query()
    if (nom) {
      query.where('nom', 'LIKE', `${nom}`)
    }
    const results = await query
                          .orderBy('id', 'DESC')
                          .with('couturiers')
                          .paginate(1, 10)
  return response.json({results})
  }

  

  async update ({request,response,params}) {
    const categorieCouturier = await CategorieCouturier.findOrFail(params.id)


   const validation = await validateAll(request.all(),this.modelA())

    if(validation.fails()){
      return response.status(404).json(validation.messages()) 
    }

    const data = request.only(Object.keys(this.modelA()))

    categorieCouturier.merge(data)
    await categorieCouturier.save()
    return response.send({msg:'modification de la categorie couturier effectué avec succès',categorieCouturier})

  }

  async destroy ({request,response,params}) {
       const transaction = await Database.beginTransaction()
    const categorieCouturier = await CategorieCouturier.findOrFail(params.id)
    try {
     // await categorieCouturier.couturiers().detach(null, transaction)
      await categorieCouturier.delete(transaction)
      await transaction.commit()
      return response.status(200).send({msg:'categorie couturier suprimé  avec succès'})
    } catch (error) {
      await transaction.rollback()
      return response.status(error.status).send(error)
    }

  }


    modelA(){
    return {
       nom: 'required'
    }
  }

}

module.exports = CategorieCouturierController
