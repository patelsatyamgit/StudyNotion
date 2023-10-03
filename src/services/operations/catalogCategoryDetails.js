import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { categoryEndpoint } from "../apis";

const {GETCATEGORYDETAILS_URL}=categoryEndpoint;
export  const getcategoryDetails=async(categoryIdv)=>{
    let result=null;
    const id=toast.loading("Loading..");
    try {
        // console.log("lolo",categoryIdv)
        const response=await apiConnector("POST",GETCATEGORYDETAILS_URL,{categoryId:categoryIdv});
        // console.log("Api response--",response)
        if(response?.data?.data?.success){
            toast.error("error in response");
            throw new Error("error");
        }

        result=response?.data?.data;

        // toast.success("Data fatching succussesfull");
        
    } catch (error) {
        console.log(error);
    }

    toast.dismiss(id);
    return result;
}