const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
    bookedAt:{
        type:Date,
        default:Date.now() 
    },
    priceAtBooking:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:['pending','confirmed','cancelled'],
        default:'pending'
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'user',
        required:true
    },
    product:{
        type:mongoose.Schema.ObjectId,
        ref:'product',
        required:true  
    },
    paymentOrderId:String
  })

const bookingModel = mongoose.model('booking',bookingSchema)
module.exports = bookingModel;