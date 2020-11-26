'use strict'
const User = use('App/Models/User')
const {validateAll} = use('Validator')

class UserController {
  async index ({request,response}) {
   const { nom } = request.only(['nom'])

    const query =  User.query()

    if (nom) {
      query
        .where('nom', 'LIKE', `%${nom}%`)
        .orWhere('prenom', 'LIKE', `%${nom}%`)
        .orWhere('email', 'LIKE', `%${nom}%`)
    }

    const users = await query.paginate(1, 10)
    return response.send(users)


  }

  

  async store ({ params, request, response }) {
    const validation = await validateAll(request.all(),{
       email: 'required|email|unique:users',
       password: 'required',
       nom: 'required',
       prenom: 'required', 
       Adresse_geographique: 'required',
       numero: 'required',
       pays: 'required',
       ville: 'required',
    })

    if(validation.fails()){
      return response.status(404).json(validation.messages()) 
    }

    const data = request.only(Object.keys(this.modelU()))
     if(request.input('avatar')){
       data.avatar = request.input('avatar')
     }
 

    const user = await User.create(data)

    return response
      .status(201)
      .send({msg:'creation du compte effectue'})

  }

  async show ({params,request,response}) {
      const user = await User.findOrFail(params.id)
    return response.send(user)
  }

   
  async update ({request,response,params}) {
    const user = await User.findOrFail(params.id)


   const validation = await validateAll(request.all(),this.modelU())

    if(validation.fails()){
      return response.status(404).json(validation.messages()) 
    }

    const data = request.only(Object.keys(this.modelU()))
     if(request.input('avatar')){
       data.avatar = request.input('avatar')
     }


    user.merge(data)
    await user.save()
    return response.send({msg:'modification du compte effectué avec succès',user})
  }

  async destroy ({request,response,params}) {
    try {
      const user = await User.findOrFail(params.id)
      /*const {infoUser} = request.post()
         if(infoUser.id == params.id){
           return response.send({msg:'impossible de vous suprimer',status:400})
         }*/
       await user.delete()
      return response.status(400).send({msg:'suppression du compte effectue'})
    } catch (error) {
      return response
        .status(400)
        .send({ message: 'Erreur lors de la suppression' })
    }

  }


   modelU(){
    return {
       email: 'required|email',
       password: 'required',
       nom: 'required',
       prenom: 'required', 
       Adresse_geographique: 'required',
       numero: 'required',
       pays: 'required',
       ville: 'required',
    }
  }

}

module.exports = UserController
