const mongoose=require('mongoose');
const courseProgressModel=new mongoose.Schema({
    courseID:{
        type:mongoose.Types.ObjectId,
        ref:'Course'
    },
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    },
    completedVideos:[
        {
            type:mongoose.Types.ObjectId,
            ref:'SubSection'
        }
    ]
});
module.exports=mongoose.model('CourseProgress',courseProgressModel);