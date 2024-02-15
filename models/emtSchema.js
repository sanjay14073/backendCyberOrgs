const mongoose=require('mongoose')
const emtSchema=mongoose.Schema({
    "patient_id":{
        type:String,
        required:true,
    },
    "emt_id":{
        type:String,
        required:true,
    },
    "type_of_emergency":{
        type:String,
        required:true,
    },
    "triage":{
        type:String,
        required:true,
    },
    "description":{
        type:String,
        required:true,
    },
    "bp_level":{
        type:String,
        required:true,
    },
    "spO2":{
        type:String,
        required:true,
    },
    "pulse_rate":{
        type:String,
        required:true,
    },
    "isMLC":{
        type:Boolean,
        default:false,
    }
},{timestamp:true})
const emtFrom=mongoose.model("emtFrom",emtSchema);

module.exports=emtFrom