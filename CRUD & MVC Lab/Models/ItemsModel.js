const mongoose = require("mongoose");

let itemsSchema= new mongoose.Schema({
    id:Number,
    name:String,
    price: Number,
    desc: Number
})

module.exports =  mongoose.model("items",itemsSchema)