const Theature=require('../model/theatureModel')
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
     const id=req.user.id
     const theature=await Theature.create({...req.body,isApproved:false,user:id})
     if(theature){
        res.status(201).json({
            message:"successfull",
            data:theature
        })
     }
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



module.exports={
    getAllTheatures,
    addTheature,
    updateTheature,
    getAllmyTheature
}