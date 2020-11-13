'use strict'
const Logger = use('Logger')
const {validateAll} = use('Validator')
class CheckConnect {
  async handle ({ request,response,auth }, next) {
    // call next to advance the request
     try{
     	   let n = request.url().split('/')[2]
         
        
           
          //console.log(n)
      let ver =  await auth.authenticator(`jwt_${n}`).check()
       if(ver){
          let  infos = await auth.authenticator(`jwt_${n}`).getUser()   
           request.body.infoUser = infos;          
           await next() 
      }else{
        return response.json({msg:'vous n\'êtes pas autorise'})
      }
      
       
     /* if(ver){
          let  infos = await auth.authenticator(`jwt_admin`).getUser()   
          request.infoUser = infos;      
           await next() 
      }else{
        return response.json({msg:'vous n\'êtes pas autorise'})
      }
      */

    }catch(msg){
      //console.log(msg)
      Logger
      .transport('file')
      .info(`erreur au niveau du middleware CheckConnect ${msg}`)
    	return response.json({msg:`token inconnu : :(`})
    }
  }
}

module.exports = CheckConnect
