const mongoose = require("mongoose");
const express = require("express");
const router =express.Router();

const Item = require('../models/item');

router.get('/all', (req,res)=>{
    Item.find({}).then(data=>{
        res.status(200).json(data)
    }).catch(error=>{
        res.status(500).json({'error':error})
    });
});
router.get('/:itemId',(req,res)=>{
    const id= req.params.itemId;
    Item.findOne({'_id':id}).then(data=>{
        res.status(200).json(data);
    }).catch(error=>{res.status(500).json({"error":error})})
})


router.post('/save', (req,res)=>{
    const item = new Item({
        _id:mongoose.Types.ObjectId(),
        title:req.body.title,
        type:req.body.type,
        material:req.body.material,
        typeBrakes:req.body.typeBrakes,
        price:req.body.price,
        country:req.body.country,
        numberOfGears:req.body.numberOfGears,
        image:req.body.image,
        shortDescription:req.body.shortDescription
    },{versionKey:false})
    item.save().then(result =>{
        res.status(200).json(  {
            'message':'saccessful',
            'item':result
        } )
    }).catch(err=>{
        res.status(500).json({'error':err});
    })
})
router.post('/delete/:itemId', (req,res)=>{
    const id= req.params.itemId;
    //db.items.deleteOne( { "_id" : ObjectId("5b295a2db8dc8a0b7c9ad74c") } );
    Item.deleteOne({'_id':id}).then(data=>{
        res.status(200).json(data);
    }).catch(error=>{res.status(500).json({"error":error})})

})

module.exports= router;