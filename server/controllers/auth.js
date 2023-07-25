const User=require("../models/user");
const OTP=require('../models/OTP');
const otpGenerator=require('otp-generator');
const bcrypt=require('bcrypt');
const Profile=require("../models/profile");
const jwt=require('jsonwebtoken');
const mailSender=require('../utils/mailSender');
require('dotenv').config();

//send otp
exports.sendOTP=async (req,res)=>{
    try{
        const {email}=req.body;
        const checkUserPresent= await User.findOne({email});
        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                message:'user already exist'
            });
        }
        var otp=otpGenerator.generate(6,{
            lowerCaseAlphabets:false,
            upperCaseAlphabets:false,
            specialChars:false
        });
        console.log('otp generated ',otp);
        let result=await OTP.findOne({otp:otp});
        while(result){
            otp=otpGenerator.generate(6,{
            lowerCaseAlphabets:false,
            upperCaseAlphabets:false,
            specialChars:false
        });
        result= await OTP.findOne({otp:otp});
        }
        const otpPayload={email,otp};
        console.log(otpPayload);
        const otpBody=await OTP.create(otpPayload);
        console.log("otp body ",otpBody);
        return res.status(200).json({
            success:true,
            message:'otp sent successfully',
            otp
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

//signup
exports.signUp=async (req,res)=>{
    try{
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            otp
        }=req.body;
        if(!firstName || !lastName || !email || !password || !confirmPassword || !accountType || !otp){
                return res.status(403).json({
                    success:false,
                    message:'all fields are required'
                })
            }
        if(password!==confirmPassword){
            return res.status(400).json({
                success:false,
                message:'password and confirm password does not match'
            })
        }
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:'user already exists'
            })
        }
        const recentOTP=await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log(recentOTP);
        // console.log("hn bhai");
        if(recentOTP.length===0){
            return res.status(400).json({
                success:false,
                message:'OTP not found'
            })
        }else if(otp!==recentOTP[0].otp){
            return res.status(400).json({
                success:false,
                message:'invalid otp'
            })
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const profileDetails=await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null
        });
        const user=await User.create({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            accountType,
            additionalDetails:profileDetails._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        });
        return res.status(200).json({
            success:true,
            message:'user is registered successfully',
            user
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            messsage:'User cannot be registered. Please try again later.'
        })
    }
}

//login
exports.login=async (req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:'all fields required'
            })
        }
        const user=await User.findOne({email}).populate('additionalDetails');
        if(!user){
            return res.status(401).json({
                success:false,
                message:'user is not registered please sign up first'
            })
        }
        if(await bcrypt.compare(password,user.password)){
            const payload={
                email:user.email,
                id:user._id,
                accountType:user.accountType
            };
            const token=jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:'2h'
            });
            user.token=token;
            user.password=undefined;
            const options={
                expiresIn:Date(Date.now()+3*24*60*60*1000),
                httpOnly:true
            };
            return res.cookie('token',token,options).status(200).json({
                success:true,
                token,
                user,
                message:'logged in successfully'
            });
        }
        else{
            return res.status(401).json({
                success:false,
                message:'password is incorrect'
            })
        }
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'login failed please try again later'
        });
    }
}

//change password
exports.changePassword=async (req,res)=>{
    try{
        //get data from req body
    const userId=req.user.id;
    const userDetails=await User.findById(userId);
    //get oldPassword, newPassword, confirmNewPassowrd
    const {oldPassword,newPassword}=req.body;
    //validation
    const passwordMatch=await bcrypt.compare(oldPassword,userDetails.password);
    if(!passwordMatch){
        return res.status(401).json({
            success:false,
            message:'old passowrd does not match',

        })
    }
    // if(newPassword!==confirmNewPassword){
    //     return res.status(400).json({
    //         success:false,
    //         message:'new password does not match'
    //     })
    // }
    const encryptedPassword=await bcrypt.hash(newPassword,10);
    //update pwd in DB
    const updatedUserDetails=await User.findByIdAndUpdate(userDetails.id,{password:encryptedPassword},{new:true});
    try{
        const mailResponse=await mailSender(
            updatedUserDetails.email,
            "password change successful",
            `<h1>confirmation of email change</h1>`
        );
        console.log('eamail sent ',mailResponse.response);
    }catch(error){
        console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
    }
    return res.status(200).json({ success: true, message: "Password updated successfully" });
    //send mail - Password updated
    //return response
    // const {oldPassword,newPassword,confirmNewPassword}=req.body;
    }
    catch(error){
        console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
    }
}