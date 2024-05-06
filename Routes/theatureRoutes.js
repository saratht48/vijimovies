
const express=require('express')
const {  getAllTheatures,
    addTheature,
    updateTheature,
    getAllmyTheature}=require('../controller/theatureController')
    const {protect} =require('../middleware/globalErrorMiddleWare')
const theaturerouter=express.Router()

theaturerouter.patch('/:id',protect,updateTheature)
theaturerouter.post('/',protect,addTheature)
theaturerouter.get('/mytheatures',protect,getAllmyTheature)
theaturerouter.get('/',protect,getAllTheatures)

module.exports=theaturerouter