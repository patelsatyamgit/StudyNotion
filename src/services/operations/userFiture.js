import toast from "react-hot-toast";
import { paymentEnpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import rzpimage from "../../assets/Logo/Logo-Full-Dark.png"
import { setpaymentloading } from "../../slices/corse";
import { removeFromCart } from "../../slices/cartSlice";
const {CREATEORDERAPI_URL,PAYMENTSUCCESSEMAIL_URL,VARIFYPAMENTAPI_URL}=paymentEnpoints;

function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script")
      script.src = src
      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
      }
      document.body.appendChild(script)
    })
  }
  
export async function BuyCourse(token,courses,user_details,navigate,dispatch){
    const id=toast.loading("Loading...");
    try {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

        if(!res){
            toast.error(" Razorpay SDK failed to load. Check your Internet Connection")
            return
        }

        const orderResponse= await apiConnector("POST",CREATEORDERAPI_URL,{courses,},{
            Authorization: `Bearer ${token}`,
        })

        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message);
        }

        // console.log("PAYMENT RESPONSE FROM BACKEND.......",orderResponse);

        const options={
            key:process.env.RAZORPAY_KEY,
            currency: orderResponse.data.data.currency,
            amount:`${orderResponse.data.data.amount}`,
            order_id:orderResponse.data.data.id,
            name:"StudyNotion",
            description:"Thank you for Purchasing the Course.",
            image:rzpimage,
            prefill: {
                name: `${user_details.firstName} ${user_details.lastName}`,
                email: user_details.email,
              },
              handler: function (response) {
                // console.log("hellow",response);
                // sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token)
                verifyPayment({ ...response, courses }, token, navigate, dispatch)
              },
        }
        const paymentObject= new window.Razorpay(options);

        paymentObject.open();
        paymentObject.on("payment failed",function(response){
            toast.error("Oops ! Payment Failed");
            console.log(response.error);
        })

    } catch (error) {
        console.log("PAYMENT API ERROR............", error)
        toast.error("Could Not make Payment.") 
    }
    toast.dismiss(id);
} ;


// Verify the Payment
async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying Payment...")
    dispatch(setpaymentloading(true))
    // console.log("0000vv---",bodyData)
    try {
      const response = await apiConnector("POST",VARIFYPAMENTAPI_URL, bodyData, {
        Authorization: `Bearer ${token}`,
      })
  
      // console.log("VERIFY PAYMENT RESPONSE FROM BACKEND............", response)
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
  
      toast.success("Payment Successful. You are Added to the course ")
      navigate("/dashboard/enrolled-courses")
      bodyData.courses.map((item)=>{
        dispatch(removeFromCart(item))
          return;
      })
      
    } catch (error) {
      // console.log("PAYMENT VERIFY ERROR............", error)
      toast.error("Could Not Verify Payment.")
    }
    toast.dismiss(toastId)
    dispatch(setpaymentloading(false))
  }
  
// async function sendPaymentSuccessEmail(response, amount, token) {
//     try {

//         //  console.log("response-----",response);
//       await apiConnector(
//         "POST",
//         PAYMENTSUCCESSEMAIL_URL,
//         {
//           orderId: response.razorpay_order_id,
//           paymentId: response.razorpay_payment_id,
//           amount,
//         },
//         {
//           Authorization: `Bearer ${token}`,
//         }
//       )
//     } catch (error) {
//       console.log("PAYMENT SUCCESS EMAIL ERROR............", error)
//     }
//   }
