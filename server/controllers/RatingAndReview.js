const RatingAndReview = require("../models/RatingAndRaview");
const Course=require("../models/Course");
const mongoose=require("mongoose");


// createRating 
exports.createRating= async(req,res)=>{
    try {
          // fetch data 
    const {course_id,rating,review}=req.body;
   
    // get user id 
    const userId=req.user.id;
    // validate if user enrolled or not 
    const courseDetails = await Course.findOne({_id:course_id,
        studentsEnrolled:{$elemMatch:{$eq:userId}},
    })
    if(!courseDetails){
        return res.status(400).json({
            success:false,
            message:"user is not enrolled"
        })
    }
    // cheque if a user aready review

    const alreadyReviewed = await RatingAndReview.findOne({
        user:userId,
        course:course_id
    });

    if(alreadyReviewed){
        return res.status(403).json({
            success:false,
            message:"Course is already reviewed by the user",
        })
    }
    // crete rating review 

    const ratingReview=await RatingAndReview.create({
        rating,review,course:course_id,
        user:userId
    });

    // updated course  details
    const newcourse= await Course.findByIdAndUpdate(course_id,{
        $push:{
            ratingAndReview:ratingReview,
        }
    },
    {new:true});

    await newcourse.save();

    console.log("newCourse",newcourse);
    
    return res.status(200).json({
        success:true,
        message:"Rating and review created successfully",
        ratingReview,
    })
 

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"there is some error in creating rating"
        })
        
    }
  
}


   // averageRatiing 

exports.returnAverageRating=async (req,res)=>{

    try {

            // get course id 
            course_id=req.body.course_id;
            // calculate average rating  by using aggregation of mongo 
            const result =RatingAndReview.aggregate([
                {
                    $match:{
                        course:new mongoose.Type.ObjectId(course_id),
                    },
                },
                {
                    $group:{
                        id:null,
                        averageRating:{$avg:"$rating"},
                    }
                }
            ])

            if(result.length > 0){
                return res.json({
                    success:true,
                    message:"Rating fetched successfully",
                    averageRating:result[0].averageRating,
                })
            }

            else{
                return res.json({
                    success:true,
                    message:"there is no rating and review of this course",
                    averageRating:0,
                })
            }



        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"there is something error to get rating"
        })
        
    }
}


// getRatings

exports.getAllRatings=async (req,res)=>{
    try {
        const allRating= await RatingAndReview.find({})
                       .sort({rating:"desc"})
                       .populate({
                           path:"user",
                           select:"firstName lastName email image"
                       })
                       .populate({
                           path:"course",
                           select:"courseName"
                       })
                       .exec();

                return res.status(200).json({
                    success:true,
                    message:"All the ratings fetched successfully",
                    data:allRating
                })

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"there is some error in getting rating",
        })
        
    }
}


// get rating based on course

