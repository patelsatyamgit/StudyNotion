const express=require("express");
const app=express();

const userRoutes=require("./routes/User");
const profileRoutes=require("./routes/Profile");
const paymentRoutes=require("./routes/Payments");
const courseRoutes=require("./routes/Course");

const {contactusMail}=require("./controllers/MailContactus");

const database= require("./config/database");
const cookieParser =require("cookie-parser");
const cors=require("cors");
const {cloudinaryConnect}=require("./config/cloudinary")
const fileUpload =require("express-fileupload");
const dotenv=require("dotenv");

dotenv.config();
const PORT =process.env.PORT || 4000;

// database connection 

database.connect();

//middlewares

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin:"https://finalstudynotion.onrender.com",
        credentials:true,

    })
)
app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp"
    })
)

//cloudinary connection

cloudinaryConnect()

// routes 

app.use("/auth",userRoutes);
app.use("/profile",profileRoutes);
app.use("/course",courseRoutes);
app.use("/payment",paymentRoutes);

app.listen(PORT,()=>{
    console.log(`app is running at ${PORT}`)
})
app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"your server is up and running"
    });
})
