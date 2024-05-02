
const User=require('../model/usermodel')
const createToken=require('../utils/jwt')
const register=async(req,res)=>{
     try{
        console.log('mmmm')
        console.log(req.body)
       const {email,password,name}=req.body;
       console.log(email)

       if(!email || !password || !name){
        return res.status(400).json({
            message:"missing fields"
         })
       }

       const existingUser=await User.findOne({email})
       if(existingUser){
        return res.status(400).json({
            message:"email already registered"
         })
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
     }catch(error){
        res.status(400).json({
            message:error.message
        })
     }
    
  
}
const login=async(req,res)=>{
    console.log('entered in to login')
    try{
        const {email,password}=req.body
        if(!email || !password ){
            return res.status(400).json({
                message:"missing fields"
             })
           }
           const existingUser=await User.findOne({email})
           if(!existingUser){
            return res.status(400).json({
                message:"user does not exist"
            })
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
               
           }
    }catch(error){
        res.status(400).json({
            messaage:error.messaage
        })
    }



}
module.exports={
    register,login
}





