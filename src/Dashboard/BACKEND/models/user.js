const mongoose = require("mongoose");

// create schema - type declare

const userSchema = mongoose.Schema(
    {
        name:{type:String, require:true},
        email:{type:String, require:true,unique:true},
        password:{type:Number,require:true},
        moneyDonation:{type:Number,require:true,default:0},
        
    },
    {timeStamp:true}
);
module.exports = mongoose.model("ngoNewData",userSchema);