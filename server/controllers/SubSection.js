const section=require("../models/Section");
const course=require("../models/Course");
const SubSection = require("../models/SubSection");
const subsection=require("../models/SubSection");
const { uploadFile } = require("../utils/CloudinaryUploader");
const Section = require("../models/Section");


require("dotenv").config();
exports.createSubSection =async (req,res)=>{
    try {
      
        const {sectionid,courseId,title,discription}=req.body;
        // get video file 
        const video=req.files.video;
        // validation 
    
        if(!sectionid || !title || !discription  || !video){
            return res.status(404).json({
                success:false,
                message:"all the fields are required",
            })
        }
       
        // upload video to cloudinary 
        const clodinaryupload=await uploadFile(video,process.env.FOLDER_NAME)

        // create subsection 
      
        const subsectionDetail = await subsection.create({
            title:title,
            description:discription,
            videoUrl:clodinaryupload.secure_url
        })
        // update section with this subsection id
        const sectionDetail=await section.findByIdAndUpdate(sectionid,{
            $push:{
                subSection:subsectionDetail.id,
            }
        },{
            new:true,
        })
        const updatedCourseDetails=await course.findById(courseId).populate(
           {
             path:"courseContent",
            populate:{
                path : "subSection"
            }
        }
        ).exec();
        //return response
        return res.status(200).json({
            success:true,
            message:"successfully creating subsection ",
            updatedCourse:updatedCourseDetails,
        })
        
    } catch (error) {
        console.error("Error creating new sub-section:", error);
        return res.status(500).json({
            success:false,
            message:"error in creating subsection "
        })
        
    }
}

// update subsection 

exports.updateSubSection = async(req,res)=>{
    try {
        // get item from body 
        const {subsectionid,sectionid,title,discription}=req.body;
        // get file ;
        
        const subsection =await SubSection.findById(subsectionid);
      
        if(!subsection){
            return res.status(404).json({
                success:false,
                message:"SubSection not found"
            })
        }

        if(title!==undefined){
            subsection.title=title;
        }
        if( discription!==undefined){
            subsection.description=discription;
        }
        if(req.files && req.files.video !==undefined){
            const video=req.files.videofile;
            const uploadDetails=await uploadFile(
                video,
                process.env.FOLDER_NAME,
            )
            subsection.videoUrl=uploadDetails.secure_url;
            // subsection.timeDuration =  `${uploadDetails.duration}`
        }
        await subsection.save();

        // find and update 
        const updatedSection = await Section.findById(sectionid).populate("subSection")
        // return response 
        return res.status(200).json({
            success:true,
            data:updatedSection,
            message:"updated subsection successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"error in updating subsection "
        })
        
    }
}


// delete subsetion 
exports.deleteSubSection = async(req,res)=>{
    try {
        // get item from body 
        console.log("---------------------")
        const {subsectionid,sectionID}=req.body;


        // update section means remove subsection from the section 

        await section.findByIdAndUpdate(
            {_id:sectionID},
            {
                $pull:{
                    subsection:subsectionid,
                },
            }
        
        )
        console.log("000000000000000000")
        const updateSubsection =await SubSection.findByIdAndDelete({_id:subsectionid})

        if(!updateSubsection){
            return res.status(404).json({
                success:false,
                message:"SubSectio not found"
            })
        }
        const updatedSection= await section.findById(sectionID).populate("subSection");
        // return response 
        return res.status(200).json({
            success:true,
            data:updatedSection,
            message:"Deteted subsection successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"error in delete subsection "
        })
        
    }
}
