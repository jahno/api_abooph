'use strict'

const Model = use('Model')

class Categorie extends Model {

	articles()
	{
		 return this.belongsToMany('App/Models/Article')
	}
	
}

module.exports = Categorie
