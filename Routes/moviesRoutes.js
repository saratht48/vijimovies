const express=require('express')
const {editMovie,addMovies, getAllMovies,deleteMovie,
    getMovie}=require('../controller/moviesController')
    const {protect} =require('../middleware/globalErrorMiddleWare')
const movieRouter=express.Router()

movieRouter.post('/',protect,addMovies)
movieRouter.patch('/:id',protect,editMovie)
movieRouter.get('/:id',protect,getMovie)
movieRouter.get('/',protect,getAllMovies)
movieRouter.delete('/:id',protect,deleteMovie)


module.exports=movieRouter