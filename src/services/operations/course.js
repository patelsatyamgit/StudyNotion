import { toast } from "react-hot-toast"
import { apiConnector } from "../apiconnector";
import {courseEndpoint} from "../apis"

const {CREATECOURSE_URL,CREATESECTION_URL,UPDATESECTION_URL,DELETESECTION_URL,CREATESUBSECTION_URL,GETINSTRUCTOR_URL,DELETECOURSE_URL,UPDATESUBSECTION_URL,DELETESUBSECTION_URL,EDITCOURSE_URL,GETCOURSEDETAILS_URL,GEGCOURSEFULLDETAILS_URL,CREATERATINGAPI_URL,UPDATECOURSEPROGRESSAPI_URL,GETALLREVIEWAPI_URL,GETINSTRUCTORDESBOARDAPI_URL}=courseEndpoint;


export const  addCourseDetails= async(formdata,token)=>{
   
    const id=toast.loading("uploading....");
    let result=null;
        try {

            const response=await apiConnector("POST",CREATECOURSE_URL,formdata,{
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
                
            });

            // console.log("response data----",response);

            if(!response?.data?.success){
                toast.dismiss(id);
                toast.error("error in response");
                return;

            }

            toast.dismiss(id);
            toast.success("course added successfully");
            result=response?.data?.data
        } catch (error) {
            toast.dismiss(id);
            toast.error("error in api");
            console.log(error);
        }
        // console.log("result",result);
        return result;
    
}

export const updateSection=async (data,token)=>{
    let result=null
    const id=toast.loading("loading...");

    try {
        const response= await apiConnector("POST",UPDATESECTION_URL,data,{
            Authorization: `Bearer ${token}`,
        });

        // console.log("Update section api response",response);

        if(!response?.data?.success){
            throw new Error("could not create Section");
        }
        toast.success("Course Section updated")
        result=response?.data?.updatedCourse;
    } catch (error) {

        console.log("Update Section api error....",error);
        toast.error(error.message);
    }
    toast.dismiss(id);
    return result;
}
export const createSection=async (data,token)=>{
    let result=null
    const id=toast.loading("loading...");

    try {
        const response= await apiConnector("POST",CREATESECTION_URL,data,{
            Authorization: `Bearer ${token}`,
        });

        // console.log("Create section api response",response);

        if(!response?.data?.success){
            throw new Error("could not create Section");
        }
        toast.success("Course Section Created")
        result=response?.data?.UpdatedCourseDetail;
    } catch (error) {

        // console.log("Create Section api error....",error);
        toast.error(error.message);
    }
    toast.dismiss(id);
    // console.log("resultis,",result);
    return result;
}

export const editCourseDetails=async(formData,token)=>{
    const {CREATECOURSE_URL}=courseEndpoint;
    let result=null;
    const id=toast.loading("uploadding....");
        try {

            const response=await apiConnector("PUT",EDITCOURSE_URL,formData,{
                Authorization: `Bearer ${token}`,
                
              });

            // console.log("response data----",response);

            if(!response.data.success){
                toast.dismiss(id);
                toast.error("error in response");
                return;

            }

            toast.dismiss(id);
            toast.success("course added successfully");
            result=response.data.data;
            
        } catch (error) {
            toast.dismiss(id);
            toast.error("error in api");
            console.log(error);
            
        }

        return result;
}
// getInstructor Courses

export const getInstructorCourses = async(token)=>{
    const id=toast.loading("processing...");
    let result=null;
    try {
          const response=await apiConnector("GET",GETINSTRUCTOR_URL,null,{
                Authorization :`Bearer ${token}`
          })

        //   console.log("getInstructor courses response--",response);

          if(!response?.data?.success)
          {
             toast.dismiss(id);
             throw new Error("could not get INstructor  courses")
             return;
          }
          result=response.data.data;
          toast.success("ok")
    } catch (error) {
        console.log(error);
        toast.error("error in getting instructor courses")
    }
    toast.dismiss(id);
    return result;
}
export const  deleteSection= async(data,token)=>{
     const id=toast.loading("processing...");
     let result=null;
     try {
             const response=await apiConnector("POST",DELETESECTION_URL,data,{
                Authorization: `Bearer ${token}`,
             })

       
            //  console.log("DELETESECTION API RESPONSE----",response);
             if(!response?.data?.success)
             {
                toast.dismiss(id);
                throw new Error("could not delete section")
             }

             result=response?.data?.updatedCourse;

             toast.success("Deleted successfully");

     } catch (error) {
       
        toast.error("delete api error");
        console.log(error);
     }
     toast.dismiss(id);
     return result;
}
export const createSubSection=async (formData,token)=>{

    const id=toast.loading("loading....");
    let result=null;
    try {
        const response=await apiConnector("POST",CREATESUBSECTION_URL,formData,{
            Authorization: `Bearer ${token}`,
        })
        // console.log("CREATE SUBSECTION API RESPONSE ------",response);

        if(!response?.data?.success){
            throw new Error("error in response")
        }


        result =response?.data?.updatedCourse;

        toast.success("Lecture added success fully")
        
    } catch (error) {
        toast.error("Api error")
    }
    toast.dismiss(id);
    return result;



}

// delete course 
export const deletecourse=async(data,token)=>{
         
            const id=toast.loading("deleting course");
            try {

                     const response=await apiConnector("DELETE",DELETECOURSE_URL,data,{
                        Authorization: `Bearer ${token}`
                     });

                    //  console.log("DELETE COURSE API RESPONSE ---",response);

                     if(!response?.data?.success){
                        toast.dismiss(id);
                        throw new Error("Delete api me error")
                     }

                     toast.success("Course Delted successfull");
                
            } catch (error) {
                // console.log("api error");
                toast.error("error");
            }

            toast.dismiss(id);
          
           return;
}
export const updateSubsection=async(data,token)=>{
    const id=toast.loading("updating...");
    let result=null;
    try {
        
        const response=await apiConnector("post",UPDATESUBSECTION_URL,data,{
            Authorization:  `Bearer ${token}`
        })

        // console.log("Update section api Response --",response);

        if(!response?.data?.success){
            toast.dismiss(id);
            throw new Error("Update subsection api error");
        }
        result=response.data.data;
        toast.success("Course Updated successfully");
       
    } catch (error) {
        console.log("api error",error);
        toast.error("error")
    }
    toast.dismiss(id);

    return result;
}

export const deleteSubsection=async(data,token)=>{

      const id=toast.loading("deleting..");
      let result=null;
      try {
        
          const response=await apiConnector("DELETE",DELETESUBSECTION_URL,data,{
            Authorization: `Bearer ${token}`
          })

        //   console.log("Delete subsection api response----",response);

          if(!response?.data?.success){
            toast.dismiss(id);
            throw new Error("api error...");
          }
          result= response.data.data;

          toast.success("subsection deleted successfully");

      } catch (error) {
        console.log(error);
        toast.error("error in api call")
      }
      toast.dismiss(id);
      return result;
}

export const getCourseDetails=async(data)=>{
    const id=toast.loading("fetching...");
    let result=null;
    try {

        const response=await apiConnector("POST",GETCOURSEDETAILS_URL,data);

        // console.log("Course fetching api response",response);

        if(!response?.data?.success){
                 toast.error("response error");
                 throw new Error(response.message);
        }

        result=response?.data?.data;
        toast.success("course Data fetched success fully");
        
    } catch (error) {
        console.log(error);
        toast.error("error in api")
    }
    toast.dismiss(id);

    return result;

}

export const getcourseAllDetails= async(data,token)=>{
    const id=toast.loading("fetching data");
    let result;
    try {

        const response=await apiConnector("POST",GEGCOURSEFULLDETAILS_URL,data,{
            Authorization: `Bearer ${token}`,
        })
        // console.log("GETCOURSEALLDETAILS API RESPONSE--",response)

        if(!response?.data?.success){
            toast.error("error");
            throw new Error(response?.data?.message);
        }

         result=response?.data?.data;

         toast.success("data fetched successfully");
        
    } catch (error) {
        toast.error("api connection error");
        console.log(error);
    }
    toast.dismiss(id);
    return result;
}
export const createRating=async(Data,token)=>{
    try {
        const apiResponse= await apiConnector("POST",CREATERATINGAPI_URL,Data,{
            Authorization:`Bearer ${token}`
        })
        // console.log("CREATE rATING API RESPONSE---",apiResponse);
        if(!apiResponse?.data?.success){
            toast.error("error");
        }
        toast.success("Rating submited successfully");
    } catch (error) {
        console.log(error);
        toast.error("error in api calll");
    }

    return;
}

export const updateCourseProgress = async(data,token)=>{

    try {
        const apiResponse= await apiConnector("POST",UPDATECOURSEPROGRESSAPI_URL,data,{
            Authorization:`Bearer ${token}`
        })
        // console.log("Update completed mark API RESPONSE---",apiResponse);
        if(!apiResponse?.data?.success){
            toast.error("error");
        }
        toast.success("Completed mark  successfully");
    } catch (error) {
        console.log(error);
        toast.error("error in api calll");
    }

  
    return;
}

export const getAllReviews=async()=>{
    let result;
    try {
        const response=await apiConnector("GET",GETALLREVIEWAPI_URL)
        // console.log("GET ALL REVIEW API RESPONSE---",response);

        if(!response?.data?.success){
            toast.error("error");
            throw new Error(response?.data?.message);
        }

        result=response?.data?.data;
        toast.success(
           "successfull get Reviews"
        )

    } catch (error) {
        console.log(error);
    }

    return result;
}

export const getInstructorDeskboard=async(token)=>{
      const id=toast.loading("loading");
      let result;
      try {

                const response=await apiConnector("GET",GETINSTRUCTORDESBOARDAPI_URL,null,{
                    Authorization:`Bearer ${token}`
                })

                // console.log("GetInstructorDesktopDetailsapi response----",response);

                if(!response?.data?.success){
                    toast.error("error");
                    throw new Error(response?.data?.message)
                }
                result=response?.data?.data;

                toast.success("Instructor details fetched successfully");
        
      } catch (error) {
        console.log(error);
        toast.error("Error in api call");
      }
      toast.dismiss(id);
      return result;
}