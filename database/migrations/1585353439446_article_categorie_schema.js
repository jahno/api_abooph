'use strict'

const Schema = use('Schema')

class ArticleCategorieSchema extends Schema {
  up () {
    this.create('article_categorie_article', (table) => {
      table.increments()
      table.integer('article_id').unsigned().references('id').inTable('articles').onDelete('CASCADE')
      table.integer('categorie_article_id').unsigned().references('id').inTable('categorie_articles')
     
      table.timestamps()
    })
  }

  down () {
    this.drop('article_categorie_article')
  }
}

module.exports = ArticleCategorieSchema
