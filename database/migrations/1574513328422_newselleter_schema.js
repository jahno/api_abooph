'use strict'

const Schema = use('Schema')

class NewselleterSchema extends Schema {
  up () {
    this.create('newselleters', (table) => {
      table.increments()
      table.string('email', 100).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('newselleters')
  }
}

module.exports = NewselleterSchema
