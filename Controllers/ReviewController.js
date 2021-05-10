const express=require('express')
const mongoose=require('mongoose')
const routes=express.Router()
const {generateAccessToken,authenticateToken}=require('../Helpers/auth')
const ReviewModel=require('../Models/Review')

routes
.get('/',(req,res)=>{
    ReviewModel.find({},{},(err,results)=>{
        res.status(200).json(results)
    })
})
.post('/',authenticateToken,(req,res)=>{
    const newReview=new ReviewModel(req.body)
    newReview.save((err)=>{
        if(err){
            return res.status(400).json({'errors':err});
        }
        res.status(200).json({'success':'The REVIEW is created successfully!!'});
    })
})
.delete('/:id',authenticateToken,(req,res)=>{
    const id = req.params.id;
    
    ReviewModel.find({ _id:id }).remove( (err)=>{
        if(err){
            return res.status(400).json({'errors':err});
        }
        res.status(200).json({'success':'The REVIEW is deleted successfully!!'});
    });
})
.patch('/:id',authenticateToken,(req,res)=>{
    const id = req.params.id;
    const data=req.body
    ReviewModel.findOneAndUpdate({ _id:id },{...data}, { strict: false },(err,result)=>{
        if(err){
            return res.status(400).json({'errors':err});
        }
        res.status(200).json({'success':'The REVIEW is editied successfully!!',result});
    })
    
})


module.exports=routes