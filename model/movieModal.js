const mongoose=require('mongoose')
const schema=new mongoose.Schema({
    name:{
        type:String,
        require:[true,'name field is missing']
    },
    description:{
        type:String,
        require:[true,'description should be present'],

    },
    duration: {
        type: Number,
        required: [true, 'duration should be present'],

    },
    language:{
        type:String,
        required:[true,'language is not mentioned']
    },
    releaseDate:{
      type:Date,
      required:[true,'Release Date is not mentioned']
    },
    image:{
        type:String,
        required:[true,'image is not mentioned']
    },
    genre:{
        type:String,
        required:[true,'should mention genre']
    }
})

const Movie=mongoose.model('Movie',schema)

module.exports=Movie