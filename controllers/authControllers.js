const router=require('express').Router()
const mongoose=require('mongoose')
const User=require('../models/authSchema')
const bcrypt=require('bcrypt')
const jwt=require("jsonwebtoken")
const nodemailer=require('nodemailer')
router.get('/',(req,res)=>{
    res.json({"msg":"u landed at home page"})
})
router.post('/signup',async(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    const user_name=req.body.user_name;
    const phone_no=req.body.phone_no;
    try{
        let newUser=new User();
        newUser.email=email;
        newUser.user_name=user_name;
        newUser.phone_no=phone_no;
        //Hash the password
        //number of rounds aes standard is 10 des id 16(crypto ;)))
        //10 perffered here
        const saltrounds=10;
        let rounds=await bcrypt.genSalt(saltrounds);
        let hashedpass=await bcrypt.hash(password,rounds);
        newUser.password=hashedpass;
        await newUser.save();
        res.status(201).json({"massage":"You can now login"})
    }catch(e){
        //during development
        console.log(e)

        res.status(404).json({"message":"Someting went wrong"})
    }
})
router.post('/login',async(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    try{
        const user=await User.findOne({email});
        if(!user){
            res.status(401).json({"message":"user not found"});
            return;
        }
        //console.log(user)
        if(await bcrypt.compare(password,user.password)){
            let token=jwt.sign({email,password},process.env.JWT_SECRET)
            res.status(201).json({"message":"user signed in","user":{email},"token":token});
        }else{
            res.status(403).json({"message":"wrong password"});
        }
    }catch(e){
        console.log(e)
        res.status(404).json({"message":"Someting went wrong"});
    }
})
//not used normal middleware another option also stroing ok token in flutter shared prefs rather that authorisation bearers
router.post('/check',(req,res)=>{
    const authorizationHeader = req.headers['authorization'];

    if (!authorizationHeader) {
      return res.status(403).json({ "message": "Authorization header missing" });
    }
  
    const token = authorizationHeader.split(' ')[1];
    
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      res.status(201).json({ "message": "Token matched", "decodedToken": decodedToken });
    } catch (e) {
      res.status(403).json({ "message": "Unauthorized request, redirect to login" });
    }
});
  

//setup for forgot password 
//nodemailer setup
// const transporter = nodemailer.createTransport({
//     host: "smtp.forwardemail.net",
//     port: 465,
//     secure: true,
//     auth: {
//       // TODO: replace `user` and `pass` values from <https://forwardemail.net>
//       user: "REPLACE-WITH-YOUR-ALIAS@YOURDOMAIN.COM",
//       pass: "REPLACE-WITH-YOUR-GENERATED-PASSWORD",
//     },
//   });
// router.post('/forgotpassword',async(req,res)=>{
//     const email=req.body.email;
//     const info = await transporter.sendMail({
//         from: '"Fred Foo 👻" <foo@example.com>', // sender address
//         to: "bar@example.com, baz@example.com", // list of receivers
//         subject: "Hello ✔", // Subject line
//         text: "Hello world?", // plain text body
//         html: "<b>Hello world?</b>", // html body
//       });
    
//       console.log("Message sent: %s", info.messageId);
// })

//check authorisation and allow user to change password
router.post('/resetpassword', async (req, res) => {
    const authorizationHeader = req.headers['authorization'];
    console.log(process.env.JWT_SECRET);
  
    if (!authorizationHeader) {
      return res.status(403).json({ "message": "Authorization header missing" });
    }
  
    const token = authorizationHeader.split(' ')[1];
    const { email, password, newpassword } = req.body;
  
    if (!email || !password || !newpassword) {
      return res.status(400).json({ "message": "Required fields are missing" });
    }
  
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ "message": "User not found" });
      }
  
      if (await bcrypt.compare(password, user.password)) {
        const saltrounds = 10;
        let rounds = await bcrypt.genSalt(saltrounds);
        let hashedpass = await bcrypt.hash(newpassword, rounds);
        user.password = hashedpass;
        await user.save();
        return res.status(201).json({ "message": "Password changed successfully" });
      } else {
        return res.status(403).json({ "message": "Wrong password" });
      }
    } catch (e) {
      return res.status(403).json({ "message": "Unauthorized request, redirect to login" });
    }
  });
  

module.exports=router;