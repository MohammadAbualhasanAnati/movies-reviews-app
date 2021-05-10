const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    name: {
        type:String,
        required: [true,'The Movie Name is required']
    },
    genre: {
        type:String,
        required: [true,'The Genre is required']
    },
    year: {
        type:String,
        required: [true,'The Year is required']
    },
    actors:[String],
    reviews:[
        {type:Schema.Types.ObjectId,ref:'ReviewModel'}
    ],
});

MovieSchema.statics.testValidate = function( movie ) {
    return new Promise( ( res, rej ) => {
        const movieObj = new this( movie )
        movieObj.validate( err => {
            if ( err ) return rej( err )
            res( movie )
        } )
    })
}


const MovieModel=mongoose.model('MovieModel',MovieSchema)
module.exports=MovieModel
