'use strict'

const Schema = use('Schema')

class CommandeCouturierSchema extends Schema {
  up () {
    this.create('commande_couturier', (table) => {
      table.increments()
      table.integer('commande_id').unsigned().references('id').inTable('commandes')
      table.text('couturier_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('commande_couturiers')
  }
}

module.exports = CommandeCouturierSchema
