const {getAuth, EmailAuthProvider, reauthenticateWithCredential, signInWithCredential,signInWithEmailAndPassword}=require('firebase/auth');
const {initializeApp}=require("firebase/app");
const firebaseConfig=require('../firebaseConfig')
// Initialize Firebase
// const appf = initializeApp(firebaseConfig);
// const authi = getAuth(appf);
// var admin = require("firebase-admin");
  
// var serviceAccount = require('../secretAccountKey.json');
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });
var admin=require('../firebaseConfig')
const router=require("express").Router()
const Hospital=require('../models/hospitalsSchema')
const Technican=require('../models/technicianSchema')
const Doctor=require('../models/doctorSchema')
const {uuid}=require('uuidv4')
router.post('/signup',async(req,res)=>{
    const {hospital_name,location}=req.body;
    const hospital_id=uuid();
    try{    
        let H=new Hospital();
        H.hospital_name=hospital_name;
        H.hospital_id=hospital_id;
        H.location=location;
        H.hospital_email=`${hospital_name}@uhs.ac.in`
        //console.log(`${hospital_name}@gmail.com`)
        const userCredential=await admin.auth().createUser({
            uid:hospital_id,
            password:hospital_name+location,
            displayName:hospital_name,
            email:`${hospital_name}@uhs.ac.in`
        })
        if(userCredential){
            console.log("user created")
        }
        await H.save();
        res.status(201).json({"message":"successfully created"})
    }catch(e){
        console.log(e)
    }
})
router.get('/getDoctorsandTechnicians/:id',async(req,res)=>{
    let hospital_id=req.params.id;
    let doctors=await Doctor.find({hospital_id})
    let techinican=await Technican.find({hospital_id})
    res.status(201).send({"Doctors":doctors,"Techinican":techinican})
})

module.exports=router;