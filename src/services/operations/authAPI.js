import { toast } from "react-hot-toast";
import {enpoints} from "../apis"
import { setLoading, setTimeout } from "../../slices/authSlice";
import {apiConnector}  from "../apiconnector";
import { setToken } from "../../slices/authSlice";
import {setUser} from "../../slices/profileSlice"
import { resetCart } from "../../slices/cartSlice";
import ResetPasswordToken from "../../Pages/ResetPasswordToken";
import { updateProfile } from "../apis";
import {contact} from "../apis"


const {SENDOTP_API,SIGNUP_API,LOGIN_API,RESETPASSTOKEN_API,RESETPASSWORD_API}=enpoints;
const {CONTACTUSMAIL_API}=contact;




export function sendOtp(email,navigate){
  
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try {
            
            const response = await apiConnector("POST",SENDOTP_API,{email,checkUserPresent:true});

            // console.log("SENDOTOP API RESPONSE .....",response);
            // console.log(response.data.success);

            if(!response.data.success){
                toast.error(response.data?.message);
                // throw new Error(response.data?.message);
            }

            toast.success("OTP Sent Successfully");
            navigate("/verify-email");
        } catch (error) {
            // console.log("SENDOTP API ERROR......",error);
            if(error.response.status == 409){
              toast.success("User already register please login");
            
              navigate("/login")}
        }
        dispatch(setLoading(false));
    }
}

export function signUp(
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate
){
    return async(dispatch)=>{
        const toastId=toast.loading("Lodiing...");
        dispatch(setLoading(true));
        try {
            const response=await apiConnector("POST",SIGNUP_API,{
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp,
            })

            // console.log("SIGNUP API RESPONSE........",response);

            if(!response.data.success){
                toast.dismiss(toastId);
                toast.error("signupERROR");
                throw new Error(response.data.message);
            }


            toast.success("Signup successful");
            navigate("/login");
        } catch (error) {
            // console.log("SIGNUP API ERROR....",error);
            toast.error("Signup Failed");
            navigate("/signup");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function login(email, password, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", LOGIN_API, {
          email,
          password,
        })
  
        // console.log("LOGIN API RESPONSE............", response)
  
        if (!response.data.success) {
          toast.dismiss(toastId);
          toast.error("Login error");
          throw new Error(response.data.message)
        }
  
        toast.success("Login Successful")
        dispatch(setToken(response.data.token))
        localStorage.setItem("timeout",JSON.stringify(Date.now() + 3 * 24 * 60 * 60 * 1000 ));
        dispatch(setTimeout(Date.now() + 3 * 24 * 60 * 60 * 1000 ))
        const userImage = response.data?.user?.image
          ? response.data.user.image
          : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
        dispatch(setUser({ ...response.data.user, image: userImage }))
        localStorage.setItem("token", JSON.stringify(response.data.token))
        localStorage.setItem("user",JSON.stringify(response.data.user));
        localStorage.setItem("profilepic",JSON.stringify(response.data.user?.image));
        navigate("/dashboard/my-profile")
      } catch (error) {
        toast.error("Login Failed")
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }
  export function logout(navigate) {
    return (dispatch) => {
      dispatch(setToken(null))
      dispatch(setUser(null))
      dispatch(resetCart())
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      toast.success("Logged Out")
      navigate("/")
    }
  }
  export function resetPasswordToken(email,setemailSent){
    return async(dispatch) =>{
      dispatch(setLoading(true));
      try {
        const response=await apiConnector("POST",RESETPASSTOKEN_API,{email,})

        // console.log("Resetpassword token response",response);

        if(!response.data.success){
                  toast.error("resetpasswordtoken api error")
                  throw new Error(response.data.message);
        }
        toast.success("ResetEmail sent successfully")
        setemailSent(true);

        dispatch(setLoading(false));
        
      } catch (error) {
          toast.error("ResetPasswordTokenError")
          // console.log(error);
      }
    }

  }
  export function updatePassword(password,confirmpassword,token,setupdate){
    return async(dispatch)=>{
      dispatch(setLoading(true));
      try{
          const response=await apiConnector("POST",RESETPASSWORD_API,{password,confirmpassword,token});

          // console.log("UPDATE PASSWORD API RESPONSE",response);

          if(!response.data.success){
            toast.error("update password error");
            throw new Error(response.data.message);
          }
          toast.success("Password update successfully");
          setupdate(true);

          dispatch(setLoading(false));
      }
      catch(error){
        toast.error("update password api error");
        console.log(error);
      }
    }
  }
  export function sendmailContectus(firstname,lastname,Email,Phone,message,code){
    return async (dispatch)=>{
      const id=toast.loading("Loading");
      try {

                  const response=await apiConnector("POST",CONTACTUSMAIL_API,{firstname:firstname,lastname:lastname,Email:Email,Phone:Phone,message:message,code:code});
                  // console.log("CONTACT US MAIL SENDER API RESPONSE",response);
                  if(!response.data.success){
                    toast.dismiss(id);
                    throw Error(response.message);
                  }

                  toast.dismiss(id);
                  toast.success("Message sent success fully")
        
      } catch (error) {

          //  toast.error("there is someting error in message sending")
           console.log(error);
           toast.dismiss(id);

      }
    }
  }