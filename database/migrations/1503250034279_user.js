'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('nom', 80).notNullable()
      table.string('prenom', 80).notNullable()
      table.string('email', 100).notNullable().unique()
      table.string('password', 60).notNullable()
      table.text('pays', 254)
      table.text('ville', 254)
      table.text('Adresse_geographique', 254)
      table.string('avatar', 254)
      table.string('numero', 254)
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
