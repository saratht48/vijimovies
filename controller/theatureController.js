const Show = require('../model/showModel')
const Theature=require('../model/theatureModel')
const { findByIdAndUpdate, findByIdAndDelete } = require('../model/usermodel')
const CustomError=require('../utils/customError')
const assyncErrorHandler=(func)=>{
    return (req,res,next)=>{
        func(req,res,next).catch(err=>next(err))
    }
}
const getAllTheatures=assyncErrorHandler(async(req,res,next)=>{
  const theartures= await Theature.find()
 res.status(200).json({
    message:"sucessfull",
    data:theartures
 })
})

const getAllmyTheature=assyncErrorHandler(async(req,res)=>{
       const id=req.user._id
       console.log(id,'llllll')
       console.log('id'+id)
       const theatures=await Theature.find({user:id})
       res.status(200).json({
          message:"successfull",
          data:theatures
       })
})

const addTheature=assyncErrorHandler(async(req,res)=>{
     const id=req.user._id
     const theature=await Theature.create({...req.body,isApproved:false,user:id})
     if(theature){
        res.status(201).json({
            message:"successfull",
            data:theature
        })
     }
})
const deleteTheature=assyncErrorHandler(async(req,res)=>{
     const theatureId=req.params.id
     const deletedTheature=await Theature.findByIdAndDelete(theatureId)
     res.status(200).json({
        status:"successfull",
        message:deletedTheature
     })


})

const updateTheature=assyncErrorHandler(async(req,res)=>{
    const id=req.params.id;
    const updatedTheature = await Theature.findByIdAndUpdate(id,req.body,{ new: true });
    if(updatedTheature){
        res.status(200).json({
            message:"sucessfull",
            data:updatedTheature
        })
    }

})
const approveTheature=assyncErrorHandler(async(req,res,next)=>{
  console.log(req.user.isAdmin)
  const id=req.params.id
  console.log(req.user)
  if(req.user.isAdmin){
    const updatedTheature=await Theature.findByIdAndUpdate(id,{
        isApproved:true
    },{
        new:true
    })
    re.status(200).json({
        status:"successfull",
        data:updatedTheature 
    })
  }
  else{
    const error =new CustomError("you are not admin to perform this action",400)
    next(error)
  }
})

const addShow=assyncErrorHandler(async(req,res,next)=>{
       const {theature,movie,name,date,time,totalSeats,ticketPrice}=req.body

     if(!theature || !movie || !name || !date || !time || !totalSeats || !ticketPrice){
        const error=new CustomError('complete all the fields',400)
        next(error)
     }
          const theatureId=req.body.theature;
          const newtheature=await Theature.findOne({_id:theatureId})
          if(newtheature.user.toString()!==req.user._id.toString()){
            const error=new CustomError('you dont have permission to perform this action',400)
            next(error)
          }
          const show=await Show.create(
            req.body
          ) 
          if(show){
            res.status(201).json({
                    status: 'success',
                    data: show
            })
          }else{
            const error=new CustomError('show not created',400)
            next(error)
          }

})

const getAllMyShow=assyncErrorHandler(async(req,res,next)=>{

      console.log('getAllMyShow')
        const theatureId=req.params.theatureId;

        const theature=await Theature.findOne({_id:theatureId})
        if(theature.user.toString()!==req.user._id.toString()){
            const error=new CustomError('you dont have permission to perform this action',400)
            next(error)
        }
        const  shows=await Show.find({theature:theatureId})
        res.status(200).json({
            status: 'success',
            data: shows
})
})
const getAllMovieShow=assyncErrorHandler(async(req,res)=>{
            const movieId=req.params.movieId
            console.log(movieId,'gggggggggggggg')
            const shows=await Show.find({movie:movieId})
            res.status(200).json({
                  sstatus: 'success',
                  data: shows
            })
})

const updateShow=assyncErrorHandler(async(req,res)=>{
    const showId=req.params.showId
    const show=await Show.findByIdAndUpdate(showId,req.body,{new:true})
    res.status(200).json({
        status:"updated",
        data:show
    })
})


//66437da31fe6f05e24a10fde
module.exports={
    deleteTheature,
    getAllTheatures,
    addTheature,
    updateTheature,
    getAllmyTheature,
    approveTheature,
    addShow,
    getAllMyShow,
    getAllMovieShow,
    updateShow
}

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjQ0ZTlmOGEyZmNlNjg0NGYwODRkOWIiLCJuYW1lIjoicmFtdSIsImVtYWlsIjoicmFtdUBnbWFpbC5jb20iLCJpYXQiOjE3MTU3OTIzNzYsImV4cCI6MTcxNTc5NTk3Nn0.3oml7ohwkLOX6nbsWiMpMfSzz_TgHeIl2nRCz1O-pbw
//6644eb1f56dd725673e76c95-thaeature
//6644e9f8a2fce6844f084d9b