'use strict'

const Model = use('Model')

class CategorieArticle extends Model {

static get primaryKey() {
    return 'id'
  }
  static get hidden() {
    return ['created_at', 'updated_at']
  }


  children() {
    return this.hasMany('App/Models/CategorieArticle', 'id', 'parent_id')
  }


 	articles()
	{
		 return this.belongsToMany('App/Models/Article')
	}

  
}

module.exports = CategorieArticle
