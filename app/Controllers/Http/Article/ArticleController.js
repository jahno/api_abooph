'use strict'
const Article = use('App/Models/Article')

class ArticleController {


	   async index ({request,auth,response}) {
   
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

  async accueil({request,response,params}){
    let category  = request.input('category') 
    const limit = request.input('limit') || 3

  const query = Article.query()

   
    if (category) {
      query.whereHas('categories',(c)=>{
                            c.where('nom',category)
            })
    }
    const results = await query
                          .with('images')
                          .with('couturier')
                          .with('categories')
                          .orderBy('id', 'DESC')
                          .where('Etat',1)
                          .limit(limit)
                          .fetch()
        return response.json({results})
  }


 async all ({request,auth,response}) {
    const results = await Article.query()
                          .with('images')
                          .with('categories')
                          .with('couturier')
                          .orderBy('id', 'DESC')
                          .where('Etat',1)
                          .fetch()
  return response.json({results})
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



}

module.exports = ArticleController
