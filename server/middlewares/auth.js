const User=require('../models/user');
const jwt=require('jsonwebtoken');
require('dotenv').config();

//auth
exports.auth=async (req,res,next)=>{
    try{
        // console.log(req.header("Authorization"))
        const token=req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");
        
        if(!token){
            return res.status(401).json({
                success:false,
                message:'token is missing'
            });
        }
        try{
            const decode=jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user=decode;
        }catch(error){
            return res.status(401).json({
                success:false,
                message:'token is invalid'
            })
        }
        next();
    }catch(error){
        console.log(error);
        return res.status(401).json({
            success:false,
            message:'something went wrong while checking token'
        })
    }
}

//is admin
exports.isAdmin=async (req,res,next)=>{
    try{
        if(req.user.accountType!=='Admin'){
            return res.status(401).json({
                success:false,
                message:'this is a protected route for admin only'
            })
        }
        next();
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'user role cannot be verified, please try again'
        })
    }
}

//is student
exports.isStudent=async (req,res,next)=>{
    try{
        if(req.user.accountType!=='Student'){
            return res.status(401).json({
                success:false,
                message:'this is a protected route for student only'
            })
        }
        next();
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'user role cannot be verified, please try again'
        })
    }
}

//is instructor
exports.isInstructor=async (req,res,next)=>{
    try{
        if(req.user.accountType!=='Instructor'){
            return res.status(401).json({
                success:false,
                message:'this is a protected route for instructor only'
            })
        }
        next();
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'user role cannot be verified, please try again'
        })
    }
}
