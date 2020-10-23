'use strict'

const Schema = use('Schema')

class PanierSchema extends Schema {
  up () {
    this.create('paniers', (table) => {
      table.increments()
      table.integer('user_id').unsigned()
      table.timestamps()
    })
  }

  down () {
    this.drop('paniers')
  }
}

module.exports = PanierSchema
