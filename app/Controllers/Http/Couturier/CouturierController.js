'use strict'
const {validateAll} = use('Validator')
const base64Img = require('base64-img-promise')
class CouturierController {
  async index () {
  }

  async create () {
  }

  async store () {
  }

  async show () {
  }

  async edit({ params, request, response }) {
    const {infoUser} = request.post()

const validation = await validateAll(request.all(),this.modelUser())

    if(validation.fails()){
      return response.status(404).json(validation.messages()) 
    }

    const data = request.only(Object.keys(this.modelUser()))
   if(request.input('avatar')){   
        data.avatar= await this.decodeUIma(request.input('avatar'),'avatar')  
     }
     

     if(request.input('logo')){   
        data.logo= await this.decodeUIma(request.input('logo'),'logo')  
     }

      if(request.input('password')){
       data.password = request.input('password')
     }

    infoUser.merge(data)
    await infoUser.save()
    return response.send({msg:'modification du compte effectue',infoUser})
  }

  async update () {
  }

   async decodeUIma(url,ch){
      let  d = await base64Img.img(url, `public/img/couturier/${ch}`, new Date().getTime());
      return d.replace('public','').replace(/\\/g,"/")     
}

  async destroy () {
  }


  modelUser(){
    return {
       email: 'required|email',
     //  password: 'required',
       nom: 'required',
       prenom: 'required', 
       Adresse_geographique: 'required',
      // categorie_couturier_id:'required',
       numero: 'required',
    }
  }


}

module.exports = CouturierController
