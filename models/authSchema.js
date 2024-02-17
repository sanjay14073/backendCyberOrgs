const mongoose=require('mongoose')
const HealthSchema=mongoose.Schema({
    "scheme_name":{
        type:String,
        required:true,
    },
    "id":{
        type:String,
        required:true,
    }
})
const MedicineSchema=mongoose.Schema({
    "name":{
        type:String,
        required:true,
    },
    "dosage":{
        type:String,
        required:true,
    }
})
const DiseaseSchema=mongoose.Schema({
    "disease_name":{
        type:String,
        required:true,
    },
    "severity":{
        type:String,
        required:true,
    },
    "medicines":[MedicineSchema],
})
const HistorySchema=mongoose.Schema({
    "disease_name":{
        type:String,
        required:true,
    },
    "doctor_name":{
        type:String,
        required:true,
    },
    "medications":[MedicineSchema],
})
const TreatmentSchema=mongoose.Schema({
    "treatments":{
        type:String,
        required:true,
    },
    "no_of_days":{
        type:Number,
        required:true,
    }
})
const AllergiesSchema=mongoose.Schema({
    "allergy_name":{
        type:String,
        required:true,
    },
    "severity":{
        type:String,
        required:true,
    }
})
const EmergencyDetailsSchema=mongoose.Schema({
    "emergency_contact_name":{
        type:String,
        required:true
    },
    "emergency_phone_no":{
        type:String,
        required:true,
    },
})
const PrescriptionSchema=mongoose.Schema({
    "prescription_id":{
        type:String,
        unique:true,
    },
    "health_issue":{
        type:String,
        required:true,
    },
    "suspected_disease":{
        type:[DiseaseSchema],
    },
    "treatement_required":{
        type:[TreatmentSchema],
        required:true,
    },
    "follow_up":{
        type:String,
        required:true,
    },
    "medicines":{
        type:[MedicineSchema],
        required:true,
    },
    "doctor_id":{
        type:String,
        required:true,
    }
},{timestamps:true})
const PreviousRecordandReportsSchema=mongoose.Schema({
    "path":{
        type:String,
        required:true,
    },
    "added_date":{
        type:Date,
        required:true,
    }
})
const LabreportSchema=mongoose.Schema({
    "completed":{
        type:Boolean,
        required:true,
        default:false,
    },
    "type_of_test":{
        type:String,
        required:true,
    },
    "date_of_test":{
        type:Date,
        required:true,
    },
    "sub_test_reports":[PreviousRecordandReportsSchema],
    "doctor_id":{
        type:String,
        required:true,
    },
    "techinican_id":{
        type:String,
    }
})

const UserSchema=mongoose.Schema({
    "uuid":{
        type:String,
        required:true,
        unique:true
    },
    // "password":{
    //     type:String,
    //     required:true
    // },
    "profile_image":{
        type:String,
    },
    "user_name":{
        type:String,
        required:true
    },
    "age":{
        type:Number,
        required:true,
    },
    "sex":{
        type:String,
        required:true,
    },
    "phone_no":{
        type:String,
        required:true
    },
    "email":{
        type:String,
        required:true,
    },
    "emergency_details":[EmergencyDetailsSchema],
    "address":{
        type:String,
        required:true,
    },
    "aadhar_no":{
        type:Number,
        required:true,
        unique:true,
    },
    "bpl_no":{
        type:Number,
    },
    "health_scheme_data":[HealthSchema],
    "insurance_policy_no":{
        type:String,
    },
    "medical_diseases":[DiseaseSchema],
    "past_history":[HistorySchema],
    "treatments_history":[TreatmentSchema],
    "allergies":[AllergiesSchema],
    "prescriptions":[PrescriptionSchema],
    "lab_reports":[LabreportSchema],
})

const User=mongoose.model("User",UserSchema);
module.exports=User;