'use strict'

const Schema = use('Schema')

class CouturiersSchema extends Schema {
  up () {
    this.table('couturiers', (table) => {
      table.boolean('Etat').default(false)
    })
  }

  down () {
    this.table('couturiers', (table) => {
      // reverse alternations
    })
  }
}

module.exports = CouturiersSchema
