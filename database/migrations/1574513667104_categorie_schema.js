'use strict'

const Schema = use('Schema')

class CategorieSchema extends Schema {
  up () {
    this.create('categorie', (table) => {
      table.increments()
      table.string('nom')
      /*table.integer('image_id').unsigned()*/
      //table.foreign('parent_id').references('categorie_article.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('categorie')
  }
}

module.exports = CategorieSchema
