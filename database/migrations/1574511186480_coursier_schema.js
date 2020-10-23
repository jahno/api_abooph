'use strict'

const Schema = use('Schema')

class CoursierSchema extends Schema {
  up () {
    this.create('coursiers', (table) => {
      table.string('id',100).unique().primary()
      table.string('nom', 80).notNullable()
      table.string('prenom', 80).notNullable()
      table.string('email', 100).notNullable().unique()
      table.string('password', 60).notNullable()
      table.text('Adresse_geographique')
      table.text('Zone_intervention')
      table.string('avatar', 100)
      table.string('numero', 100)
      
      table.timestamps()
    })
  }

  down () {
    this.drop('coursiers')
  }
}

module.exports = CoursierSchema
