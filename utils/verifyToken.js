const jwt=require("jsonwebtoken");
const { createError } = require("../utils/error");

const verifyToken=(req,res,next)=>{
    const token=req.cookies.access_token;
    if(!token){
        return next(createError(401,"You are not authenticated"))
    }

    jwt.verify(token,process.env.JWT_SEC,(err,user)=>{
        if(err){
            return next(createError(403,"Token not valid"))
        }
        req.user=user;
        next();
    })
}


const verifyUser=(req,res,next)=>{
    verifyToken(req,res,()=>{
       if(req.user.id===req.params.id||req.user.isAdmin){
           next();
       }else{
          return next(createError(403,"You are not authenticated"))
       }
    });
};


const verifyAdmin=(req,res,next)=>{
    verifyToken(req,res,()=>{
       if(req.user.isAdmin){
           next();
       }else{
          //res.status(403).json("You are not allowed to do that");
          return next(createError(403,"You are not allowed to do that"))
       }
    });
};

module.exports={verifyToken,verifyUser,verifyAdmin}