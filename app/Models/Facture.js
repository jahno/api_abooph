'use strict'

const Model = use('Model')

class Facture extends Model {

	commande()
	 {
	 	return this.belongsTo('App/Models/Facture');
	 }

	 methode_paiement()
	 {
	 	return this.belongsTo('App/Models/MethodePaiement');
	 }
}

module.exports = Facture
