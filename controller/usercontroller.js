
const User=require('../model/usermodel')
const CustomError = require('../utils/customError')
const createToken=require('../utils/jwt')


const assyncErrorHandler=(func)=>{
    return (req,res,next)=>{
        func(req,res,next).catch(err=>next(err))
    }
}
const register=assyncErrorHandler(async(req,res,next)=>{
        console.log('mmmm')
        console.log(req.body)
       const {email,password,name}=req.body;
       console.log(email)
       if(!email || !password || !name){
        const error=new CustomError('missing fields',400)
        next(error)
        // return res.status(400).json({
        //     message:"missing fields"
        //  })
       }
       const existingUser=await User.findOne({email})
       if(existingUser){

        const error=new CustomError('email already registered',400)
        next(error)

        // return res.status(400).json({
        //     message:"email already registered"
        //  })
       }
       const user=await User.create(
        req.body
       )
       const token=createToken({
        _id:user._id,
        name:user.name,
        email:user.email
       })
       if(user){
            res.status(201).json({
            data:{
                message:"created",
                user:{
                    name:user.name,
                    email:user.email,
                    _id:user._id,
                    accesstoken:token
                }

            }
           })
       }

    
  
})
const login=assyncErrorHandler(async(req,res,next)=>{
    console.log('entered in to login')
        const {email,password}=req.body
        if(!email || !password ){
            const error=new CustomError('missing fields',400)
            next(error)
           }
           const existingUser=await User.findOne({email})
           if(!existingUser){
            const error=new CustomError('user does not exist',400)
            next(error)
           }
           if(existingUser && existingUser.password===password){
            const token=createToken({
                _id:existingUser._id,
                name:existingUser.name,
                email:existingUser.email,
              
               })
    
               res.status(200).json({
                messaage:"successfull",
                accesstoken:token,
                _id:existingUser._id,
                name:existingUser.name,
                email:existingUser.email,
               })
               
           }else{
            const error=new CustomError('password mismatch',400)
            next(error)
           }




}
)
module.exports={
    register,login
}





