
const Route = use('Route')




Route.group(() => {
  
Route.get('/all','Admin/CategorieArticleController.ShowArticle')
Route.get('/children','User/CategorieController.childrens')

  


 
     

})
  .prefix('v1/categoriearticle')
  //.namespace('Client')