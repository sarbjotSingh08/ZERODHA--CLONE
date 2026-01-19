require("dotenv").config();
//ALWAYS AT TOP .ENV
const express=require("express");
const app=express();
const mongoose=require("mongoose");

const MONGO_URL=process.env.MONGO_URL;
const PORT=process.env.PORT || 3002;

//MONGO DB CONNECTION

async function connectMongoDB(){
    try{
    await mongoose.connect(MONGO_URL);
    console.log("DATABASE CONNECTED");
}
catch(error){
console.log("DATABASE CONNECTION ERROR",error.message)
}
}

connectMongoDB();

app.listen(PORT,()=>{
    console.log("App Started")
})