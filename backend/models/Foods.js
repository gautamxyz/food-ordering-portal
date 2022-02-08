const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FoodSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    shop_name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },    
    rating:{
        type:Number,
        required:true,
        default:0
    },
    veg_nonveg:{
        type:String,
        required:true,
        enum:['Veg','Non-Veg']
    },
    tag:[String],
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
    
        
});
module.exports=Food=mongoose.model("Foods",FoodSchema);
