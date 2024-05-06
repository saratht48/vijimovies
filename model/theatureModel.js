const mongoose=require('mongoose')
const User=require('./usermodel')
const schema=new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name:{
        type:String,
        require:[true,'name field is missing']
    },
    address:{
        type:String,
        require:[true,'address should be present'],

    },
    phonenumber: {
        type: Number,
        required: [true, 'phonenumber should be present'],

    },
    email:{
        type:String,
        required:[true,'email is not mentioned']
    },
    isApproved:{
      type:Boolean,
      default:false
    }
})

const Theature=mongoose.model('Theature',schema)

module.exports=Theature