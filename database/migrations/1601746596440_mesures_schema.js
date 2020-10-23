'use strict'

const Schema = use('Schema')

class MesuresSchema extends Schema {
  up () {
    this.table('mesures', (table) => {
      table.text('descriptions')
    })
  }

  down () {
    this.table('mesures', (table) => {
      // reverse alternations
    })
  }
}

module.exports = MesuresSchema
