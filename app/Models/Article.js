'use strict'

const Model = use('Model')

class Article extends Model {


static get computed () {
    return ['etatText']
  }



	getEtatText ({Etat}) {
   // return this.getEtatFu(Etat)
    return {0:"desactivé",1:"activé",2:"publié"}
  }


	paniers()
	{
		 return this.belongsToMany('App/Models/Panier')
	}

	couturier()
	{
		 return this.belongsTo('App/Models/Couturier')
	}

	types()
	{
		return this.hasMany('App/Models/Type');
	}

	images()
	{
		 return this.hasMany('App/Models/Image')
	}

	categories()
	{
		 return this.belongsToMany('App/Models/CategorieArticle')
	}

	getEtatFu(etat){
    let msg;
      switch(etat){
        case 0: 
            msg ="desactive"
        break;
        case 1: 
            msg ="active"
        break;
        case 2: 
            msg ="publier"
        break;
        default:
           msg  ="desactiver"
           break
      }
      return msg
   }

     
	
}

module.exports = Article
