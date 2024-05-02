const mongoose=require('mongoose')


const schema=new mongoose.Schema({
    name:{
        type:String,
        require:[true,'name field is missing']
    },
    email:{
        type:String,
        require:[true,'email should be present'],
        unique:true,

    },
    password: {
        type: String,
        required: [true, 'Please enter a password.'],
        minlength: 8
    },
})

const User=mongoose.model('User',schema)

module.exports=User