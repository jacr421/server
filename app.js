const mongoose=require("mongoose");
const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const itemRoutes=require("./routes/itemRoutes")
const userRoutes=require("./routes/userRoutes")

mongoose.connect('mongodb://localhost:27017/bycycleDB');

var db=mongoose.connection;

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use("/items",itemRoutes)
app.use("/user",userRoutes)

app.all((req,res,next)=>{
    res.header("Access-Control-Aloow-Origin",'*');
    res.header("Access-Control-Aloow-Header",'*');
    if(req.method==="OPTION"){
        res.header("Access-Control-Aloow-Methods","POST","GET")
    }
    next();
})

module.exports=app;