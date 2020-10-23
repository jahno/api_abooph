'use strict'
const PasswordReset  = use('App/Models/PasswordReset')
const randomString = require('random-string')
const Mail = use('Mail')
const Hash = use('Hash')


class PasswordResetController {

	async sendReset({request,session,response})
	{
		 
		
           
		try{
	     	const {elt}  = request.post()
			 	
			await PasswordReset.query().where('email',elt.email).delete()

			let n = request.url().split('/')[request.url().split('/').length -1]
				   let url =   (n == 'admin') ? 'http://adminrec.abooph.com' :  'http://abooph.com'
				    
			const { token } = await PasswordReset.create({
				email:elt.email,
				token:randomString({length:40})
			})

			const mailData = 
			{
				elt:elt.toJSON(),
				token,
				url
			}

			await Mail.send(`auth.emails.password_reset`,mailData,message =>{
				message.to(elt.email)
				.from('aboophCouture@gmail.com')
				.subject('Renitialisation du mot de passe')
			})

			return response.json({msg:"veuillez consulter votre email"})
		}catch(error){
			console.log(error)
			return response.status(400).json(error)
		}
	}


 getUrl(name){
 	let t ;
 		switch(name){
 			case 'admin': 
 			      t= 'http://adminrec.abooph.com';
 			      break;
 			case 'user':
 					t= 'http://abooph.com';
 					break;
 			default:
 					t= 'http://abooph.com';
 					break;
 		}
 }


	/*async showResetForm({params,response})
	{
		return  response.json({token:params.token})
	}
	*/


	async reset({request,session,response}){
		

		

		try{

			const {elt} = request.post()


			const token = await PasswordReset.query()
			.where('email',elt.email)
			.where('token',request.input('token'))
			.first()


			if(!token){	  	 
				return response.status(400).json({msg:"votre token n'est pas valide"})
			}

			elt.password =  request.input('password')
			await elt.save()

			await PasswordReset.query().where('email',elt.email).delete()


			return response.json({msg:"votre mot de passe a ete modifier avec success"})

		}catch(error){

			return response.status(400).json({msg:'error veuillez patientez '})
		}
	}
}

module.exports = PasswordResetController
