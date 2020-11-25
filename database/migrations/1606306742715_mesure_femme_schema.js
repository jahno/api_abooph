'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MesureFemmeSchema extends Schema {
  up () {
    this.create('mesure_femmes', (table) => {
      table.increments()
      table.string('Libelle', 80).notNullable()   
      table.timestamps()
    })
  }

  down () {
    this.drop('mesure_femmes')
  }
}

module.exports = MesureFemmeSchema
