const User=require('../models/user');
const mailSender=require('../utils/mailSender');
const bcrypt=require('bcrypt');
const crypto=require('crypto');
const {passwordUpdated}=require('../mail/template/passwordUpdate');
//resetPasswordToken
exports.resetPasswordToken=async (req,res)=>{
    try{
        const email=req.body.email;
        const user=await User.findOne({email:email});
        if(!user){
            return res.json({
                success:false,
                message:'your mail is not registered with us'
            });
        }
        const token = crypto.randomBytes(20).toString("hex");
        const updatedDetails=await User.findOneAndUpdate(
            {email:email},
            {
                token:token,
                resetPasswordExpires:Date.now()+5*60*1000
            },
            {new:true}
        );
        console.log("updatedDetails ",updatedDetails);
        const url=`http://localhost:3000/update-password/${token}`;
        await mailSender(
            email,
            'Password Reset Link',
            `Password reset Link ${url}`
        );
        return res.json({
            success:true,
            message:'email sent successfully please check mail'
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'something went wrong wile sending reset link'
        })
    }
}

//resetPassword
exports.resetPassword=async (req,res)=>{
    try{
        const {password,confirmPassword,token}=req.body;
        if(password!==confirmPassword){
            return res.json({
                success:false,
                message:'password is not matching'
            });
        }
        const userDetails=await User.findOne({token:token});
        if(!userDetails){
            return res.json({
                success:false,
                message:'token is invalid'
            });
        }
        if(userDetails.resetPasswordExpires<Date.now()){
            return res.json({
                success:false,
                message:'token is expired please regenerate'
            });
        }
        const hashedPassword=await bcrypt.hash(password,10);
        await User.findOneAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true}
        );
        await mailSender(
            userDetails.email,
            "Password Update",
            passwordUpdated(userDetails.email,userDetails.firstName)
        )
        return res.status(200).json({
            success:true,
            message:'password reset success'
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'something went wrong while password reset'
        })
    }
}