const {uuid}=require('uuidv4')
const router=require('express').Router()
const {getAuth, EmailAuthProvider, reauthenticateWithCredential, signInWithCredential,signInWithEmailAndPassword}=require('firebase/auth');
const {initializeApp}=require("firebase/app");
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const firebaseConfig=require('../firebaseConfig')
const admin=require('../firebaseConfig')
const Insurance=require('../models/insuranceSchema')
const User=require('../models/authSchema')
router.post('/signup',async(req,res)=>{
    const {insurance_policy_no,patient_uuid,profile_image,user_name,age,sex,phone_no,email,nominee_details,address,aadhar_no,
        sum_assured,
        number_of_premiums,
        name_of_policy
    }=req.body;
    try{
        const insurance_uuid=uuid();
        try{
            let insurance=new Insurance()
            insurance.insurance_uuid=insurance_uuid
            insurance.insurance_policy_no=insurance_policy_no
            let uuid=patient_uuid;
            let user=await User.findOne({uuid})
            //console.log(user)
            if(!user){
                res.status(401).json({"message":"invalid patient id"});
                return;
            }
            insurance.patient_uuid=patient_uuid
            insurance.profile_image=profile_image,
            insurance.user_name=user_name,
            insurance.age=age,
            insurance.sex=sex,
            insurance.phone_no=phone_no,
            insurance.email=email,
            insurance.nominee_details=nominee_details,
            insurance.address=address,
            insurance.aadhar_no=aadhar_no,
            insurance.sum_assured=sum_assured,
            insurance.number_of_premiums=number_of_premiums,
            insurance.name_of_policy=name_of_policy
            await insurance.save()
            res.status(201).json({"message":"user created"})

        }catch(e){
            console.log(e)
            res.status(400).json({"message":"Someting went wrong while firebase creation"})
        }
    }catch(e){
        console.log(e)
        res.status(400).json({"message":"something went wrong"})
    }
})
router.get('/:id',async(req,res)=>{
    const insurance_uuid=req.params.id;
    let responses=await Insurance.find({insurance_uuid})
    res.status(201).json(responses)
})

module.exports=router;