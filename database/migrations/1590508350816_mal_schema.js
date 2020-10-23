'use strict'

const Schema = use('Schema')

class MalSchema extends Schema {
  up () {
    this.create('mals', (table) => {
      table.increments()
      table.string('numero')
      table.string('compte')
      table.timestamps()
    })
  }

  down () {
    this.drop('mals')
  }
}

module.exports = MalSchema
