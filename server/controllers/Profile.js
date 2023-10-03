const { default: mongoose } = require("mongoose");
const Profile=require("../models/Profile");
const user=require("../models/User");
const { uploadFile } = require("../utils/CloudinaryUploader");
const CourseProgress = require("../models/CourseProgress");

exports.updateProfile=async(req,res)=>{
    try {

        // get data .
        const {dateOfBirth="",contactNumber,gender,profession,firstName,lastName}=req.body;

        // get userId 

        const id=req.user.id;

        // validation 

        console.log("userid",id);
        if(!contactNumber || !gender || !id){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        // find profile 
        const userDetails=await user.findById(id);
        userDetails.firstName=firstName;
        userDetails.lastName=lastName;
        //get profile id 
      
        const profileDetails=await Profile.findById(userDetails.additionalDetails);
        // update
        profileDetails.dateOfBirth=dateOfBirth;
        profileDetails.contactNumber=contactNumber;
        profileDetails.gender=gender;
        profileDetails.profession=profession;

        await profileDetails.save();


        return res.status(200).json({
            success:true,
            message:"Profile created successfully",
            updateduserDetails:userDetails,
            updatedabout:profileDetails,
        })
        
    }
     catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"error in Profile created"
        })
    }
}
//update About 
exports.updateAbout=async(req,res)=>{
     try {
        const id=req.user.id;
        const {about}=req.body;
        const userr=await user.findById(id);
        const userDetails= await Profile.findById(userr.additionalDetails);

        userDetails.about=about;

        await userDetails.save();

        return res.status(200).json({
            success:true,
            message:"update successfully"
        })
        
     } catch (error) {
        console.log("error in about update")
        return res.status(500).json({
            success:false,
            message:"error in about update"
        })
     }
}
// delete accoun/t  

exports.deleteAccount =async(req,res)=>{
    try {
        // get id .
        const id=req.user.id;
        // validate id 
        const userDetails=await user.findById(id);
        if(!userDetails){
            return res.status(500).json({
                success:false,
                message:"user not found"
            })
        }
        // delete profile (addition details) 
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails})
        // delete user 
        await user.findByIdAndDelete({_id:id});
        // return response 
        return res.status(200).json({
            success:true,
            message:"user deleted successfully"
        })

        
    } catch (error) {
        console.log(error)
        return res.status(201).json({
            success:false,
            message:"eror in user deleted "
        })

        
    }
}

// get users details 
exports.getUserDetails=async(req,res)=>{
    try {
        const id=req.user.id;
        // user details
        const userDetails=await user.findById(id).populate("additionalDetails").exec();

        // response 
        console.log("userdetails",userDetails);
        return res.status(200).json({
            success:true,
            message:"User Data fetched successfully",
            userDetails
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User Data fetched error"
        })
        
    }
}

// update profile 

exports.updateProfilePicture =async (req,res)=>{
    try {
        const picture=req.files.displayPicture;
        const userid=req.user.id;
        console.log("userid",userid);
        const image=await uploadFile(
            picture,
            process.env.FOLDER_NAME,
            1000,
            1000,
        )
        console.log("image-url",image);

        const updatedProfile= await user.findByIdAndUpdate(
            {_id:userid},
            {image:image.secure_url},{new:true})

          return  res.status(200).json({
                success:true,
                message:"Image Updated Successfully",
                data:updatedProfile,
            })
    } catch (error) {
        console.log("error....",error)
        return res.status(500).json({
            success:false,
            message:error.message,
        })
        
    }
}

// get all enrolled courses
exports.getEnrolledCourses=async (req,res)=>{
    try {
        const userId=req.user.id;
        let userDetails=await user.findOne({_id:userId})
        .populate({
            path:"courses",
            populate :{
                path:"courseContent",
                populate:{
                    path:"subSection"
                }
            }
        }).exec();

         userDetails=userDetails.toObject();

          var SubsectionLength=0;
         for(var i=0; i<userDetails.courses.length; i++){
            let courseProgresscount= await CourseProgress.findOne({
                courseID:userDetails.courses[i]._id,
                userID:userId
             })
             SubsectionLength=0;
             for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
                // totalDurationInSeconds += userDetails.courses[i].courseContent[
                //   j
                // ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
                // userDetails.courses[i].totalDuration = convertSecondsToDuration(
                //   totalDurationInSeconds
                // )
                SubsectionLength +=
                  userDetails.courses[i].courseContent[j].subSection.length
              }

             courseProgresscount=courseProgresscount?.CompletedVideos?.length
             if (SubsectionLength === 0) {
                userDetails.courses[i].progressPercentage = 100
              } else {
                // To make it up to 2 decimal point
                const multiplier = Math.pow(10, 2)
                userDetails.courses[i].progressPercentage =
                  Math.round(
                    (courseProgresscount / SubsectionLength) * 100 * multiplier
                  ) / multiplier
              }
         }
         console.log("enroolldfdfd----",userDetails);
        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"Could not find user details",
            })
        }
        return res.status(200).json({
            success:true,
            data:userDetails.courses,
        })
    } catch (error) {

        return res.status(500).json({
            success:false,
            message:error.message,
        })
        
    }
}