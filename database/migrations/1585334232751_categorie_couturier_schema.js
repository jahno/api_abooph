'use strict'

const Schema = use('Schema')

class CategorieCoutierSchema extends Schema {
  up () {
    this.create('categorie_couturiers', (table) => {
      table.increments()
      table.string('nom')
      table.timestamps()
    })
  }

  down () {
    this.drop('categorie_couturiers')
  }
}

module.exports = CategorieCoutierSchema
