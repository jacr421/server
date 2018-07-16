const mongoose=require('mongoose');

const userShema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    name:{type:String},
    sName:{type:String},
    age:{type:Number},
    telephone:{type:String},
    bagItems: Array
})
module.exports=mongoose.model('User',userShema);