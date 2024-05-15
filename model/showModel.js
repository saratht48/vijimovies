const mongoose=require('mongoose')

const schema=new mongoose.Schema({
   name:{
    type:String,
    required:[true,'show name is required']
   },
   movie:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie'
   },
   theature:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Theature'
   },
   date:{
    type:Date,
    required:[true,'show date is mandatory']
   },
   time:{
    type:String,
    required:[true,"show time is required"]
   },
   totalSeats:{
    type:Number,
    required:[true,'total seats is mandatory']
   },
   bookedSeats:{
    type:Number,
    default:0
   },
   ticketPrice : {
    type: Number,
    required: true
},

},{
    timestamps:true
})

const Show=mongoose.model('Show',schema)
module.exports=Show