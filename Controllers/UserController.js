const jwt = require('jsonwebtoken');
const bcrypt=require('bcrypt')
const express=require('express')
const routes=express.Router()
const UserModel=require('../Models/User')


const SALT_WORK_FACTOR = 10;
const TOKEN_SECRET=process.env.TOKEN_SECRET



//Generate Token Secret
//require('crypto').randomBytes(64).toString('hex')

routes
.post('/login',(req,res)=>{
    if(!req.body.password){
        req.body.password=''
    }
    UserModel.find({email :req.body.email},function(err, results) {
        if(err){
            return res.status(400).json({'errors':err});
        }
        bcrypt.compare(req.body.password, results[0].password, function(err, resB) {
            if(err){
                return res.status(400).json({'errors':err});
            }
            let isWrongCred=false
            if(resB===true){
                if(results.length>0){
                    const accessToken = jwt.sign({ email: results[0].email }, TOKEN_SECRET);
                    res.status(200).json({success: "Logged In Successfully",accessToken});
                }else{
                    isWrongCred=true
                }
            }else{
                isWrongCred=true
            }
            if(isWrongCred){
                res.status(404).json({error:"The user name or password is not correct"})
            }
        })
        
    })
})
.post('/signup',(req,res)=>{
    UserModel.testValidate(req.body)
    .then(data=>{
        delete data.password_confirm
        bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
            if (err) return res.status(400).json({'errors':err});
            bcrypt.hash(data.password, salt, function(err, hash) {
                if (err) return res.status(400).json({'errors':err});

                data.password=hash;
                
                const newUser=new UserModel(data)
                newUser.save((err)=>{
                    if(err){
                        return res.status(400).json({'errors':err});
                    }
                    res.status(200).json({'success':'The user is created successfully!!'});
                })
            }); 
        });
    }).catch(err=>{
        res.status(400).json({'errors':err});
    })

    
})

module.exports=routes