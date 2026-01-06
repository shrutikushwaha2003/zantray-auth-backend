import mongoose from "mongoose";

const bannerSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    subtitle:{
        type:String
    },
    image:{
        type:String,
        require:true
    },
    isActive:{
        type:Boolean,
        default:true
    },
    order:{
        type:Number,
        default:0
    }
    
},
{
        timestamps:true
    }
)