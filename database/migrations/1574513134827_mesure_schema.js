'use strict'

const Schema = use('Schema')

class MesureSchema extends Schema {
  up () {
    this.create('mesures', (table) => {
      table.increments()
      table.integer('user_id').unsigned()
      table.integer('commande_id').unsigned()
      table.timestamps()
    })
  }

  down () {
    this.drop('mesures')
  }
}

module.exports = MesureSchema
