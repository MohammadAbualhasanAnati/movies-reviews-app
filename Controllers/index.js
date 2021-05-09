const routes=require('express').Router()
const UserController=require('./UserController')

routes.use('/users',UserController)

module.exports=routes