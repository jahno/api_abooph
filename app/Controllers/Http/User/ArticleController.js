'use strict'

const Article = use('App/Models/Article')

class ArticleController {


    async show ({request,response,params}) {
        
        const query = Article.query()
         
          const results = await Article.query()
                                .with('images')
                                .where('couturier_id',params.id)
                                .orderBy('id', 'DESC')
                                .paginate(1, 10)
        return response.json({results})
          
        }


}

module.exports = ArticleController
