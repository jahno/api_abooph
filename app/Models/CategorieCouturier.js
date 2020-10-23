'use strict'

const Model = use('Model')

class CategorieCouturier extends Model {

	couturiers()
	{
		return this.hasMany('App/Models/Couturier');
	}

  

}

module.exports = CategorieCouturier
