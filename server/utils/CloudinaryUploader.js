const cloudinary=require("cloudinary").v2;

exports.uploadFile=async (file,folder,height,quility)=>{
    option={
        folder,
    }
    if(height){
        option.height=height;
    }
    if(quility){
        option.quility=quility;
    }
    option.resource_type="auto"

    return  await cloudinary.uploader.upload(file.tempFilePath,option);
}