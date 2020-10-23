'use strict'

const Database = use('Database')
const Commande = use('App/Models/Commande')
const Mesure = use('App/Models/Mesure')
const {validateAll} = use('Validator')
const Event = use('Event')

class MesureController {

	 async store ({ params, request, response,auth }) {
   
    const validation = await validateAll(request.all(),{
       commande_id: 'required',
    })

   /* if(validation.fails()){
      return response.status(404).json(validation.messages()) 
    }*/
     let  infoUser = await auth.authenticator(`jwt_coursier`).getUser()

   
    const commande = await Commande.query()
    							   .where('coursier_id',infoUser.id)
    							   .where('id',params.id)
                     .with('panier.articles')
    							   .first()
                   
   // console.log(commande.toJSON().etatText[2])
    
    const mesure = await Mesure.create({user_id:commande.user_id,commande_id:commande.id,descriptions:JSON.stringify(request.all())})

    Event.emit('new::mesure', commande,mesure)
         
        
    return response
      .status(201)
      .send({msg:'creation du compte effectue'})

  }


   async update ({request,response,params}) {
    const coursier = await Mesure.findOrFail(params.id)


   const validation = await validateAll(request.all(),this.modelM())

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


   modelM(){
    return {
       commande_id: 'required',
    }
  }

}

module.exports = MesureController
