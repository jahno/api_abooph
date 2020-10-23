'use strict'
const {validate,validateAll} = use('Validator')
const admin = use('App/Models/Admin')
const user = use('App/Models/User')
const coursier = use('App/Models/Coursier')
const couturier = use('App/Models/Couturier')

class ResetPass {
  async handle ({ request,response }, next) {

  	const validation = await validateAll(request.all(),{
			token:'required',
			email:'required',
			password:'required',		 
		})
   
   if(validation.fails()){
			return response.status(400).json(validation.messages()) 
	}
  
   let n = request.url().split('/')[request.url().split('/').length -1]

      try{	
			 const elt = await eval(n).findBy('email',request.input('email'))
			if(!elt){
				return response.status(400).json({msg:"Votre email n'est pas reconu"})
			}
			request.body.elt = elt     	
		}catch(error){
			return response.status(400).json({msg:"Votre email n'est pas reconu"})
		}

    // call next to advance the request
    await next()
  }


   
}

module.exports = ResetPass






 

		

		