'use strict'

const Schema = use('Schema')

class ArticlePanierSchema extends Schema {
  up () {
    this.table('article_panier', (table) => {
      table.string('EtatConfection').default(0)

    })
  }

  down () {
    this.table('article_panier', (table) => {
      // reverse alternations
    })
  }
}

module.exports = ArticlePanierSchema
