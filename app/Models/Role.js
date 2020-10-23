'use strict'

const Model = use('Model')

class Role extends Model {

	admins()
	{
		return this.belongsToMany('App/Models/Admin')
	}

}

module.exports = Role
