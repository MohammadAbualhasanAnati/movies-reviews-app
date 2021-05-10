const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    email: {
        type:String,
        trim: true,
        unique: true,
        lowercase: true,
        required: [true,'The email is required'],
        validate:{
            validator: (v)=> {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            }
        }
    },
    password: {
        type:String,
        min:[8,'Enter 8 characters at least'],
        required: [true,'The password is required']
    },
});
UserSchema.statics.testValidate = function( user ) {
    return new Promise( ( res, rej ) => {
        const userObj = new this( user )
        userObj.validate( err => {
            if ( err ) return rej( err )
            if(!user.password_confirm){
                rej({password_confirm:'The confirm password is required'});
            }
            if(user.password!=user.password_confirm){
                rej({password:'The passwords do not match!'});
            }else{
                res( user )
            }
        } )
    })
}

const UserModel=mongoose.model('UserModel',UserSchema)
module.exports=UserModel