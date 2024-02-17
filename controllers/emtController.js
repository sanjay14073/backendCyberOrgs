const router=require('express').Router()
const uuid=require('uuid')
const emtUser=require('../models/emtUserSchema')
const admin=require('../firebaseConfig')
router.post('/signup',async(req,res)=>{
    const {emt_name,emt_email,emt_phone_no}=req.body;
    try{
        let emtuser=emtUser()
        emtuser.emt_uuid=uuid()
        emtuser.emt_name=emt_name
        emtuser.emt_email=emt_email
        emtuser.emt_phone_no=emt_phone_no
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

        res.status(201).json({"message":"user created successfully","uuid":emtuser.emt_uuid})
    }catch(e){
        console.log(e)
        res.status(400).json({"message":"done","uid":emt_uuid})
    }
})

router.post('/addEMTRecord',async(req,res)=>{

})


module.exports=router;