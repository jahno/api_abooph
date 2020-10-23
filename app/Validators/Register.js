'use strict'

class Register {

	
 
  get rules () {
    return {
       email: 'required|email|unique:users',
       password: 'required',
       nom: 'required',
       prenom: 'required', 
       coordonnee: 'required',
       avatar: 'required',
       numero: 'required',
    }
  }


    get messages() {
        return {
            'email.unique': 'email existe deja',
            'required': 'veuillez renseignez tous les parametres',
        }
    }
}

module.exports = Register
