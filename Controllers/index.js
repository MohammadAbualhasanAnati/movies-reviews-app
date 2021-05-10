const routes=require('express').Router()
const UserController=require('./UserController')
const MovieController=require('./MovieController')
const ReviewController=require('./ReviewController')

routes.use('/users',UserController)
routes.use('/movies',MovieController)
routes.use('/reviews',ReviewController)

module.exports=routes