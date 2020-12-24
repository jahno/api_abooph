'use strict'
const User = use('App/Models/User')
const Newsletter = use('App/Models/Newselleter')
const Mail = use('Mail')


const {validateAll} = use('Validator')
 //const sharp = require('sharp');

class UserController {


  async store({ request, response }) {

const validation = await validateAll(request.all(),{
       email: 'required|email|unique:users',
       password: 'required',
       nom: 'required',
       prenom: 'required', 
       pays: 'required',
       ville: 'required',
      // sexe:'required',
       Adresse_geographique: 'required',
       numero: 'required|unique:users',
    })

    if(validation.fails()){
      return response.status(404).json(validation.messages()) 
    }

    const data = request.only(Object.keys(this.modelUser()))
     if(request.input('avatar')){
       data.avatar = request.input('avatar')
     }

     if(!request.input('sexe')){
      data.sexe = "homme"
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


  async newsletter({ request, response }) {

    const validation = await validateAll(request.all(),{
           email: 'required|email|unique:newselleters'
        })
    
        if(validation.fails()){
          return response.status(404).json(validation.messages()) 
        } 
    
        const newseleter = await Newsletter.create(request.only('email'))
    
        return response
          .status(201)
          .send({msg:'Compte enregistrement'})
      }



      async   contact({ request, response }) {
        const validation = await validateAll(request.all(),{
          email: 'required|email',
          nom: 'required',
          prenom: 'required',
          tel: 'required',
          message: 'required',
       })

       if(validation.fails()){
        return response.status(404).json(validation.messages()) 
      } 
        const data = request.only(['email', 'nom', 'prenom','message','tel'])
       
             
        

     await Mail.send('auth.emails.contact',{data}, message => {
        message.to(data.email).cc('vincentfrancois760@gmail.com')
        .from('aboophCouture@gmail.com')
        .subject(`Contact`)
      })
 
          
        return response.status(201).send({msg:'ok'})
      }
  
  


async profile({ request, response }) {
    const {infoUser} = request
    return response.send(infoUser)
  }

  async public({ request, response }) {
    const info = {};
    info.prix_standard = "800"
    info.prix_express = "2000"
    info.slide1 = ""
    info.slide2 = "" 
    info.slide3 = "" 
    info.best_article = "" 
    return response.send(info)
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
       sexe:'required'
    }
  }


//   async addImage({request,response}){
    
 
// let inputFile  = request.input('images')[0]
// const uri = inputFile.split(';base64,').pop()
// sharp(inputFile)
//   .resize(300, 200)
//   .toFormat('png')
//   .toBuffer()
//   .then((d)=>{
//     console.log(d)
//   })


// }


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



  async numero ({request,response,params}) {
    const { num } = request.only(['num'])
   let res=[]
   Array.isArray(num) ?  num.map((elt) =>{ res.push({old_num:elt,new_num:this.calcNum(elt)}) }) : res = ({old_num:num,new_num:this.calcNum(num)})
    return response.send({res})
  }


  calcNum(num){
   
    let pref;
    if(!num.length == 8) return "veuillez saisir un numero de 8 chiffre"
    if(num[0] == 2 || num[0] == 3){
        pref = this.fix(num)
    }else{
       pref = this.normale(num)
    }  
     return pref+num
  }

  fix(num){
    let prefix;
    switch(num[2]){
      case "8":
         prefix= '21';
         break;
      case "0":
        prefix= '25';
        break;
      default:
        prefix='27';
        break;
      
    }
     return prefix;
  }



  normale(num){
   
    let prefix;
 
    switch(num[1]){
      case "0":
      case "1":
      case "2":
      case "3":
         prefix= '01';
         break;
      case "4":
      case "5":
      case "6":
        prefix= '05';
        break;
      case "7":
      case "8":
      case "9":   
          prefix= '07';
           break;      
    }
  
     return prefix;

  }
	  
}

module.exports = UserController
