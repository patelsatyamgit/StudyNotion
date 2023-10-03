const course= require("../models/Course");
const Section=require("../models/Section");
const SubSection = require("../models/SubSection");

exports.createSection =async (req,res)=>{
    try {

        // fetch data 
        const {sectionName,courseId}=req.body;
        // validate 
        if(!sectionName || !courseId){
            return res.status(404).json({
                success:false,
                message:"Missing values",
            })
        }

        // create new section 

        const newSection = await Section.create({sectionName});

        // update course details 
 

        
        const UpdatedCourseDetail =await course.findByIdAndUpdate(courseId,{
            $push:{
                courseContent:newSection.id
            },
           
        },
        {
            new:true,
        }).populate({
            path:"courseContent",
            populate:{
                path:"subSection",
            },
        })
        .exec();
        // console.log("pass");

        // HW how to populate section and subsection for updatedCourseDetails so that we can print all the details
        return res.status(200).json({
            success:true,
            message:"Section created successfully",
            UpdatedCourseDetail:UpdatedCourseDetail,
        })
        
    } catch (error) {
        // console.log(error);
        return res.status(500).json({
            success:false,
            message:"Unable to create a section ",
        })
        
    }
}

exports.updateSection=async (req,res)=>{
    try {
        
        // get data 
        const {sectionName,courseId,sectionId}=req.body;
        // validation 
        if(!sectionId || !sectionName){
            return res.status(500).json({
                success:false,
                message:"all fields are require"
            })
        }
        // update section 
        const section=await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true});
        // response  

        const updatedcourse=await course.findById(courseId)
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        })

        return res.status(200).json({
            success:true,
            message:"Section update successfully",
            updatedCourse:updatedcourse,
        })
    } catch (error) {
        // console.log(error);
        return res.status(500).json({
            success:false,
            message:"Unable to update a section ",
        })
        
    }
}
exports.deteteSection=async (req,res)=>{
    try {

        // get id 
        const{sectionId,courseId}=req.body;
        // find and delete 
        await course.findByIdAndUpdate(courseId,{
            $pull:{
                courseContent:sectionId,
            }
        })
        const section=await Section.findById(sectionId);
      
        await SubSection.deleteMany({_id : {$in :section.subSection}})
        await Section.findByIdAndDelete(sectionId);
        //TODO: do we need to to delete the section id from the course schema
        // response 
       const updatedCourser=await course.findById(courseId).populate({
        path:"courseContent",
        populate:{
            path:"subSection",
        }
       }).exec();
        return res.status(200).json({
            success:true,
            message:"Section deleted successfully",
            updatedCourse:updatedCourser
        })
        
    } catch (error) {
        // console.error("Error deleting section:", error);
        return res.status(500).json({
            success:false,
            message:"Unable to delete a section ",
        })
    }
}