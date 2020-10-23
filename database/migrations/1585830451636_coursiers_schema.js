'use strict'

const Schema = use('Schema')

class CoursiersSchema extends Schema {
  up () {
    this.table('coursiers', (table) => {
      table.boolean('Etat').default(false)
    })
  }

  down () {
    this.table('coursiers', (table) => {
      // reverse alternations
    })
  }
}

module.exports = CoursiersSchema
