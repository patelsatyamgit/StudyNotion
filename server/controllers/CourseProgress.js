const courseProgress= require("../models/CourseProgress");
const subsection= require("../models/SubSection");


exports.updateCourseProgress=async(req,res)=>{
    const {courseId,subsectionId,}=req.body;
    const userId=req.user.id;


    try {
        const subsectionn= await subsection.findById(subsectionId);

        if(!subsectionn)
        {
            return res.status(400).json({
                success:false,
                message:"Invalid Subsection",
            })
        }

        const courseProgres=await courseProgress.findOne({
            courseID:courseId,
            userID:userId,
        });

        if(!courseProgres){
            return res.status(404).json({
                success:false,
                message:"Course Progress does not exist"
            })
        }
        else{
            if(courseProgres.CompletedVideos.includes(subsectionId)){
                return res.status(404).json({
                    success:false,
                    message:"Already marked"
                })

            }else
            {
                courseProgres.CompletedVideos.push(subsectionId);

            }
            await courseProgres.save();
            return res.status(200).json({
                success:true,
                message:"Marked successfully"
            })
        }
    } catch (error) {

        // console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internel server error"
        })
        
    }
}