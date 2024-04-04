const mongoose = require("mongoose");

let ordersSchema= new mongoose.Schema({
    id:Number,
    TotalPrice: {
        type: Number,
        min: 10
    },
    items: {
        type: [Number], 
        required: true
    }
})

module.exports =  mongoose.model("orders",ordersSchema)
