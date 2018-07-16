const mongoose =  require("mongoose");
const express = require("express");
const router = express.Router();
const bcrypt =require('bcrypt')
const User = require('../models/user')
const jwt = require("jsonwebtoken")
const check = require("../middleware/check-auth")

router.post('/signup',(req,res)=>{
    console.log(req.body.password)
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err){
            res.status(500).json({message:err})
        }else{
            
            const user=new User({
                _id:mongoose.Types.ObjectId(),
                email:req.body.email,
                name:req.body.name,
                sName:req.body.sName,
                age:req.body.age,
                telephone:req.body.telephone,
                password: hash}); 
                user.save().then(result=>{
                    res.status(200).json({
                        "message" : "User creared"
                    })
            }).catch(err=>{
                res.status(500).json({
                    "message" :err 
                })
            })
        }
    })
})


router.post("/login",(req,res)=>{
    User.find({email: req.body.email}).then(data=>{
        if(data.length<1){
            res.status(401).json({"message":"Failed"})
        } else {
            bcrypt.compare(req.body.password,data[0].password,(err,result)=>{
                if(err){
                    res.status(401).json({ massage : "Failed"})
                }
                if(result){
                    const token = jwt.sign({
                        email : data[0].email,
                        id : data[0]._id
                    },'dsbg23fo8783qoclaiq2ovfeq2839GRFVF')
                    res.status(200).json({token : token})
                }else{
                    res.status(401).json({message: "Failed"})
                }

            })
        }
    }).catch(err=>{
        res.status(500).json({message : err})
    })

})


router.get("/add/:id", (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "dsbg23fo8783qoclaiq2ovfeq2839GRFVF");
    const id = req.params.id;
    console.log(decoded.id);
    User.findOne({_id: decoded.id}).then(data => {
        console.log(data);

        data.bagItems.push(id);
        User.findOneAndUpdate({_id: decoded.id}, data).then(user => {
            res.status(200).json(data);
        }).catch(err => {
            res.status(500).json({message: err});
        })
    }).catch(err => {
        res.status(404).json({message: err});
    });
    
})

//email node js smtp   w3s
// router.get("/add/:id", check,(req,res) => {
// // router.get("/add/:id",(req,res) => {
    
//     const token = req.headers.authorization.split(" ")[1];
//     const decoded = jwt.verify(token,'dsbg23fo8783qoclaiq2ovfeq2839GRFVF')
//     console.log(decoded.id)
//     ////// res.status(200).json({message : decoded})
//     const id= req.param.id;

//     User.findOne({_id: decoded.id}).then( user => {
//         user.bagItems.push(id);
//         User.findOneAndUpdate({_id: decoded.id}, user,  { upsert: true, new: true }, ( error, obj ) => {
//             if( error ) {
//                 res.status(500).json(err);

//              } else {
//                 res.status(200).json(obj);

//              }
            
            
//             })
        
        
//         // ).then(result =>{
//         //     console.log(result)
//         //     res.status(200).json({message: "Added"})
//         // }).catch(err =>{
//         //     res.status(500).json(err)
//         // })

//     }).catch(err =>{
//         console.log("erooooooooooooooooooooooooooooor")
//         res.status(500).json(err);
//     })
// })

module.exports=router