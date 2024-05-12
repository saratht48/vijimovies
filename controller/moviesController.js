const Movie=require('../model/movieModal')
const Show=require("../model/showModel")
const CustomError = require('../utils/customError')
const assyncErrorHandler=(func)=>{
    return (req,res,next)=>{
        func(req,res,next).catch(err=>next(err))
    }
}
const addMovies=assyncErrorHandler(
    async(req,res,next)=>{
        
        const movie=await Movie.create(req.body)
        if(movie){
            res.status(201).json({
                message:"sucessfull",
                data:movie
            })
        }
            
    }
)

const getAllMovies=assyncErrorHandler(async(req,res)=>{
   
    const movies=await Movie.find()
    if(movies){
        res.status(200).json({
            data:{
                movies
            }
        })
    }
})
const getMovie=assyncErrorHandler(async(req,res,next)=>{
    const id=req.params.id
    const movie=await Movie.findById(id)
    if(movie){
        res.status(200).json({
            data:{
                movie
            }
        })
    }else{
        const error=new CustomError('movie with this id is not found',404)
        next(error)
    }
})
const editMovie=assyncErrorHandler(
    async(req,res,next)=>{
        const id=req.params.id
        const updatedMovie = await Movie.findByIdAndUpdate(id,req.body,{ new: true });
        if(updatedMovie){
            res.status(200).json({
                message:"sucessfull",
                data:updatedMovie
            })
        }
    }
)

const deleteMovie=assyncErrorHandler(async(req,res)=>{
    const movieId=req.params.id
    const deletedMovie=await Movie.findByIdAndDelete(movieId)
    res.status(200).json({
       status:"successfull",
       message:deletedMovie
    })


})


const getMyTheatureShow=assyncErrorHandler(async(req,res)=>{
  const theatureId=req.params.theatureId
  const shows=await Show.find({
    theature:theatureId
  })
  res.status(200).json({
    status:"successfull",
    data:shows
  })
})

const addShow=assyncErrorHandler(async(req,res,next)=>{
    if(!req.body.theature || !req.body.movie){
        const error=new CustomError('please mention movie and theature id')
        next(error)

    }
   newShow=await Show.create(req.body)
})
module.exports={
    editMovie,
    addMovies,
    getAllMovies,
    getMovie,
    deleteMovie,
    getMyTheatureShow

}