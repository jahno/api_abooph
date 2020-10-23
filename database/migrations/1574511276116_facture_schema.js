'use strict'

const Schema = use('Schema')

class FactureSchema extends Schema {
  up () {
    this.create('factures', (table) => {
      table.increments()
      table.string('nom')
      table.timestamps()
    })
  }

  down () {
    this.drop('factures')
  }
}

module.exports = FactureSchema
