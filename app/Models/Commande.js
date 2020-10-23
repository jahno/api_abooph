'use strict'

const Model = use('Model')

class Commande extends Model {

  static get computed () {
    return ['etatText']
  }



	getEtatText ({Etat}) {
   // return this.getEtatFu(Etat)
    return {0:"Commande Cree",1:"Commande affecte a un coursier",
            2:"Renseignement de mesure",3:"Validation des mesures par admin",
            4:"Confection de l'article par le couturier",5:"Confection termine",
            6:"Livraison du dit article :)"}
  }


	panier()
	{
		return this.belongsTo('App/Models/Panier');
	}

   coursier()
	{
		return this.belongsTo('App/Models/Coursier');
	}

	facture()
	 {
	 	return this.belongsTo('App/Models/Facture');
	 }

	 user()
	 {
	 	return this.belongsTo('App/Models/User');
	 }


	 mesure()
	 {
	 	return this.belongsTo('App/Models/Mesure');
	 }

	couturiers()
	{
		 return this.belongsToMany('App/Models/Couturier')
	}


	 


}

module.exports = Commande
