'use strict'

const Schema = use('Schema')

class ImageSchema extends Schema {
  up () {
    this.create('images', (table) => {
      table.increments()
      table.string('nom')
      table.string('type')
      table.string('taille')
      table.integer('article_id').unsigned()
      //table.integer('article_id').unsigned().references('id').inTable('articles')
      table.timestamps()
    })
  }

  down () {
    this.drop('images')
  }
}

module.exports = ImageSchema
