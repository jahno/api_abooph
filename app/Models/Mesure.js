'use strict'

const Model = use('Model')

class Mesure extends Model {

	commande()
	{
		return this.belongsTo('App/Models/Commande');
	}

	commande()
	{
		return this.belongsTo('App/Models/User');
	}
}

module.exports = Mesure
