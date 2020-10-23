'use strict'

const Schema = use('Schema')

class CommandeSchema extends Schema {
  up () {
    this.create('commandes', (table) => {
      table.increments()
      table.text('adresse');
      table.text('livraison');
      table.string('paiement');
      table.string('notes');
      table.string('total');
      table.string('commune');
      table.string('etat').default(0);
      table.integer('user_id').unsigned();
      table.integer('panier_id').unsigned();
      table.text('coursier_id')
      table.integer('mesure_id');
      table.integer('facture_id').unsigned();
      table.timestamps()
    })
  }

  down () {
    this.drop('commandes')
  }
}

module.exports = CommandeSchema
