const Movie=require('../model/movieModal')
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
module.exports={
    editMovie,
    addMovies,
    getAllMovies,
    getMovie

}