const routes=require('express').Router()
const UserController=require('./UserController')
const MovieController=require('./MovieController')
const ReviewController=require('./ReviewController')

routes.get('/',(req,res)=>{
    res.status(200).send('<html><a href="api/movies/">Movies</a><br/><a href="api/reviews/">Reviews</a></html>').end()
})
routes.use('/users',UserController)
routes.use('/movies',MovieController)
routes.use('/reviews',ReviewController)

module.exports=routes