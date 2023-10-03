import React, { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux';

import Button from '../Componets/core/Home/Button';
import { BiArrowBack } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { resetPasswordToken } from '../services/operations/authAPI';
import "../App.css";
const ResetPasswordToken = () => {
    const [email,setemail]=useState("");
    const [emailsent,setemailsent]=useState(false);
    const {loading}=useSelector((state)=> state.auth);
    const dispatch=useDispatch();
    // console.log(loading);
    const handlesubmit= (e)=>{
          e.preventDefault();
          dispatch(resetPasswordToken(email,setemailsent))
    }
  return (
    <div className='w-full h-[100vh] bg-richblack-900 flex justify-center items-center pt-[10vh] '>
             {
                loading?(
                    <div>
                        <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                    </div>

                ):(
                    <div className='w-[90%] md:w-[30%] h-fit flex flex-col gap-4 '>
                        <h2 className='text-richblack-200 font-inter font-bold text-xl'>
                            {
                                emailsent?"Check email":"Reset your password"
                            }
                        </h2>
                        <p className='text-richblack-600 font-inter text-sm'>
                            {
                                emailsent? `We have sent the reset email to
                                ${email}`:"Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                            }
                        </p>
                        {
                       
                                <form onSubmit={handlesubmit} className='flex flex-col gap-3'>
                                   {
                                    emailsent?"":(
                                        <div className='flex
                                        flex-col gap-3'>
                                    <label className='text-richblack-300 text-sm' for="emailfield">Email Address<sup className='text-pink-500 text-sm'>*</sup></label>
                                    <input required className='bg-richblack-800 text-richblack-50 placeholder:text-sm px-2 py-2 rounded-lg' type='email' name='emailfield' value={email} placeholder='Enter your email here' onChange={(e)=>setemail(e.target.value)}/>
                                    </div>

                                    )
                                   }

                                    <button type="submit" className='w-full bg-yellow-100 py-3 font-inter font-bold rounded-lg'>
                                        {emailsent?"Resend Email":"Send Email"}
                                    </button>

                                </form>
                            
                        }
                        <div className='text-richblack-100 '>
                            <Link to="/login" className='flex gap-3  items-center'>
                            <BiArrowBack/>
                            <p>
                                Back to login
                            </p>
                            </Link>
                           

                        </div>
                    </div>
                )
             }

    </div>
  )
}

export default ResetPasswordToken;
