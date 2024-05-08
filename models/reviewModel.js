const mongoose = require('mongoose');

const reviewSchema =new mongoose.Schema({
    review:{
        type:String,
        required: [true,"Review cannot be empty"]
    },
    rating:{
        type:Number,
        min:1,
        max:5
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"user",
        required:[true,"Review must belong to a user"]
    },
    product:{
        type:mongoose.Schema.ObjectId,
        ref:"product",
        required:[true,"Review must belong to a product"]
    }
})

const reviewModel = mongoose.model('review',reviewSchema)

module.exports=reviewModel