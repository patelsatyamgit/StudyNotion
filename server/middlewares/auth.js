const jwt=require("jsonwebtoken");
require("dotenv").config();
// auth 

exports.auth =async (req,res,next) =>{

    try {
        const token =req.cookies.token
                   || req.body.token 
                   || req.header("Authorization").replace("Bearer ","");

        // if token missing ,then return response 

        if(!token){
            return res.this.status(401).json({
                success:false,
                message:"Token Missing"
            })
        }

        // veryfy token 

        try {

            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user=decode;
            
        } catch (err) {
            return res.status(401).json({
                success:false,
                message:"token is invalid"
            })
            
        }
        next();
        
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Something went wrong while validating"
        })
    }
}

// isStudent 

exports.isStudent=async (req,res,next)=>{
    try {

        if(req.user.role !=="Student"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Students only"
            })
        }
        next();


        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"User role connot be verified"
        })
    }
    
}
// isInstructor

exports.isInstructor=async (req,res,next)=>{
    try {

        if(req.user.role !=="Instructor"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Instructor only"
            })
        }
        next();
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Instructor role connot be verified"
        })
    }
    
}
// is Admin 

exports.isAdmin=async (req,res,next)=>{
    try {

        if(req.user.role !=="Admin"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Admin only"
            })
        }
        next();


        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Admin role connot be verified"
        })
    }
    
}