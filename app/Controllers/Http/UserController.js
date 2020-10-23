'use strict'
const User = use('App/Models/User')
class UserController {

	 async create({request,response}){
	 	//const email
	 	//const us = await User.create(request)
	 }

   async edit({request,response}){
	 	//const email
	 	//const us = await User.create(request)
	 }

	 async update({request,response}){
	 	//const email
	 	//const us = await User.create(request)
	 }

	  async me({ response, transform, auth }) {
        const user = await auth.getUser()
        const roles = await user.getRoles()
        
        return {user,roles}
    }
}

module.exports = UserController
