'use strict'

const Schema = use('Schema')

class CategorieArticleSchema extends Schema {
  up () {
    this.create('categorie_articles', (table) => {
      table.increments()
      table.string('nom')
      table.integer('parent_id').unsigned().nullable()
      table.foreign('parent_id').references('categorie_articles.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('categorie_articles')
  }
}

module.exports = CategorieArticleSchema
