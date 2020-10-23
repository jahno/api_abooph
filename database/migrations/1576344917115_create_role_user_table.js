'use strict'

const Schema = use('Schema')

class RoleadminTableSchema extends Schema {
  up () {
    this.create('admin_role', table => {
      table.increments()
      table.integer('role_id').unsigned().index()
      table.foreign('role_id').references('id').on('roles').onDelete('cascade')
      //table.integer('admin_id',100).unsigned().index()
      table.string('admin_id',100).index()
      table.foreign('admin_id').references('id').on('admins').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('admin_role')
  }
}

module.exports = RoleadminTableSchema
