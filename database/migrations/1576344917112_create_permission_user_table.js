'use strict'

const Schema = use('Schema')

class PermissionUserTableSchema extends Schema {
  up () {
    this.create('permission_admin', table => {
      table.increments()
      table.integer('permission_id').unsigned().index()
      table.foreign('permission_id').references('id').on('permissions').onDelete('cascade')
      //table.integer('admin_id',100).unsigned().index()
      table.string('admin_id',100)
      table.foreign('admin_id').references('id').on('admins').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('permission_admin')
  }
}

module.exports = PermissionUserTableSchema
