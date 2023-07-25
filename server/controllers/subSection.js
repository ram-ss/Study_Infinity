const SubSection=require('../models/subSection');
const Section=require('../models/section');
const {uploadImageToCloudinary}=require('../utils/imageUploader');
require("dotenv").config();
exports.createSubSection=async(req,res)=>{
    try{
        console.log(req);
        const {sectionId,title,description}=req.body;
        const video=req.files.video;
        if(!sectionId || !title || !description || !video){
            return res.status(400).json({
                success:false,
                message:'all fields required'
            })
        }
        console.log("video ",video);
        const uploadDeatails=await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
        const subSectionDetails=await SubSection.create({
            title:title,
            timeDuration:`${uploadDeatails.duration}`,
            description:description,
            videoUrl:uploadDeatails.secure_url
        });
        const updatedSection=await Section.findByIdAndUpdate(
            {_id:sectionId},
            {
                $push:{
                    subSections:subSectionDetails._id
                }
            },
        {new:true}).populate("subSections");
        //

        return res.status(200).json({
            success:true,
            message:'sub section created',
            data:updatedSection
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
exports.updateSubSection=async(req,res)=>{
    try {
      const { sectionId,subSectionId, title, description } = req.body
      const subSection = await SubSection.findById(subSectionId)
  
      if (!subSection) {
        return res.status(404).json({
          success: false,
          message: "SubSection not found",
        })
      }
  
      if (title !== undefined) {
        subSection.title = title
      }
  
      if (description !== undefined) {
        subSection.description = description
      }
      if (req.files && req.files.video !== undefined) {
        const video = req.files.video
        const uploadDetails = await uploadImageToCloudinary(
          video,
          process.env.FOLDER_NAME
        )
        subSection.videoUrl = uploadDetails.secure_url
        subSection.timeDuration = `${uploadDetails.duration}`
      }
  
      await subSection.save()
  
      const updatedSection = await Section.findById(sectionId).populate("subSections")


      return res.json({
        success: true,
        data:updatedSection,
        message: "Section updated successfully",
      })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
exports.deleteSubSection=async(req,res)=>{
    try {
      const { subSectionId, sectionId } = req.body
      await Section.findByIdAndUpdate(
        { _id: sectionId },
        {
          $pull: {
            subSections: subSectionId,
          },
        }
      )
      const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })
  
      if (!subSection) {
        return res
          .status(404)
          .json({ success: false, message: "SubSection not found" })
      }

      const updatedSection = await Section.findById(sectionId).populate("subSections").exec();
  
      return res.json({
        success: true,
        data:updatedSection,
        message: "SubSection deleted successfully",
      })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}