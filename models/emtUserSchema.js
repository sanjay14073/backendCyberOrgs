const mongoose=require('mongoose')
const emtUserSchema=mongoose.Schema({
    "emt_uuid":{
        type:String,
        required:true,
    },
    "emt_name":{
        type:String,
        required:true,
    },
    "emt_email":{
        type:String,
        required:true,
    },
    "emt_phone_no":{
        type:String,
        required:true,
    }
})
const emtUser=mongoose.model("emtUser",emtUserSchema)
module.exports=emtUser;