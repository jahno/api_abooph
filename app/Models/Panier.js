'use strict'

const Model = use('Model')

class Panier extends Model {

	user()
	{
		return this.belongsTo('App/Models/User');
	}

	commande()
	{
		return this.hasOne('App/Models/Commande');
	}

	articles()
	{
	   return this.belongsToMany('App/Models/Article')
	}

}

module.exports = Panier
