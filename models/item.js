const mongoose= require('mongoose');

const itemSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    type:String,
    material:String,
    typeBrakes:String,
    price:Number,
    country:String,
    numberOfGears:Number,
    image:Array,
    shortDescription:String
},{versionKey:false})




module.exports = mongoose.model('Item',itemSchema)