'use strict'

const Schema = use('Schema')

class ArticlesSchema extends Schema {
  up () {
    this.table('articles', (table) => {
     // table.integer('article_id').unsigned().references('id').inTable('articles')
      //table.string('article_id',100).references('id').inTable('articles')
    })
  }

  down () {
    this.table('articles', (table) => {
      // reverse alternations
    })
  }
}

module.exports = ArticlesSchema
