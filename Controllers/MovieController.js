const express=require('express')
const mongoose=require('mongoose')
const routes=express.Router()
const {generateAccessToken,authenticateToken}=require('../Helpers/auth')
const MovieModel=require('../Models/Movie')

routes
.get('/',(req,res)=>{
    MovieModel.find({},{}).populate('reviews').exec((err,results)=>{
        res.status(200).json(results)
    })
})
.post('/',authenticateToken,(req,res)=>{
    const newMovie=new MovieModel(req.body)
    newMovie.save((err)=>{
        if(err){
            return res.status(400).json({'errors':err});
        }
        res.status(200).json({'success':'The movie is created successfully!!'});
    })
})
.delete('/:id',authenticateToken,(req,res)=>{
    const id = req.params.id;
    MovieModel.find({ _id:id }).remove( (err)=>{
        if(err){
            return res.status(400).json({'errors':err});
        }
        res.status(200).json({'success':'The movie is deleted successfully!!'});
    });
})
.patch('/:id',authenticateToken,(req,res)=>{
    const id = req.params.id;
    const data=req.body
    MovieModel.findOneAndUpdate({ _id:id },{...data}, { strict: false },(err,result)=>{
        if(err){
            return res.status(400).json({'errors':err});
        }
        res.status(200).json({'success':'The movie is editied successfully!!',result});
    })
    
})


module.exports=routes