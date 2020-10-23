'use strict'

class User {
  get rules () {
    return {
      email: 'required|email|unique:users',
      password: 'required'
    }
  }

   get messages() {
        return {
            'email.unique': 'email existe deja',
            'email.required': 'veuillez fournier le parametre email',
        }
    }
}

module.exports = User
