'use strict'

const Model = use('Model')

class Image extends Model {

		article()
	{
		return this.belongsTo('App/Models/Article');
	}
}

module.exports = Image
