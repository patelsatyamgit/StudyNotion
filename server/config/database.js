const mongoose=require("mongoose");
require("dotenv").config();

exports.connect= ()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=> console.log("Db  connection Successfuly"))
    .catch((errr)=>{
        console.log("DB Connection Failed");
        console.log(errr);
        process.exit(1);
    })
}