const mongoose=require('mongoose');
const sectionModel=new mongoose.Schema({
    sectionName:{
        type:String,
    },
    subSections:[
        {
            type:mongoose.Types.ObjectId,
            required:true,
            ref:"SubSection"
        }
    ]
});
module.exports=mongoose.model('Section',sectionModel);