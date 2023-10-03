const {instance}=require("../config/razorpay");
const CourseProgress=require("../models/CourseProgress");
const Course=require("../models/Course");
const User =require("../models/User");
const mailSender=require("../utils/MailSender");

const {courseEnrollment, courseEnrollmentEmail}=require("../mai/ltemplates/courseEnrollmentEmail");

const mongoose=require("mongoose");
const crypto=require("crypto");

//capture the payment and initiate the razorpay order: 

exports.capturePayment= async(req,res)=>{
    const {courses}=req.body;
    const userId=req.user.id;
    if(courses?.length === 0){
        return res.json({success:false,message:"Please provide course Id"});
    }

    let total_amount=0;

    for(const course_id of courses){
    let course;
    try {

        course=await Course.findById(course_id);


        if(!course){
            return res.status(200).json({
                success:false,
                message:"Could not find the course"
            })
        }
        const uid=new mongoose.Types.ObjectId(userId);
        if(course.studentsEnrolled.includes(uid)){
            return res.status(200).json({
                success:false,
                message:"Student is already Enrolled"
            })
        }

        total_amount +=course.price
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:error.message})

    }
     const options = {
        amount : total_amount * 100,
        currency :"INR",
        receipt :Math.random(Date.now()).toString(),
     }
     try {
        
        const paymentResponse= await instance.orders.create(options);
        console.log("payment Instance Response",paymentResponse);

        res.json({
            success:true,
            data:paymentResponse,
        })
     } catch (error) {

        console.log(error);
        res.status(500).json({
            success:false,
            message:"Could not initiate order."
        })
        
     }
}}


exports.verifyPayment = async (req,res) => {
    const razorpay_order_id =req.body?.razorpay_order_id;
    const razorpay_payment_id =req.body?.razorpay_payment_id;
    const razorpay_signature =req.body?.razorpay_signature;

    const courses=req.body?.courses;

    const userId =req.user.id;

    if (
        !razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature ||
        !courses ||
        !userId
      ) {
        return res.status(200).json({ success: false, message: "Payment Failed" })
      }

      let body = razorpay_order_id +"|"+ razorpay_payment_id;

      const expectedSignature=crypto.createHmac("sha256",process.env.RAZORPAY_SECRET).update(body.toString()).digest("hex");


      if(expectedSignature === razorpay_signature){
        await enrollStudents(courses,userId,res)
        return res.status(200).json({success:true,message:"Payment verified"})
      }

      return res.status(200).json({success:false,message:"Payment Failed"})
    
}
const enrollStudents=async(courses,userId,res)=>{
         if(!courses || !userId){
            return res.status(400).json({
                success:false,
                message:"please provide course id and userId"
            })
         }

         for(const courseId of courses){
            try {
                const enrolledCourse=await Course.findOneAndUpdate({_id:courseId},
                    {$push:{studentsEnrolled:userId}},
                    {new:true})


                    if(!enrolledCourse){
                        return res.status(500).json({
                            success:false,
                            error:"Course not found"
                        })
                    }

                    const courseProgress= await CourseProgress.create({
                        courseID:courseId,
                        userID:userId,
                        CompletedVideos:[]
                    }) 
                   
                    const enrolledStudent = await User.findByIdAndUpdate(userId,{
                        $push:{
                            courses:courseId,
                            courseProgress:courseProgress._id,
                        },
                    },{new:true})
                const emailResponse = await mailSender(enrolledStudent.email,
                    `Successfully Enrolled into ${enrolledStudent.courseName}`,courseEnrollmentEmail(enrolledStudent.courseName, `${enrolledStudent.firstName} ${enrolledStudent.lastName}`))

                    console.log("Email sent Successfully : ",emailResponse.response)
            } catch (error) {

                console.log(error);
                return res.status(400).json({
                    success:false,
                    error:error.message
                })
                
            }
         }
}
exports.sendPaymentSuccessEmail = async (req,res) =>{
    const {orderId,paymentId,amount} = req.body;

    const userId=req.user.id;

    if(!orderId || !paymentId || !amount || !userId){
        return res.status(400).json({
            success:false,
            message:"Please provide all the details"
        })
    }
    try {
        const enrolledStudent = await User.findById(userId)

        await mailSender(
            enrollStudents.email,
            "payment Received",
            this.sendPaymentSuccessEmail(`${enrollStudents.firstName} ${enrollStudents.lastName}`,amount/100,orderId,paymentId)
        )
    } catch (error) {
        console.log("error in sending mail", error)
        return res
          .status(400)
          .json({ success: false, message: "Could not send email" })
      }
        
    }

// exports.capturePayment =async(req,res)=>{
//     // get course id and user id
//     const {course_id}=req.body;
//     const userId=req.user.id;
//     // validation
//     if(!course_id){
//         return res.json({
//             success:false,
//             message:"Please provide valid course id"
//         });
//     }

// // valid courseDetail

//     let course;
//     try {
//         course=await Course.findById(course_id);
//         if(!course) {
//             return res.json({
//                 success:false,
//                 message:'Could not find the course',
//             });
//         }


//         //check user already purchased

//     const uid=new mongoose.Types.ObjectId(userId);
//     if(course.studentsEnrolled.includes(uid)){
//         return res.status(400).json({
//             success:false,
//             message:"User is already enrolled"
//         })
//     }
//     } catch (error) {

//         return res.status(500).json({
//             success:false,
//             message:"Could not find the course"
//         })
        
//     }

    
//     //create order
//     const amount=course.price;
//     const currency="INR";
    
    
//     const options ={
//         amount:amount*100,
//         currency,
//         receipt:Math.random(Date.now()).toString,
//         notes:{
//             courseId:course_id,
//             userId,
//         }
//     };

//     try {
//         // initiate the payment using razorpay

//         const paymentResponse=await instance.orders.create(options);
//         console.log(paymentResponse);

//         return res.status(200).json({
//             success:true,
//             courseName:course.courseName,
//             courseDescription:course.courseDescription,
//             thumbnail:course.thumbnail,
//             orderId:paymentResponse.id,
//             currency:paymentResponse.currency,
//             amount:paymentResponse.amount,

//         })
//     } catch (error) {
//         console.log(error);
//         res.json({
//             success:false,
//             message:"there is something error in creating payment order"
//         })
//     }

//     // return response
// }


// // varify signature 


// exports.varifySignature=async(req,res)=>{
//     const webhookSecret="123456789";
//     const signature=req.headers["x-razorpay-signature"];

//     const shasum=crypto.createHmac("sha256",webhookSecret);

//     shasum.update(JSON.stringify(req.body));
//     const digest=shasum.digest("hex");

//     if(signature===digest){
//         console.log("Payment is authorized");
//         // payment done now user will be allocated to this course 

//         const {couseId,userId}=req.body.payload.payment.entity.notes;

//         try {

//             // find the course and enrolled the student 
//             const enrolledCourse=await Course.findByIdAndUpdate(
//                 {_id:courseId},
//                 {$push:{studentsEnrolled:us},
//                 erId},
//             {new:true}
//             )

//             if(!enrolledCourse){
//                 return res.status(500).json({
//                     success:false,
//                     message:"course not found"
//                 })
//             }

//             console.log(enrolledCourse);
//             // find student and add course to their list of course 

//             const enrolledStudent=await User.findByIdAndUpdate({_id:userId},{
//                 $push:{courses:courseId}
//             },
//             {new:true});

//             console.log(studentsEnrolled);

//             // mailSender 
//             const emailResponse=await mailSender(
//                 enrolledStudent.email,
//                 "Congretulation from studyNotion",
//                 "Congratulation ,you are onboarded into new CodeHelp Course",
//             )

//             console.log(emailResponse);

//             return res.status(200).json({
//                 success:true,
//                 message:"Signature verified and Course added"
//             })
//         } catch (error) {
//             consol.log(error);
//             return res.status(500).json({
//                 success:false,
//                 message:error.message,
//             })
            
//         }
//     }else{
//         return res.status(400).json({
//             success:false,
//             message:""
//         })
//     }

// }