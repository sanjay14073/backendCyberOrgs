const mongoose=require('mongoose')
const DoctorSchema=mongoose.Schema({
    "doctor_id":{
        type:String,
        required:true,
        unique:true,
    },
    "hospital_id":{
        type:String,
        required:true,
        unique:true,
    },
    "doctor_name":{
        type:String,
    },
    "age":{
        type:Number,
        required:true,
    },
    "sex":{
        type:String,
        required:true,
    },
    "speciality":{
        type:String,
        required:true,
    },
    "department":{
        type:String,
        required:true,
    }
})
const Doctor=mongoose.model("Doctor",DoctorSchema);
module.exports=Doctor;