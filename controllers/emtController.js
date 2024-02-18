const router=require('express').Router()
const {uuid}=require('uuidv4')
const emtUser=require('../models/emtUserSchema')
const admin=require('../firebaseConfig')
const Hospital=require('../models/hospitalsSchema')
router.post('/signup',async(req,res)=>{
    const {emt_name,emt_email,emt_phone_no,hospital_id}=req.body;
    try{
        let emtuser=emtUser()
       let smuid=uuid()
        emtuser.emt_uuid=smuid;
        emtuser.emt_name=emt_name
        emtuser.emt_email=emt_email
        emtuser.emt_phone_no=emt_phone_no
        emtuser.hospital_id=hospital_id;
        let response=await Hospital.find({hospital_id})
        if(!response){
            res.status(400).json({"message":"hospital id not found"})
            return;
        }
        const userCredential=await admin.auth().createUser({
            uid:emtuser.emt_uuid,
            password:emtuser.emt_phone_no,
            displayName:emt_name,
            email:emt_email
        })
        if(userCredential){
            console.log("user created")
        }else{
            res.status(400).json({"message":"Someting went wrong while firebase creation"})
        }

        res.status(201).json({"message":"user created successfully","uid":emtuser.emt_uuid})
    }catch(e){
        console.log(e)
        res.status(400).json({"message":"done"})
    }
})

// router.post('/addEMTRecord',async(req,res)=>{

// })


module.exports=router;