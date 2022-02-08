const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OrderSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price:{
        type:Number,
        required:true
    },
    buyer: {
        type: String,
        required: true,
        //unique: true
    },
    vendor:{
        type:String,
        required:true
    },
    quantity: {
        type: Number,
        required: true
    },
    placed_time: {
        type: String,
        required: true,
        //unique:true
    },
    status: {
        type: String,
        required: true
    },
    rating:{
        type:Number,
        default:0
    },
    add_on:[
        {
            item:{
                type:String
            },
            price:{
                type:Number
            }
        }
    ]
        //required: true
    
});  
module.exports=Order= mongoose.model("Orders", OrderSchema);