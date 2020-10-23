'use strict'

const { Command } = require('@adonisjs/ace')
const Role = use('App/Models/Role')
const Admin = use('App/Models/Admin')

class CreateRole extends Command {
  static get signature () {
    return 'create:role'
  }

  static get description () {
    return 'Tell something helpful about this command'
  }

  async handle (args, options) {
    this.info('commande pour cree & affecter les role admin&super admin')

       
    const roleAdmin = new Role()
    roleAdmin.name = 'admin'
    roleAdmin.slug = 'admin'
    roleAdmin.description = "l'admin"
    await roleAdmin.save()
     
    const roleSuperAdmin = new Role()
    roleSuperAdmin.name = 'SuperAdmin'
    roleSuperAdmin.slug = 'SuperAdmin'
    roleSuperAdmin.description = 'le SuperAdmin'
    await roleSuperAdmin.save()

        const admin = await Admin.query().where('nom','admin').first()
		await admin.roles().attach(roleAdmin.id)

		const superadmin = await Admin.query().where('nom','superadmin').first()
		await superadmin.roles().attach(roleSuperAdmin.id)

  }
}

module.exports = CreateRole
