const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    MovieId: {
        type: Schema.Types.ObjectId, 
        ref: 'MovieModel',
        required: [true,'The MovieId is required']
    },
    rate: {
        type:Number,
        required: [true,'The Rate is required']
    },
    description:String,
    title:{
        type:String,
        required: [true,'The Title is required']
    }
});

const ReviewModel=mongoose.model('ReviewModel',ReviewSchema)
module.exports=ReviewModel
