'use strict'

class Login {
   get rules() {
        return {
            email: 'required|email',
            password: 'required'
        }
    }

     get messages() {
        return {
            'required': 'veuillez fournir tous les parametres (email,password)',
        }
    }
}

module.exports = Login
