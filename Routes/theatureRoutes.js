
const express=require('express')
const {  getAllTheatures,
    addTheature,
    updateTheature,
    approveTheature,
    deleteTheature,
    getAllmyTheature,
    addShow,
    getAllMyShow,
    updateShow,
    getAllMovieShow}=require('../controller/theatureController')
    const {protect} =require('../middleware/globalErrorMiddleWare')
const theaturerouter=express.Router()

theaturerouter.delete('/:id',protect,deleteTheature)
theaturerouter.patch('/:id',protect,updateTheature)
theaturerouter.post('/',protect,addTheature)
theaturerouter.get('/mytheatures',protect,getAllmyTheature)
theaturerouter.get('/',protect,getAllTheatures)
theaturerouter.patch('/approvetheature/:id',protect,approveTheature)
theaturerouter.post('/shows',protect,addShow)
theaturerouter.get('/shows/theatureId',protect,getAllMyShow)
theaturerouter.get('/shows/movieId',protect,getAllMovieShow)
theaturerouter.patch('/shows/showId',protect,updateShow)


module.exports=theaturerouter