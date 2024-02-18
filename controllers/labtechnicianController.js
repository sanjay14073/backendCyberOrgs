const {uuid}=require('uuidv4')
const router=require('express').Router()
const Technican=require('../models/technicianSchema')
const Hospital=require('../models/hospitalsSchema')
const {getAuth, EmailAuthProvider, reauthenticateWithCredential, signInWithCredential,signInWithEmailAndPassword}=require('firebase/auth');
const {initializeApp}=require("firebase/app");
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const firebaseConfig=require('../firebaseConfig')

const admin=require('../firebaseConfig');
const User = require('../models/authSchema');

router.post('/signup',async(req,res)=>{
    const {hospital_id,name,age,sex}=req.body;
    try{
        let hospital=await Hospital.findOne({hospital_id});
        if(!hospital){
           res.status(401).json({"message":"Hospital id is not valid"})

        }else{
            try{
            const techinican_id=uuid();
            let techinican=Technican()
            techinican.hospital_id=hospital_id;
            techinican.name=name;
            techinican.age=age;
            techinican.sex=sex;
            techinican.techinican_id=techinican_id;
            techinican.techician_email= `${name}techinician@uhs.ac.in`;
            try{
                const userCredential=await admin.auth().createUser({
                    uid:techinican_id,
                    password:techinican_id+name,
                    displayName:name,
                    email:`${name}techinician@uhs.ac.in`
                })
                if(userCredential){
                    console.log("user created")
                }else{
                    res.status(400).json({"message":"Someting went wrong while firebase creation"})
                }
                //techinican.email=

                await techinican.save();
                res.status(201).json({"message":"successfully created","uid":techinican_id})
               
            }catch(e){
                console.log(e);
                res.status(400).json({"message":"Some internal error has occured"})
            }
            
            //res.status(201).json({"message":"User created successfully"})
            }catch(e){
                console.log(e);
                res.status(400).json({"message":"Some internal error has occured"})
            }
        }

    }catch(e){
        console.log(e);
        res.status(400).json({"message":"Some internal error has occured"})
    }

})
// router.post('/login',async(req,res)=>{

// })
//this is not required
router.get('/fetchDetails/:id',async(req,res)=>{
    let techinican_id=req.params.id;
    try{
        let technician=await Technican.findOne(techinican_id)
        res.status(201).json(technician)
    }catch(e){
        console.log(e);
        res.status(400),json({"message":"Something went wrong"})
    }
})

//Just use this route to fetch all the records of the
router.post('/uploadTestReport/:id',async(req,res)=>{
  let {uuid,lab_reports}=req.body;
  let response=await User.findOne({uuid})
  if(response){
    console.log(response['lab_reports'])
    response['lab_reports'].push(lab_reports)
    console.log(response['lab_reports'])
    await response.save()
    res.status(201).json({"message":"success"})
  }else{
    res.status(400).json({"message":"Something went wrong"})
  }
})


module.exports=router;