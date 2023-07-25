const mongoose=require('mongoose');
const mailSender = require('../utils/mailSender');
const otpTemplate=require("../mail/template/emailVerificationTemplate");
const OTPModel=new mongoose.Schema({
     email:{
        type:String
     },
     otp:{
        type:String,
        required:true
     },
     createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60
     }
});
//for sending mails
async function sendVerificationMail(email,otp){
    try{
        const mailResponse=await mailSender(email,"Verification Email",otpTemplate(otp));
        console.log('email sent successfully : ',mailResponse.response)
    }catch(error){
        console.log('error occured while sending mail : ',error);
        throw error;
    }
}
OTPModel.pre("save",async function (next){
    if(this.isNew){
        await sendVerificationMail(this.email,this.otp);
    }
    next();
});
module.exports=mongoose.model('OTP',OTPModel);