'use strict'

const Model = use('Model')
/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')
var uniqid = require('uniqid');
class Couturier extends Model {


	static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })

    this.addHook('beforeCreate', async (userInstance) => {
      userInstance.id = uniqid()
    })

  }


  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }


	articles()
	{
		return this.hasMany('App/Models/Article');
	}

  
  categorieCouturier()
  {
    return this.belongsTo('App/Models/CategorieCouturier');
  }


  commandes()
  {
     return this.belongsToMany('App/Models/Commande')
  }
  
}

module.exports = Couturier



 

