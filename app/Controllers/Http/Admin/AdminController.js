'use strict'
const Admin = use('App/Models/Admin')
const Role = use('App/Models/Role')
const {validateAll} = use('Validator')
const Hash = use('Hash')
const base64Img = require('base64-img-promise')
class AdminController {
 async index ({request,response}) {
   const { nom } = request.only(['nom'])

    const query =  Admin.query()
                         .whereHas('roles',(r)=>{r.where('name','admin')})
/*
    if (nom) {
      query
        .where('nom', 'LIKE', `%${nom}%`)
        .orWhere('prenom', 'LIKE', `%${nom}%`)
        .orWhere('email', 'LIKE', `%${nom}%`)
    }*/

    //const admins = await query.paginate(1, 10)
    const admins = await query.orderBy('id', 'DESC').fetch()

    return response.send(admins)


  }

  

  async store ({ params, request, response }) {
    const validation = await validateAll(request.all(),{
       email: 'required|email|unique:admins',
       password: 'required',
       nom: 'required',
       prenom: 'required', 
       numero: 'required',
    })

    if(validation.fails()){
      return response.status(404).json(validation.messages()) 
    }

    const data = request.only(Object.keys(this.modelA()).concat(['password']))
     if(request.input('avatar')){
       data.avatar= await this.decodeUIma(request.input('avatar'),'avatar')  
     }
 

    const roles = await Role.query().where('name','admin').first()
    const admin = await Admin.create(data)
                  await admin.roles().attach(roles.id)

    return response
      .status(201)
      .send({msg:'creation du compte effectué avec succès'})

  }

  async show ({params,request,response}) {
      const admin = await Admin.findOrFail(params.id)
    return response.send(admin)
  }

   
  async update ({request,response,params}) {
    const admin = await Admin.findOrFail(params.id)


   const validation = await validateAll(request.all(),this.modelA())

    if(validation.fails()){
      return response.status(404).json(validation.messages()) 
    }

    const data = request.only(Object.keys(this.modelA()))
     if(request.input('avatar')){
       data.avatar= await this.decodeUIma(request.input('avatar'),'avatar')  
     }
     if(request.input('password')){
       data.password = request.input('password')
     }

    admin.merge(data)
    await admin.save()
    return response.send({msg:'modification du compte effectué avec succès',admin})
  }


  async profile ({request,response,params,auth}) {
     
     let  admin = await auth.authenticator(`jwt_admin`).getUser()


   const validation = await validateAll(request.all(),this.modelA())

    if(validation.fails()){
      return response.status(400).json(validation.messages()) 
    }

    const data = request.only(Object.keys(this.modelA()))
     if(request.input('avatar')){
        data.avatar= await this.decodeUIma(request.input('avatar'),'avatar')  
     }

      if(request.input('password') && request.input('old_password') ){
         const passwordVerified = await Hash.verify(request.input('old_password'),admin.password)
        if(!passwordVerified){
          return response.status(400).json({msg:'erreur password incorrect'})
        }
       data.password = request.input('password')
     }

          

     admin.merge(data)
     await admin.save()
    return response.status(200).send({msg:'modification du compte effectué avec succès',admin})
  }

  async destroy ({request,response,params,auth}) {
    try {
      const admin = await Admin.findOrFail(params.id)
 
      let  infoUser = await auth.authenticator(`jwt_admin`).getUser()
         if(infoUser.id == params.id){
           return response.send({msg:'impossible de vous suprimer',status:400})
         }
       await admin.delete()
      return response.status(200).send({msg:'suppression du compte effectué avec succès'})
    } catch (error) {
      
      return response
        .status(400)
        .send({ message: 'Erreur lors de la suppression' })
    }

  }


     async decodeUIma(url,ch){
      let  d = await base64Img.img(url, `public/img/couturier/${ch}`, new Date().getTime());
      return d.replace('public','').replace(/\\/g,"/")     
}


   modelA(){
    return {
       email: 'required|email',
      // password: 'required',
       nom: 'required',
       prenom: 'required', 
       numero: 'required',
    }
  }
}

module.exports = AdminController
