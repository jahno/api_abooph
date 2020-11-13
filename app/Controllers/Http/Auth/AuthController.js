'use strict'

const UserTransformer = use('App/Transformers/UserTransformer')
const User = use('App/Models/User')
const admin = use('App/Models/Admin')
const user = use('App/Models/User')
const coursier = use('App/Models/Coursier')
const couturier = use('App/Models/Couturier')
const Hash = use('Hash')
const {validateAll} = use('Validator')

class AuthController {

	async LoginOld({request,auth,session,response,transform})
	{
     
		//const {jwt} = request.post()
		const {email,password } = request.all()


		//const data = await auth
     
		const {token} = await auth
			 //.authenticator()
		 	//.withRefreshToken()
		 	.attempt(email,password)
		// return {data}
 

		 	//.getUser()

		 	//const {user} = request.post()

		 	/*return transform.collection(users, user => ({
			  email: user.email,
			  password: user.password
			}))*/

		//return transform.collection(users, UserTransformer)
       
       
       
               
       		const user = await User.query()
                           			.where('email',email)
                           			.first()


            if(user){
		       const passwordVerified = await Hash.verify(password,user.password)
		        if(passwordVerified){
		        	 
		        	let roles=await user.getRoles()
		          return {user,token,roles}
		        }
		     
           }
       
   

      /*const {email,password} = request.all()
       const user = await User.query()
                           .with('role')
                           //.with('organisation')
                           .where('email',email)
                           .first()

        

         if(user){
       const passwordVerified = await Hash.verify(password,user.password)
        if(!passwordVerified){
          return response.status(404).json({msg:'erreur password incorrect'})
        }
     }else{
       return response.status(404).json({msg:'erreur email incorrect'})
     } 


		 	
		 	return {token:token,user:user}*/


		 }



      async Login({request,auth,session,response})
  {
    const {jwt} = request.post()
    const {email,password} = request.all()
    let elt = request.url().split('/')[request.url().split('/').length -1]
        
 
    const {token} = await auth
      .authenticator(jwt)
      .attempt(email,password)
    
      let use;
      if(jwt == 'jwt_num'){
        use =  await eval(elt).findBy('numero', email)
      }else{
         use =  await eval(elt).findBy('email', email)
      }

     if(jwt == 'jwt_admin'){
      let roles = await use.getRoles()
      let t  = {...use.toJSON()}
      t.roles= roles
      use = t    
     } 
      return {token:token,user:use}
    
  }

async logout({ request, response, auth }) {
    let refresh_token = request.input('refresh_token')

    if (!refresh_token) {
      refresh_token = request.header('refresh_token')
    }

    const loggedOut = await auth
      .authenticator('jwt')
      .revokeTokens([refresh_token], true)

    return response.status(204).send({})
  }


  async register({ request, response, auth }) {
    let refresh_token = request.input('refresh_token')

    if (!refresh_token) {
      refresh_token = request.header('refresh_token')
    }

    const loggedOut = await auth
      .authenticator('jwt')
      .revokeTokens([refresh_token], true)

    return response.status(204).send({})
  }


  async register({response,request}){
    const validation = await validateAll(request.all(),{
      name:'required',
      email:'required',
      password:'required',
    })
    if(validation.fails()){
      return response.status(404).json(validation.messages()) 
    }

    const user = await User.create({
      username:request.input('name'),
      email:request.input('email'),
      password:request.input('password'),
    })
    return response.status(200).json({msg:'creation du compte effectue'})
  }

  
}

module.exports = AuthController
