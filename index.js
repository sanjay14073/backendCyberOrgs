const express=require('express')

const app=express();
const mongoose=require('mongoose')
const authController=require('./controllers/authControllers')
const doctorController=require('./controllers/doctorController')
const emtController=require('./controllers/emtController')
const insuranceController=require('./controllers/insuranceController')
const labtechinicianController=require('./controllers/labtechnicianController')
const hospitalController=require('./controllers/hospitalController')
const userController=require('./controllers/userController')
const cors=require('cors')
require('dotenv').config();
//Connect to the database
const db=mongoose.connect(`${process.env.MONGO_URL}`).then(()=>{console.log("successfully connected to mongo db")}).catch((err)=>{console.log(err)})

//All middleware instenaited
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(express.json())

//Targeting different routes
app.use('/user',userController)
app.use('/doctor',doctorController)
app.use('/emt',emtController)
app.use('/insurance',insuranceController)
app.use('/labtechinician',labtechinicianController)
app.use('/hospital',hospitalController)
const PORT=process.env.PORT||3000;
app.listen(PORT,(req,res)=>{
    console.log("Port started in port 3000")
})