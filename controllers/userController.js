const router=require('express').Router()
const User=require('../models/authSchema')
router.post('/register',async(req,res)=>{
    const {hospital_id,techinican}=req.body;

})

//Check route
router.get('/',(req,res)=>{
    res.status(201).json({"message":"Connected successfully check route"})
})
router.get('/getUserDetails/:id',async(req,res)=>{
    const uuid=req.params.id;
    try{
    const user=await User.findOne({uuid})
    res.status(201).json(user)
    }catch(e){
        console.log(e);
    }
    
})

module.exports=router;