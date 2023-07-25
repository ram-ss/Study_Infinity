const mongoose=require('mongoose');
const userModel=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    accountType:{
        type:String,
        enum:['Admin','Student','Instructor'],
        required:true
    },
    active:{
        type: Boolean,
        default: true,
	},
    approved:{
        type: Boolean,
        default: true,
	},
    additionalDetails:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"Profile"
    },
    courses:[
        {
            type:mongoose.Types.ObjectId,
            ref:"Course"
        }
    ],
    image:{
        type:String,
        required:true
    },
    courseProgress:[
        {
            type:mongoose.Types.ObjectId,
            ref:'CourseProgress'
        }
    ],
    token:{
        type: String,
    },
    resetPasswordExpires:{
        type: Date,
    },
    courseProgress: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "courseProgress",
        },
	],
},
{ timestamps: true }
);
module.exports=mongoose.model('User',userModel);