const Category = require("../models/Category");
const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const User = require("../models/User");
const {uploadFile} = require("../utils/CloudinaryUploader");

//createCourse handler function
exports.createCourse = async (req, res) => {
    try {


        //fetch data 
        let {courseName, courseDescription, whatYouWillLearn, price, tag,category,status,instructions,} = req.body;

        //get thumbnail
        const thumbnail = req.files.thumbnailImage;
        const tagg=JSON.parse(tag);
        const instructionss=JSON.parse(instructions);

        //validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail || !category) {
            return res.status(400).json({
                success:false,
                message:'All fields are required',
            });
        }


        if (!status || status === undefined) {
			status = "Draft";
		}

        //check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId,{accountType:"Instructor"});
        console.log("Instructor Details: " , instructorDetails);
        //TODO: Verify that userId and instructorDetails._id  are same or different ?
           
        if(!instructorDetails) {
            return res.status(404).json({
                success:false,
                message:'Instructor Details not found',
            });
        }

        //check given tag is valid or not
        const categoryDetails = await Category.findById(category);
        if(!categoryDetails) {
            return res.status(404).json({
                success:false,
                message:'Tag Details not found',
            });
        }

        //Upload Image to Cloudinary
        const thumbnailImage = await uploadFile(thumbnail, process.env.FOLDER_NAME);

        console.log("image url",thumbnailImage);
        console.log("categoryDetails",categoryDetails)
        //create an entry for new Course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            tag:tagg,
            category:categoryDetails._id,
            thumbnail:thumbnailImage.secure_url,
            status:status,
            instructions:instructionss,
        })

        //add the new course to the user schema of Instructor
       
        await User.findByIdAndUpdate(
            {_id: instructorDetails._id},
            {
                $push: {
                    courses: newCourse._id,
                }
            },
            {new:true},
        );


        //update the category ka schema
        console.log
        await Category.findByIdAndUpdate(
            {_id:category},
            {
                $push:{
                    course:newCourse.id,
                }
            },
            {new:true}    
        ) 
        console.log

        //TODO: HW ^

        //return response
        return res.status(200).json({
            success:true,
            message:"Course Created Successfully",
            data:newCourse,
        });

    }
    catch(error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'Failed to create Course',
            error: error.message,
        })
    }
};

exports.editCourse= async (req,res)=>{
    try {

        const {courseId}= req.body;
        const updates =req.body;

        console.log("updates ---------",updates)

        const course=await Course.findById(courseId);

        if(!course){
            return res.status(404).json({error:"course not found"});
        }

        if(req.files){
            const thumbnail = req.files.thumbnailImage
            const thumbnailImage = await uploadFile(thumbnail,process.env.FOLDER_NAME)
            course.thumbnail =thumbnailImage.secure_url;
        }

        for(const key in updates){
            if(updates.hasOwnProperty(key)){
                if(key === "tag"  || key === "instructions"){
                    course[key] = JSON.parse(updates[key])
                }else{
                    course[key] = updates[key];
                }
            }
        }

        await course.save();


        const updatedCourse = await Course.findOne({
            _id: courseId,
          })
            .populate({
              path: "instructor",
              populate: {
                path: "additionalDetails",
              },
            })
            .populate("category")
            // .populate("ratingAndReview")
            .populate({
              path: "courseContent",
              populate: {
                path: "subSection",
              },
            })
            .exec()
      
          res.json({
            success: true,
            message: "Course updated successfully",
            data: updatedCourse,
          })
        
    } catch (error) {

            console.error(error)
            res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
            })
        
    }
}

exports.showAllCoursesOfTheInstructor= async(req,res)=>{

    try {
        const id= req.user.id
        console.log("request--",id);
        const allcourses= await  Course.find({instructor:(id),
        }).populate("category").populate({
            path:"courseContent",
            populate:{
                path:"subSection",
            }
        })
        .exec();

        res.status(200).json({
            success:true,
            data:allcourses,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Failed to retrieve instructor courses",
            error:error.message,
        })
        
    }

}
// delete Course 

exports.deleteCourse = async (req,res)=>{
    try {
        const {courseId}=req.body;
        console.log(courseId);
        const course=await Course.findById(courseId);

        if(!course){
            return res.status(404).json({message:"Course not found"})
        }
        const studentsEnrolled = course.studentsEnrolled
        for(const studentId of studentsEnrolled){
            await User.findByIdAndUpdate(studentId,{
                $pull:{courses:courseId}
            })
        }

        // delete sections and subsections 

        const courseSections= course.courseContent
        for(const sectionId of courseSections){
            const section = await Section.findById(sectionId);
            if(section){
                const subSections = section.subSection
                for(const subSectionId of subSections){
                    await SubSection.findByIdAndDelete(subSectionId)
                }
            }

            await Section.findByIdAndDelete(sectionId);
           
        }
        await Course.findByIdAndDelete(courseId)

        return res.status(200).json({
            success:true,
            message:"Course deleted successfully"
        })


    
    } catch (error) {
        console.log("there is error in Course deletion",error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

//getAllCourses handler function

exports.showAllCourses = async (req, res) => {
    try {
            //TODO: change the below statement incrementally
            const allCourses = await Course.find({},
                {
                    courseName: true,
                    price: true,
                    thumbnail: true,
                    instructor: true,
                    ratingAndReviews: true,
                    studentsEnroled: true,
                }).populate("instructor").exec();

            return res.status(200).json({
                success:true,
                message:'Data for all courses fetched successfully',
                data:allCourses,
            })

    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Cannot Fetch course data',
            error:error.message,
        })
    }
}


// getCoursesDetails 

exports.getCourseDetails =async (req,res)=>{
    try {
        // get id 
        
        const {course_id}=req.body;

        // find course detail 
        const courseDetails=await Course.find({_id:course_id}).populate({
            path:"instructor",
            populate:{
                path:"additionalDetails"
            },
        })
        .populate("category")
        .populate("ratingAndReview")
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection",
            }
        })
        .exec();

        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:   `could not find course with ${course_id}`,
               
            })
        }
        return res.json({
            success:true,
            message:"Course find successfully",
            data:courseDetails,
        })
    } catch (error) {

        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
        
    }
}

exports.getCourseFullDetails=async (req,res)=>{
    try {
        const {courseId} =req.body;
        const userId=req.user.id;

        const courseDetails= await Course.findOne({
            _id:courseId
        }).populate({
            path:"instructor",
            populate:{
                path:"additionalDetails",
            },
        })
        .populate("category")
        .populate("ratingAndReview")
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        }).exec();

        let courseProgresscournt=await CourseProgress.findOne({
            courseID:courseId,
            userID:userId,
        })

        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:'Could not find the course'
            })
        }

        return res.status(200).json({
            success:true,
            data:{
                courseDetails,
                completedVideos:courseProgresscournt?.CompletedVideos ? courseProgresscournt?.CompletedVideos :[],
            }
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
        
    }
}
exports.getInstructorDesboardDetails=async(req,res)=>{
    try {
             const userId=req.user.id;

             const courseDetails=await Course.find({
                instructor:userId,
             })

             if(!courseDetails){
                return res.status(404).json({
                    success:false,
                    message:"No instructor found",
                })
             }
             const courseData= courseDetails.map((course)=>{

                if(course.status==="Published"){
                    const studentEnrolled=course.studentsEnrolled.length;
                const totalIncome=studentEnrolled * course.price;

                const data={
                    course:course,
                    courseName:course.courseName,
                    courseDescription:course.courseDescription,
                     studentEnrolled,
                     totalIncome,
                }

                return data;
                }
                

             })
             const newcourseData=courseData.filter((item)=>item!=null);

             return res.status(200).json({
                success:true,
                message:"Instructor data fetched successfully",
                data:newcourseData,
             })

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"There is some error in getting instructor details"
        })
        
    }
}