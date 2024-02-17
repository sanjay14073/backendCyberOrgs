const mongoose=require('mongoose')
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
    },
    "test_to_be_performed":{
        type:String,
    }
},{timestamps:true})
const VisitngSchema=mongoose.Schema({
    "patient_id":{
        type:String,
        required:true,
    },
    "hospital_id":{
        type:String,
        required:true,
    },
    "doctor_id":[{
        type:String,
        required:true,
    }],
    "techinician_id":{
        type:String,
        required:true,
    },
    "test_performed":[
        {
            type:String,
            required:true,
        }
    ],
    "test_reports":[PreviousRecordandReportsSchema],
    // "followup":{
    //     type:String,
    //     required:true,
    // },
    "disease_diagonosed":[DiseaseSchema],
    "medications":[MedicineSchema],
    "treatments":[TreatmentSchema],
    "case_active":{
        type:Boolean,
        default:true,
        required:true
    },
    "bills":[
        {
            type:String,
        }
    ],
    "prescriptions":[PrescriptionSchema]
})
const VisitngFrom=mongoose.model("VisitngForm",VisitngSchema);

module.exports=VisitngFrom;