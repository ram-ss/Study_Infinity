const mongoose=require('mongoose');
const categoryModel=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    course:[{
        type:mongoose.Types.ObjectId,
        ref:'Course'
    }]
});
module.exports=mongoose.model('Category',categoryModel);