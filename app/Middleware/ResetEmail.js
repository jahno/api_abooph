'use strict'

const {validate,validateAll} = use('Validator')
const admin = use('App/Models/Admin')
const user = use('App/Models/User')
const coursier = use('App/Models/Coursier')
const couturier = use('App/Models/Couturier')
class ResetEmail {
  async handle ({ request,response }, next) {
       const validation = await validateAll(request.all(),{
			email:'required'		 
		})

       let n = request.url().split('/')[request.url().split('/').length -1]

		if(validation.fails()){
			return response.status(400).json(validation.messages()) 
		}
		try{
              const elt = await eval(n).findBy('email',request.input('email'))
			  
			if(!elt){
				return response.status(400).json({msg:"Votre email n'est pas reconu"})
			}
			request.body.elt = elt
		 
		}catch(error){
				console.log(error)
			return response.status(400).json({msg:"Err"})
		}

    await next()
  }
}

module.exports = ResetEmail








 
  