'use strict'
const Coursier = use('App/Models/Coursier')
const {validateAll} = use('Validator')
//const base64Img = require('base64-img')
const base64Img = require('base64-img-promise')
class CoursierController {
  async index ({request,response}) {
   const { nom } = request.only(['nom'])
  let page = request.input('page') || 1
    const query =  Coursier.query()

    if (nom) {
      query
        .where('nom', 'LIKE', `%${nom}%`)
        .orWhere('prenom', 'LIKE', `%${nom}%`)
        .orWhere('email', 'LIKE', `%${nom}%`)
    }

    //const coursiers = await query.paginate(pagination.page, pagination.perpage)
    const coursiers = await query.paginate(page, 10)
    return response.send(coursiers)


  }

  

  async store ({ params, request, response }) {
    const validation = await validateAll(request.all(),{
       email: 'required|email|unique:coursiers',
       password: 'required',
       nom: 'required',
       prenom: 'required', 
       Zone_intervention: 'required',
       Adresse_geographique: 'required',
       numero: 'required',
    })

    if(validation.fails()){
      return response.status(404).json(validation.messages()) 
    }
         let e = {
       email: 'required|email',
       password: 'required',
       Zone_intervention: 'required',
       Adresse_geographique: 'required',
       nom: 'required',
       prenom: 'required', 
       numero: 'required',
    }
    const data = request.only(Object.keys(this.modelU()).concat(['password']))
    if(request.input('avatar')){   
        data.avatar= await this.decodeUIma(request.input('avatar'))  
     }

     //data.Etat=1
 

    const coursier = await Coursier.create(data)

    return response
      .status(201)
      .send({msg:'creation du compte effectue'})

  }

  async show ({params,request,response}) {
      const coursier = await Coursier.findOrFail(params.id)
    return response.send(coursier)
  }

   
  async update ({request,response,params}) {
    const coursier = await Coursier.findOrFail(params.id)


   const validation = await validateAll(request.all(),this.modelU())

    if(validation.fails()){
      return response.status(404).json(validation.messages()) 
    }

    const data = request.only(Object.keys(this.modelU()))
     if(request.input('avatar')){
        data.avatar= await this.decodeUIma(request.input('avatar'))  
     }
     
      if(request.input('password')){
       data.password = request.input('password')
     }


    coursier.merge(data)
    await coursier.save()
    return response.send({msg:'modification du compte effectue',coursier})
  }

  async destroy ({request,response,params}) {
    try {
      const coursier = await Coursier.findOrFail(params.id)
      await coursier.delete()
       return response.status(200).send({msg:'suppression du compte effectue'})
    } catch (error) {
      return response
        .status(400)
        .send({ message: 'Erreur lors de la suppression' })
    }

  }

  async publish ({request,auth,response,params}) {
      
      const coursier = await Coursier.findOrFail(params.id)
            
            
            coursier.Etat  = (coursier.Etat == 0) ? 1 : 0            
            coursier.save()
          
          

      return response.status(200).send({msg:'etat  modifie',coursier})
  }


 async decodeUIma(url){
      let  d = await base64Img.img(url, `public/img/coursier`, new Date().getTime());
      return d.replace('public','').replace(/\\/g,"/")     
}

   modelU(){
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



   

   
 
 
   

 