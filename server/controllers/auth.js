const User=require("../models/User");
const OTP=require("../models/Otp");
const otpGenerator =require("otp-generator");
const bcrypt =require("bcryptjs");
const Profile = require("../models/Profile");
const mailsender=require("../utils/MailSender");
const {passwordUpdated}=require("../mai/ltemplates/passwordUpdate");
const jwt =require("jsonwebtoken");

require("dotenv").config();


// send otp 

exports.sendOTP=async (req,res)=>{

    try {
        // fetch email from req 

        const {email}=req.body;


        // check if email already exists

        const checkEmail=await User.findOne({email});
    

        if(checkEmail)
        {
            return res.status(409).json({
                success:false,
                message:"User already registered",
            })
        }

        // otp generate 

        var otp =otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });

        // console.log("OTP generated : ",otp);

         // check unique otp or not 
        let result =await OTP.findOne({otp:otp});
        // console.log("Result is Generate OTP Func");
		// console.log("OTP", otp);
		// console.log("Result", result);
        while(result){
            otp=otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            });

            result = await OTP.findOne({otp:otp});
        }

        const otpPayload ={email,otp};

        // create databasa entry  

        const otpBody = await OTP.create(otpPayload);
        // console.log(otpBody);

        //returen response 

        res.status(200).json({
            success:true,
            message:"OTP Sent Successfully",
            otp
        })
        
    } catch (error) {
        res.status(200).json({
            success:false,
            message:"Error in otp send",
        })
        
    }
}




// sighup user 

exports.signUp =async (req,res)=>{
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp,
        } = req.body;
    
        // validate 
    
        if(!firstName || !lastName || !email || !password || !confirmPassword  || !otp){
            return res.status(403).json({
                success:false,
                message:"All fields are required"
            })
        }
    
        //password matching  
    
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password and confirmPassword does not match"
            })
        }
    
        // check user already exist or not 
         
    
        const existingUser =await User.findOne({email});
    
        if(existingUser){
            return res.status(409).json({
                success:false,
                message:"User is already registered"
            })
        }
    
        // find most resent otp 
        const recentOtp =await OTP.find({email}).sort({createdAt:-1}).limit(1);
       
        // console.log(recentOtp,otp);
    
        // validate OTP 
        if(recentOtp.length==0){
            return res.status(400).json({
                success:false,
                message:"OTP not Found"
            })
        }
        else if(otp !== recentOtp[0].otp){
            //Invalid OTP 
    
            return res.status(400).json({
                success:false,
                message:"OTP not Matiching",
            })
        }
        // password hashing 
    // console.log("passone")
        const hashedPassword =await bcrypt.hash(password,10);

        // Create the user
		let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true);
    
        //entry create in const {second} = first
    
    
    
        const profileDetail=await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
        });
        const user =await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password:hashedPassword,
            accountType,
            additionalDetails:profileDetail.id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        });

        return res.status(200).json({
            success:true,
            message:"User is Registered Successfully",
            user,
        })


        
    } catch (error) {

        // console.error(error);
        return res.status(500).json({
            success:false,
            message:"There is some error in signup",
        })
        
    }



}



// login user 
exports.login =async (req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || ! password){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }
        //user check exist or not
        const user=await User.findOne({email}).populate("additionalDetails");

        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not registered please signup to continue",
            });
        }

        // generate JWT after password matching

        if(await bcrypt.compare(password,user.password)){

            console.log("inside logint")
            const payload ={
                email:user.email,
                id:user._id,
                role:user.accountType,
            }
            const token=jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"72h"
            })

            user.token =token;
            user.password =undefined;


            // create cookie 
            const options ={
                expires:new Date(Date.now() + 3 * 24 * 60 *60 *1000),
                httpOnly:true,
            }
            res.cookie("token",token ,options).status(200).json({
                success:true,
                token,
                user,
                message:'User Login Success',
            })
        }
        else
        {
            return res.status(401).json({
                success:false,
                message:"Password is incorrect",
            });
        }
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:true,
            message:"Login Failure, please try again",
        })
    }
    
}

// change password

exports.changePassword =async (req,res)=>{

    try {
      
         //get data from req borderStyle
         // get oldPassword,newPassword, confirmNewPassword,
         const userDetails=await User.findById(req.user.id);
         const {oldPassword,newPassword}=req.body;
        // validation 

        if(!oldPassword || !newPassword )
        {
            return res.json({
                success:false,
                message:"All the fields are required"
            })
        }

        
        const isPassWordMatch =await bcrypt.compare(oldPassword,userDetails.password);

        if(!isPassWordMatch){
            return res.status(401).json({
                success:false,
                message:"The Password is incorrect"
            });
        }



        // update pwd in DB 
        const encryptedPassword=await bcrypt.hash(newPassword,10);

        const updatedUserDetails = await User.findByIdAndUpdate(req.user.id,
            {password:encryptedPassword},
            {new:true}
        );
        // send mail - password updated

        try {
            
            const emailResponse=await mailsender(updatedUserDetails.email,
                passwordUpdated(updatedUserDetails.email,
                    `Password updated successfully for ${updatedUserDetails.firstName} ${userDetails.lastName}`));

                    console.log("Email Sent successfully",emailResponse.response);
        } catch (error) {
            console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
            
        }


        // return response
        return res
        .status(200)
        .json({ success: true, message: "Password updated successfully" });
        
    } catch (error) {
		// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
   

    } 
}
