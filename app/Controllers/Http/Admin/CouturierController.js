'use strict'
const Couturier = use('App/Models/Couturier')
const {validateAll} = use('Validator')
//const base64Img = require('base64-img')
const base64Img = require('base64-img-promise')
class CouturierController {
  
  async index ({request,response}) {
   const { nom } = request.only(['nom'])
  let page = request.input('page') || 1
    const query =  Couturier.query()
                            .with('categorieCouturier')

    if (nom) {
      query
        .where('nom', 'LIKE', `%${nom}%`)
        .orWhere('prenom', 'LIKE', `%${nom}%`)
        .orWhere('email', 'LIKE', `%${nom}%`)
    }

    //const couturiers = await query.paginate(pagination.page, pagination.perpage)
    const couturiers = await query.paginate(page, 10)
    return response.send(couturiers)


  }


  async ShowCouturier ({request,response}) {


    const couturiers = await Couturier.query()
                                      .select('id','nom')
                                      .fetch()
     
    return response.send(couturiers)


  }


   async publish ({request,auth,response,params}) {
      
      const couturier = await Couturier.findOrFail(params.id)
            
            
            couturier.Etat  = (couturier.Etat == 0) ? 1 : 0            
            couturier.save()
          
          

      return response.status(200).send({msg:'etat  modifie',couturier})
  }

  

  async store ({ params, request, response }) {
    const validation = await validateAll(request.all(),{
       email: 'required|email|unique:couturiers',
       password: 'required',
       nom: 'required',
       prenom: 'required', 
       Adresse_geographique: 'required',
       categorie_couturier_id:'required',
       numero: 'required',
    })

    if(validation.fails()){
      return response.status(404).json(validation.messages()) 
    }

    const data = request.only(Object.keys(this.modelU()).concat(['password','logo']))
     if(request.input('logo')){ 
        data.logo= await this.decodeUIma(request.input('logo'))  
     }
 
   const couturier = await Couturier.create(data)

    return response
      .status(201)
      .send({msg:'creation du compte effectue'})

  }

  async show ({params,request,response}) {
      const couturier = await Couturier.findOrFail(params.id)
    return response.send(couturier)
  }

   
  async update ({request,response,params}) {
    const couturier = await Couturier.findOrFail(params.id)


   const validation = await validateAll(request.all(),this.modelU())

    if(validation.fails()){
      return response.status(404).json(validation.messages()) 
    }

    const data = request.only(Object.keys(this.modelU()))
     if(request.input('logo')){
       data.logo= await this.decodeUIma(request.input('logo'))  
     }

     if(request.input('password')){
       data.password = request.input('password')
     }

    couturier.merge(data)
    await couturier.save()
    return response.send({msg:'modification du compte effectue',couturier})
  }

  async destroy ({request,response,params}) {
    try {
      const couturier = await Couturier.findOrFail(params.id)
      await couturier.delete()
       return response.status(200).send({msg:'suppression du compte effectue'})
    } catch (error) {
      return response
        .status(400)
        .send({ message: 'Erreur lors de la suppression' })
    }

  }

  async decodeUIma(url){
      let  d = await base64Img.img(url, `public/img/couturier/logo`, new Date().getTime());
      return d.replace('public','').replace(/\\/g,"/")     
}


   modelU(){
    return {
       email: 'required|email',
     //  password: 'required',
       nom: 'required',
       prenom: 'required', 
       Adresse_geographique: 'required',
       categorie_couturier_id:'required',
       numero: 'required',
    }
  }
}

module.exports = CouturierController
