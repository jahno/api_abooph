'use strict'

const Admin = use('App/Models/Admin')
const coursier = use('App/Models/Coursier')
const couturier = use('App/Models/Couturier')
const Hash = use('Hash')
const {validateAll} = use('Validator')
class SetJwtLogin {
  async handle ({ request,response }, next) {
     let url  =request.url()
     let jwt = request.url().split('/')[request.url().split('/').length -1]
    

     

     const validation = await validateAll(request.all(),{
      email:'required',
      password:'required',
    })


    if(jwt == "couturier" || jwt =="coursier"){
      let email = request.input('email')
      const elt = await eval(jwt).query().where('email',email).where('etat',true).first()
      if(!elt){
        return response.status(404).json({msg:'Votre compte n\'est pas active '})
      } 
    }
 


 if(validation.fails()){
      return response.status(404).json({msg:'veuillez renseignez tous les paramtres (email & password)'}) 
    }
    

  
    if(jwt == 'user'){
      if(this.isNumeric(request.input('email'))){
        request.body.jwt= 'jwt_num'
      }
    }else{
      request.body.jwt='jwt_'+jwt
    }
 
    await next()
  }


   isNumeric(value) {
    return /^-{0,1}\d+$/.test(value);
}

}

module.exports = SetJwtLogin





      