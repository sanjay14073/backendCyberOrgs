const mongoose=require('mongoose')
const HosptialSchema=mongoose.Schema({
    "hospital_id":{
        type:String,
        required:true,
        unique:true,
    },
    "hospital_name":{
        type:String,
        required:true,
    },
    "location":{
        type:String,
        required:true,
    },
    "hospital_email":{
        type:String,
        required:true,
    }
},{ timestamps: true });
const Hospital=mongoose.model("Hospital",HosptialSchema);
module.exports=Hospital;
