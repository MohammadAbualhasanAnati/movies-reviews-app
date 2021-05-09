const routes=require('express').Router()


routes
.get('/signup',(req,res)=>{
    res.status(200).json({ message: 'Connected!' });
})

module.exports=routes