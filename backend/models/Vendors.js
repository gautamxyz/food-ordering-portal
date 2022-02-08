const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const VendorSchema = new Schema({
    manager_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contact_number: {
        type: String,
        required: true
    },
    shop_name: {
        type: String,
        required: true,
        unique:true
    },
    opening_time: {
        type: String,
        required: true
    },
    closing_time: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});  
module.exports=Vendor= mongoose.model("Vendors", VendorSchema);