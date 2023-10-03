const Category=require("../models/Category");
const Course = require("../models/Course");

exports.createCategory= async (req,res)=>{
    try {
        const{name,description}=req.body;
        // validation 
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }
        // create db entry 
        const categoryDetails =await Category.create({
            name:name,
            description:description,
        });
        // console.log(categoryDetails);

        // return response 

        return res.status(200).json({
            success:true,
            message:"category Created Successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

// getAll category 
exports.showAllCategory= async (req,res) =>{
    try {
        const allCategory=await Category.find({},{name:true,description:true});

        res.status(200).json({
            success:true,
            message:"All category return success fully",
            data:allCategory,
        })
        
    } catch (error) {
        // console.log(error)
        return res.status(500).json({
            success:false,
            message:"error in finding categories",
        })
    }
}

// category page detail

exports.categoryPageDetails= async (req,res)=>{
    try {
        // get categoryid
        const {categoryId}=req.body;
        // get courses corresponding to this categoryid 
        const seclectedCategoryCourses= await Category.findById(categoryId).populate(
            {
                path:"course",
                match:{status:"Published"},
                populate:"ratingAndReview",
            
            }
        ).exec();
        // validation 
        if(!seclectedCategoryCourses){
            return res.status(404).json({
                success:false,
                message:"Data not found",
            })
        }
        // if (seclectedCategoryCourses.course.length === 0) {
        //     console.log("No courses found for the selected category.")
        //     return res.status(404).json({
        //       success: false,
        //       message: "No courses found for the selected category.",
        //     })
        //   }
        // get different category corses 

        const differentCategoryDatacourse= await Category.find({_id:{$ne:categoryId}}).populate({
            path:"course",
            match:{status:"Published"},
            populate:{
                path:"ratingAndReview"
            }
        }).exec();
        const differentCategoryData=differentCategoryDatacourse.flatMap((category)=> category.course)

        const allCategory= await Category.find().populate({
            path:"course",
            match:{status:"Published"},
            populate:[{
                path:"instructor",
            },
            {
                path:"ratingAndReview",
            }
        ]
            
        }).exec();
         
        const allCourses= allCategory.flatMap((category)=> category.course );
        // get top selling courses 
        
        // const topSellingCourses= allCourses.sort((a,b)=>b.sold - a.sold).slice(0,10)
        // console.log("--------------",topSellingCourses)
        // return res 
        return res.status(200).json({
            success:true,
            message:"Data fetch successfully",
            data:{
                seclectedCategoryCourses,
                differentCategoryData,
                allCourses,
            }
        })

        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
        
    }
}