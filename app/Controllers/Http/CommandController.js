'use strict'

const { Command } = require('@adonisjs/ace')

class CommandController extends Command{

  static get signature () {
    return 'create:role'
  }

  static get description () {
    return 'Tell something helpful about this command'
  }

    async handle (args, options) {
    	
    }

}

module.exports = CommandController
