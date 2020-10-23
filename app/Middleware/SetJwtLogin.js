'use strict'

const Admin = use('App/Models/Admin')
const Hash = use('Hash')
const {validateAll} = use('Validator')
class SetJwtLogin {
  async handle ({ request }, next) {
     let url  =request.url()
     let jwt = request.url().split('/')[request.url().split('/').length -1]
    
  

     const validation = await validateAll(request.all(),{
      email:'required',
      password:'required',
    })

 if(validation.fails()){
      return response.status(404).json({msg:'veuillez renseignez tous les paramtres (email & password)'}) 
    }
    request.body.jwt='jwt_'+jwt
    await next()
  }
}

module.exports = SetJwtLogin





      