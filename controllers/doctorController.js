const router=require('express').Router()
const {getAuth, EmailAuthProvider, reauthenticateWithCredential, signInWithCredential,signInWithEmailAndPassword}=require('firebase/auth');
const {initializeApp}=require("firebase/app");
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const firebaseConfig=require('../firebaseConfig')
const {uuid}=require('uuidv4')
const admin=require('../firebaseConfig')
const Doctor=require('../models/doctorSchema')
const VistingFrom=require('../models/visitingSchema')
router.post('/signup',async(req,res)=>{
    const {hospital_id,doctor_name,age,sex,speciality,department}=req.body;
    try{
        let doctor=new Doctor()
        doctor.doctor_id=uuid()
        doctor.hospital_id=hospital_id
        doctor.doctor_name=doctor_name,
        doctor.age=age
        doctor.sex=sex;
        doctor.speciality=speciality;
        doctor.department=department;
        doctor.doctor_email=`${doctor_name+speciality+department}@uhs.ac.in`
        const userCredential=await admin.auth().createUser({
            uid:doctor.doctor_id,
            password:doctor_name+doctor.doctor_id,
            displayName:doctor_name,
            email:`${doctor_name+speciality+department}@uhs.ac.in`
        })
        if(userCredential){
            console.log("user created")
        }else{
            res.status(400).json({"message":"Someting went wrong while firebase creation"})
        }
        await doctor.save()
        res.status(201).json({"message":"user created","uid":doctor.doctor_id})
    }catch(e){
        console.log(e)
        res.status(400).json({"message":"something went wrong"})
    }
})
// router.post('/createRecord',async(req,res)=>{
   
//     const {patient_id,doctor_id}=req.body;
//     let response=await Doctor.findOne({doctor_id})
//     if(!response){
//         let form=VistingFrom()
//         form.patient_id=patient_id;

//     }
// })
router.get('/vistingRecords',async(req,res)=>{
    let {doctor_id}=req.body;
    let response=await VistingFrom.find({doctor_id}) 
    res.status(201).json(response)
})
router.post('/addVisitingRecord',async(req,res)=>{
    let {doctor_id,patient_id,}=req.body

})


module.exports=router;