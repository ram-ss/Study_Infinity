const Section=require('../models/section');
const Course=require('../models/course');
const SubSection=require('../models/subSection');
// const { default: mongoose } = require('mongoose');
const mongoose=require('mongoose');
exports.createSection=async (req,res)=>{
    try{
        let {sectionName,courseId}=req.body;
        if(!sectionName || !courseId){
            return res.status(400).json({
                sucess:false,
                message:'all fields required'
            });
        }
        const newSection=await Section.create({sectionName});
        console.log("ncjkwnejc")
        
        const updatedCourse = await Course.findByIdAndUpdate(
			{_id:courseId},
			{
				$push: {
					courseContent: newSection._id,
				},
			},
			{ new: true }
		).populate({
				path: "courseContent",
				populate: {
					path: "subSections",
				},
			})
			.exec();
         //populate section and subsection
         console.log(courseId)
         console.log(newSection)
         console.log(updatedCourse)
         return res.status(200).json({
            success:true,
            message:'course updated',
            updatedCourse
         });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
exports.updateSection=async (req,res)=>{
    try{
        const {sectionName,sectionId,courseId}=req.body;
        if(!sectionName || !sectionId){
            return res.status(400).json({
                sucess:false,
                message:'all fields required'
            });
        }
        const section=await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true});
        const course=await Course.findById(courseId)
        .populate({
			path:"courseContent",
			populate:{
				path:"subSections",
			},
		})
		.exec();
        return res.status(200).json({
            success:true,
            message:section,
            data:course
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            sucess:false,
            message:error.message
        })
    }
}
exports.deleteSection=async(req,res)=>{
    try{
        const {sectionId,courseId}=req.body;
        await Course.findByIdAndUpdate(courseId,{
            $pull:{
                courseContent: sectionId,
            }
        });
        const section = await Section.findById(sectionId);
		console.log(sectionId, courseId);
		if(!section) {
			return res.status(404).json({
				success:false,
				message:"Section not Found",
			})
		}
        await SubSection.deleteMany({_id: {$in: section.subSection}});
        await Section.findByIdAndDelete(sectionId);
        const course = await Course.findById(courseId).populate({
			path:"courseContent",
			populate: {
				path: "subSection"
			}
		})
		.exec();
        return res.status(200).json({
            success:true,
            message:'section deleted',
            data:course
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            sucess:false,
            message:error.message
        })
    }
}