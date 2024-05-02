const jwt = require('jsonwebtoken');
const CustomError = require('../utils/customError')

exports.globalErrorHandler=(error,req,res,next)=>{
    error.statusCode=error.statusCode || 500
    error.status=error.status || "error"
    res.status(error.statusCode).json({
        status:error.status,
        message:error.message
    })

}

exports.protect=async(req,res,next)=>{
    try{
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer') ){
            const token=req.headers.authorization.split(" ")[1]
            if(token){
                const user = await jwt.verify(token, process.env.SECRET);
                req.user=user
                console.log('authentication is sucessfull',user)
                next()
            }else{
                const error=new CustomError('token is not present',403)
                 next(error)
            }
         
        }else{
          const error=new CustomError('token is not present',403)
          next(error)
        }

    }catch(error){
        res.status(403).json({
            message:"acess denied"
        })
    }

}