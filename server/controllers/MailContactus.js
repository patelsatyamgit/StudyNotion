const { emit } = require("../models/User");
const mailsender= require("../utils/MailSender")
exports.contactusMail=async (req,res)=>{

    console.log("controller")
    try {
        const {firstname,lastname,Email,Phone,message,code}=req.body;
        await mailsender("sp8982089@gmail.com", `${firstname} ${lastname} has send message to you `,message+"call-"+Phone);
        await mailsender(Email, `${firstname} ${lastname} Your message`, message);
          
        return res.status(200).json({
            success:true,
            message:"message sent success fully"
        })

    } catch (error) {
        return res.status(501).json({
            success:false,
            message:"there is something error in mailsending"
        })
        
    }
}