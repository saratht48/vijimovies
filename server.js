const express=require('express')
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const app=express();
const {globalErrorHandler}=require('./middleware/globalErrorMiddleWare')
// app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({extended:false}))// to access request body
app.use(express.static('./public'))

// const bodyParser = require('body-parser');
const {connectDB}=require('./config/db')
const router=require('./Routes/userRoutes')

connectDB()

const port=process.env.PORT || 6000
app.get('/',(req,res)=>{
    console.log('request is accepted')
    res.status(200).send('hi every one')
})
app.use('/api/v1/user/',router)
app.use(globalErrorHandler)
app.listen(port,()=>{
    console.log(`server is listenning ${port}` )
})