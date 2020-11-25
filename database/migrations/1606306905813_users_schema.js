'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsersSchema extends Schema {
  up () {
    this.table('users', (table) => {
      table.string('sexe', 80).notNullable()
    })
  }

  down () {
    this.table('users', (table) => {
      // reverse alternations
    })
  }
}

module.exports = UsersSchema
