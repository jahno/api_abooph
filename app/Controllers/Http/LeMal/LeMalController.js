'use strict'
const LeMal = use('App/Models/Mal')
const {validateAll} = use('Validator')
class LeMalController {



	  async index ({request,auth,response}) {


    let  {infoUser} =  request.post()
  const { nom } = request.only(['nom'])
  let page = request.input('page') || 1
  const query = LeMal.query()
    if (nom) {
      query.where('nom', 'LIKE', `${nom}`)
    }
    const results = await query
                          .paginate(page, 10)
  return response.json({results})
  }

  

  async store ({ params, request, response }) {
    const validation = await validateAll(request.all(),{
       compte: 'required', 
       numero: 'required',
    })

    if(validation.fails()){
      return response.status(404).json(validation.messages()) 
    }

     
    const admin = await LeMal.create(request.only(['compte','numero']))
    return response
      .status(201)
      .send({msg:'enregistrement du compte effectue'})

  }


}

module.exports = LeMalController
