'use strict'

const Schema = use('Schema')

class ArticlePanierSchema extends Schema {
  up () {
    this.create('article_panier', (table) => {
      table.increments()
      table.integer('article_id').unsigned().references('id').inTable('articles')
      table.integer('panier_id').unsigned().references('id').inTable('paniers')
      table.string('qte')
      table.timestamps()
    })
  }

  down () {
    this.drop('article_panier')
  }
}

module.exports = ArticlePanierSchema
