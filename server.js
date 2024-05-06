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
const movieRouter=require('./Routes/moviesRoutes')
const theaturerouter=require("./Routes/theatureRoutes")

connectDB()

const port=process.env.PORT || 6000
app.use('/api/v1/user/',router)
app.use('/api/v1/movies/',movieRouter)
app.use(globalErrorHandler)
app.use('/api/v1/theatures',theaturerouter)
app.listen(port,()=>{
    console.log(`server is listenning ${port}` )
})
//http://localhost:9000/api/v1/theatures