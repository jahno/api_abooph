'use strict'

const Schema = use('Schema')

class CouturiersSchema extends Schema {
  up () {
    this.table('couturiers', (table) => {
      //table.string('categorie_couturier_id').unsigned().references('id').inTable('categorie_couturiers')
      table.integer('categorie_couturier_id').unsigned().references('id').inTable('categorie_couturiers')
    })
  }

  down () {
    this.table('couturiers', (table) => {
      // reverse alternations
    })
  }
}

module.exports = CouturiersSchema
