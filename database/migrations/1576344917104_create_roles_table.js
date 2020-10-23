'use strict'

const Schema = use('Schema')

class RolesTableSchema extends Schema {
  up () {
    this.create('roles', table => {
      table.increments()
      table.string('slug',100).notNullable().unique()
      table.string('name',100).notNullable().unique()
      table.text('description').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('roles')
  }
}

module.exports = RolesTableSchema
