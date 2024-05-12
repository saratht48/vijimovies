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
       const id=req.user.id
       console.log('id'+id)
       const theatures=await Theature.find({_id:id})
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
     const deletedTheature=await findByIdAndDelete(theatureId)
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
  if(req.user.isAdmin){
    const updatedTheature=await findByIdAndUpdate(id,{
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
    const error =new CustomError("you are not admin to perform this action")
    next(error)
  }
  
})





module.exports={
    deleteTheature,
    getAllTheatures,
    addTheature,
    updateTheature,
    getAllmyTheature,
    approveTheature
}