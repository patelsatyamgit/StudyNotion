import { toast } from "react-hot-toast";
import {apiConnector}  from "../apiconnector";
import { updateProfile } from "../apis";
import { setUser } from "../../slices/profileSlice";
import { logout } from "./authAPI";

const {UPDATEPROFILEPICTURE_URL,UPDATEABOUT_URL,UPDATEINFO_URL,CHANGEPASSWORD_URL,DELETEPROFILE_URL,GETENROLLEDCOURSEAPI_URL}=updateProfile;
export function uploadProfile(formdata,token){

   
    return async(dispatch)=>{
      const id =toast.loading("Uploading");
      try {
        const response=await apiConnector("PUT",UPDATEPROFILEPICTURE_URL,formdata,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        });
           
        if(!response.data.success){
          toast.error("error");
        }else{
          toast.success("file uploaded successfully")
          toast.dismiss(id);
          return response;
        }

      

      } catch (error) {
          toast.error('file uploaded error');
          console.log(error)
          toast.dismiss(id);
      }
    }
  }
  export function updateInfo(formdata,token,user){
        const id=toast.loading("Save...");
       return async(dispatch)=>{

                    try {
                        const response=await apiConnector("PUT",UPDATEINFO_URL,formdata,{
                            Authorization: `Bearer ${token}`
                        })

                        // console.log("update info ---response",response);

                        if(!response.data.success){
                            toast.error("error in updation");
                            toast.dismiss(id);
                            return;
                        }

                        const userImage = response.data.updateduserDetails.image
        ? response.data.updateduserDetails.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updateduserDetails.firstName} ${response.data.updateduserDetails.lastName}`




                        const newobjj={...user,image:userImage,additionalDetails:response.data.updatedabout};
                        setUser(newobjj)
                        toast.dismiss(id);
                        toast.success("Updated successfully")
                        localStorage.setItem("user",JSON.stringify(newobjj))
                        return
                                    
                    } catch (error) {
                        toast.dismiss(id);
                        toast.error("there is something error in updation")
                        console.log(error);
                        return;
                    }
            
       }
  }
  export function updateAbout(about,token){
    

    return async(dispatch)=>{
        const id=toast.loading("Save...");
        try {

             const response=await apiConnector("PUT",UPDATEABOUT_URL,{about:about}, {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              })


              // console.log("data",response)
              if(!response.data.success){
                toast.error("error in uploading");
              }else{
                toast.success("successfully updated to see changes relogin");
              }

              toast.dismiss(id);
            
        } catch (error) {
            toast.error('about uploaded error');
            console.log(error)
            toast.dismiss(id);
            
        }
    }
  }
  export function changePassword(formdata,token){
    return async(dispatch)=>{
      const id=toast.loading("updating....");
      try {
               const response=await apiConnector("POST",CHANGEPASSWORD_URL,formdata, {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              })
               

               if(!response.data.success){
               
                toast.error(response.data.message);
                toast.dismiss(id);
                return;
              }else{
                toast.success("successfully updated to see changes relogin");
              }

              // console.log("PASSWORD UPDATE API RESPONSE ---",response);


              toast.dismiss(id);
               
      } catch (error) {
         toast.error("error");
         console.log(error);
         toast.dismiss(id);
        
      }
    }
  }
  export const getEnrolledCourses=async(token)=>{
            const id=toast.loading("loading....");
            let result;
            try {

                    const response=await apiConnector("GET",GETENROLLEDCOURSEAPI_URL,null,{
                            Authorization: `Bearer ${token}`,
                    })

                    // console.log("GETENROLLED COURSES API RESPONSE...",response);

                    if(!response?.data?.success){
                             toast.error(response?.data?.message);
                             throw new Error(response?.data?.message);
                    }

                    result=response?.data?.data;
              
            } catch (error) {
              console.log(error);

                toast.error("error in axios calling");
            }
          toast.dismiss(id);
          return result
  }
  export function deleteProfile(token,navigate){
    return async(dispatch)=>{
      const id=toast.loading("delete your profile...");
      try {
        
        apiConnector("DELETE",DELETEPROFILE_URL,null,{
          Authorization: `Bearer ${token}`,
          
        })

          toast.success("Account deleted successfully");
          
            // console.log("DELETE PROFILE API RESPONSE--",response);

            dispatch(logout(navigate))
            toast.dismiss(id);
      } catch (error) {
        console.log(error);
        toast.error("error in api");
        toast.dismiss(id);
        
      }
    }
  }