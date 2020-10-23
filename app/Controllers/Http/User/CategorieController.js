'use strict'
const CategorieArticle = use('App/Models/CategorieArticle')

class CategorieController {

	async childrens ({request,response}) {
      const { nom } = request.only(['nom'])
  const query = CategorieArticle.query()
    if (nom) {
      query.where('nom', 'LIKE', `${nom}`)
    }
    const results = await query
                          .orderBy('id', 'DESC')
                          .whereHas('children')
                          .with('children')
                          .fetch()
  return response.json({results})

  }
}

module.exports = CategorieController
