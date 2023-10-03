const User=require("../models/User");
const mailSender=require("../utils/MailSender");
const bcrypt=require("bcrypt");
const crypto=require("crypto");

// resetPasswordToken 

exports.resetPasswordToken=async (req,res)=>{

   try {

     // get email from req body 
     const email=req.body.email;
     //check user for this email
 
     const user= await User.findOne({email:email});
 
     if(!user){
         return res.status(401).json({
             success:false,
             message:"Your email is not Register with us"
         })
     }
 
     // generate token 
     const token=crypto.randomBytes(20).toString("hex");
 
     // update user by adding token and expiration time 
 
     const updatedDetails=await User.findOneAndUpdate({email:email},{token:token,
     resetPasswordExpires:Date.now() +  3600000},{new:true});
 
     // create url
     const url =`http://localhost:3000/update-password/${token}`
 
     // send mail containing url
     await mailSender(email,"Password Reset Mail", `Password Reset Link: ${url}`) ;
 
     // return response 

     return res.status(200).json({
        success:true,
        message:"Email sent successfully ,please check email and change pwd",
     });
 
    
   } catch (error) {

    //   console.log(error);
      return res.status(500).json({
        success:false,
        message:"Something went wrong while sending reset pwd mail"
      })
    
   }
   
}

// Reset password  
exports.resetPassword = async (req,res)=>{
   try {
     // data fetch from body
     const{password,confirmpassword,token} =req.body;
     // velidation 
     if(password!==confirmpassword){
         return res.json({
             success:false,
             message:"Password not matching",
         })
     }
     // get userDetails from db using  token 
     const userDetails =await User.findOne({token:token});
     // if token invalid 
     if(!userDetails){
         return res.json({
             success:false,
             message:"Token is invalid",
         })
     }
     // if expire
    //  console.log(userDetails.resetPasswordExpires,Date.now())
     if((userDetails.resetPasswordExpires < Date.now()))
     {
         return res.json({
             success:false,
             message:"Token is expired ,plese regenerate your token"
         })
     }
    //  console.log("Pass 1");
     // hash password 
     const hashedPassword =await bcrypt.hash(password,10);
    //  console.log("Pass 2");
     // update password 
     await User.findOneAndUpdate({token:token},
        {password:hashedPassword},
        {new:true});
     // return response 
    return res.status(200).json({
        success:true,
        message:"Password updated successfully",
    })
    
   } catch (error) {

    // console.log(error)
    return res.json({
        success:false,
        message:"There is something error in reset password"
    })
    
   }
}