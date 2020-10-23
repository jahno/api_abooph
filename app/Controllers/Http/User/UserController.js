'use strict'
const User = use('App/Models/User')

const {validateAll} = use('Validator')
 const sharp = require('sharp');

class UserController {


  async store({ request, response }) {

const validation = await validateAll(request.all(),{
       email: 'required|email|unique:users',
       password: 'required',
       nom: 'required',
       prenom: 'required', 
       pays: 'required',
       ville: 'required',
       Adresse_geographique: 'required',
       numero: 'required',
    })

    if(validation.fails()){
      return response.status(404).json(validation.messages()) 
    }

    const data = request.only(Object.keys(this.modelUser()))
     if(request.input('avatar')){
       data.avatar = request.input('avatar')
     }
 

    const user = await User.create(data)

    return response
      .status(201)
      .send({msg:'creation du compte effectue'})
  }

  
  async show({ params, request, response }) {
    const user = await User.findOrFail(params.id)
    return response.send(user)
  }


async profile({ request, response }) {
    const {infoUser} = request
    return response.send(infoUser)
  }


 async edit({ params, request, response }) {
   const {infoUser} = request


const validation = await validateAll(request.all(),this.modelUser())

    if(validation.fails()){
      return response.status(404).json(validation.messages()) 
    }

    const data = request.only(Object.keys(this.modelUser()))
     if(request.input('avatar')){
       data.avatar = request.input('avatar')
     }

    infoUser.merge(data)
    await infoUser.save()
    return response.send({msg:'modification du compte effectue',infoUser})
  }

 
  async update({ params, request,response }) {
    const user = await User.findOrFail(params.id)


    
const validation = await validateAll(request.all(),this.modelUser())

    if(validation.fails()){
      return response.status(404).json(validation.messages()) 
    }

    const data = request.only(Object.keys(this.modelUser()))
     if(request.input('avatar')){
       data.avatar = request.input('avatar')
     }


    user.merge(data)
    await user.save()
    return response.send({msg:'modification du compte effectue',user})
  }

  
  async destroy({ params, response }) {
    try {
      const user = await User.findOrFail(params.id)
      await user.delete()
      return response.status(204).send({msg:'suppression du compte effectue'})
    } catch (error) {
      return response
        .status(400)
        .send({ message: 'Erreur lors de la suppression' })
    }
  }

  modelUser(){
    return {
       email: 'required|email',
       password: 'required',
       nom: 'required',
       prenom: 'required', 
       pays: 'required',
       ville: 'required',
       Adresse_geographique: 'required',
       numero: 'required',
    }
  }


  async addImage({request,response}){
    
 
let inputFile  = request.input('images')[0]
const uri = inputFile.split(';base64,').pop()
sharp(inputFile)
  .resize(300, 200)
  .toFormat('png')
  .toBuffer()
  .then((d)=>{
    console.log(d)
  })


}


  async decodedImage(tab,nom,id){

/* let test = await  Promise.all(
    tab.map(async ima => {
      let  d = await base64Img.img(ima, `public/img/article/${nom}`, new Date().getTime());
      console.log(d)
       return d
    })
  ) */


    tab.map( ima => {
        base64Img.img(ima, `public/img/article/${nom}`, new Date().getTime()+randomString({length:1}),async (err,filePath)=>{
          let image = new Image()
          image.chemin = filePath.replace('public','').replace(/\\/g,"/")
          image.article_id = id
          await image.save()   
        });        
    })
 

 //  return test
  }
	  
}

module.exports = UserController
