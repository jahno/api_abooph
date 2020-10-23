'use strict'
const {validateAll} = use('Validator')
const base64Img = require('base64-img-promise')
class CoursierController {
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
        data.avatar= await this.decodeUIma(request.input('avatar'))  
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

   async decodeUIma(url){
      let  d = await base64Img.img(url, `public/img/coursier`, new Date().getTime());
      return d.replace('public','').replace(/\\/g,"/")     
}

  async destroy () {
  }



   modelUser(){
      return {
       email: 'required|email',
     //  password: 'required',
       Zone_intervention: 'required',
       Adresse_geographique: 'required',
       nom: 'required',
       prenom: 'required', 
       numero: 'required',
    }
  }

}

module.exports = CoursierController
