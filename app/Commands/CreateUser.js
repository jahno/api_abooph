'use strict'

const { Command } = require('@adonisjs/ace')
const User = use('App/Models/User')
const Coursier = use('App/Models/Coursier')
const Couturier = use('App/Models/Couturier')
const Admin = use('App/Models/Admin')

class CreateUser extends Command {
  static get signature () {
    return 'create:user'
  }

  static get description () {
    return 'commande pour cree un user,admin&super,coursier,couturier'
  }


  async handle (args, options) {
     const ue = await User.findOrCreate({'nom':'jahno','prenom':'hacker','email':'jeba760@gmail.com','password':'jeba760'})
     const coursier = await Coursier.findOrCreate({'nom':'coursier','prenom':'coursier','email':'coursier@gmail.com','password':'coursier'})
     const couturier = await Couturier.findOrCreate({'nom':'couturier','prenom':'couturier','email':'couturier@gmail.com','password':'couturier'})
     const admin = await Admin.findOrCreate({'nom':'admin','prenom':'admin','email':'admin@gmail.com','password':'admin'})
     const superadmin = await Admin.findOrCreate({'nom':'superadmin','prenom':'superadmin','email':'superadmin@gmail.com','password':'superadmin'})
     


    this.info('ok')
  }
}

module.exports = CreateUser
