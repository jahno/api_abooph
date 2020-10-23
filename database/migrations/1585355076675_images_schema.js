'use strict'

const Schema = use('Schema')

class ImagesSchema extends Schema {
  up () {
    this.table('images', (table) => {
       table.string('chemin')// alter table
    })
  }

  down () {
    this.table('images', (table) => {
      // reverse alternations
    })
  }
}

module.exports = ImagesSchema
