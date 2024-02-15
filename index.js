const express=require('express')

const app=express();
const mongoose=require('mongoose')
const authController=require('./controllers/authControllers')
const doctorController=require('./controllers/doctorController')
const emtController=require('./controllers/emtController')
const insuranceController=require('./controllers/insuranceController')
const labtechinicianController=require('./controllers/labtechinicianController')
require('dotenv').config();
//Connect to the database
const db=mongoose.connect(`${process.env.MONGO_URL}`).then(()=>{console.log("successfully connected to mongo db")}).catch((err)=>{console.log(err)})

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/user',authController)
app.use('/doctor',doctorController)
app.use('/emt',emtController)
app.use('/insurance',insuranceController)
app.use('/labtechinicianController',labtechinicianController)

const PORT=process.env.PORT||3000;
app.listen(PORT,(req,res)=>{
    console.log("Port started in port 3000")
})