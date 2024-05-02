const express=require('express')
const {editMovie,addMovies, getAllMovies,
    getMovie}=require('../controller/moviesController')
const movieRouter=express.Router()

movieRouter.post('/',addMovies)
movieRouter.patch('/:id',editMovie)
movieRouter.get('/:id',getMovie)
movieRouter.get('/',getAllMovies)

module.exports=movieRouter