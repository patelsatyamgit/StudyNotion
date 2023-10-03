import React, { useState } from 'react'
import Button from '../Componets/core/Home/Button';
import {PiArrowCircleRightBold} from "react-icons/pi"
import { Link, Navigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { useLocation,useNavigate} from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import {AiFillEyeInvisible,AiFillEye} from "react-icons/ai"
import "../App.css"
import { updatePassword } from '../services/operations/authAPI';
import { useHistory } from 'react-router-use-history'
const Updatepassword = () => {
    const [showpass,setshowpass]=useState(false);
    const [showconfpass,setconfpass]=useState(false);
    const {loading}=useSelector((state)=>state.auth);
    const [update,setupdate]=useState(false);
    const history=useHistory();
    const [formdata,setformdata]=useState({
        password:"",
        confirmpass:"",
    })
    const navigate=useNavigate();
    const {password,confirmpass}=formdata;
    const location=useLocation();
    const dispatch=useDispatch();
    const handleOnchange=(e)=>{
                setformdata((prev)=>(
                    {
                        ...prev,
                        [e.target.name]:e.target.value
                    }
                ))
    }
    const submitHandler=(e)=>{
        e.preventDefault();
        const token=location.pathname.split("/").at(-1);
        dispatch(updatePassword(password.trim(),confirmpass.trim(),token,setupdate));
    }

  return (
    <div className='w-full h-[100vh] bg-richblack-900 flex justify-center items-center py-32'>
        {
            loading?(
                <div>
                        <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                    </div>

            ):(
                <div className='flex flex-col gap-2 w-[90%] md:w-[40%]'>
            <h2 className='text-3xl font-inter font-bold text-richblack-50'>
               {update?"Successfully Updated":"Create New Password"}
            </h2>
            <p className='text-md text-richblack-200'>{
                update?"You have updated your password now you can login with your new password":"Almost done. Enter your new password and you are all set."
}</p>
          {
            update?"":(
                <form onSubmit={submitHandler} className='flex flex-col gap-4'>
                <div className='flex flex-col'>
                    <label className='text-lg text-richblack-200' for="password">New password<sup className='text-pink-400 text-sm'>*</sup></label>
                    <div className='flex w-full bg-richblack-800 rounded-xl relative'>
                    <input onChange={handleOnchange} value={password} name='password' required className='w-[90%] h-full bg-richblack-800 px-3 py-3 outline-none  rounded-xl relative text-richblack-50' type={showpass?"text":"password"} />
                    <button type='button' className='text-3xl text-richblack-50 absolute right-[5%] top-[20%] 'onClick={(e)=>{
                        e.preventDefault();
                        setshowpass((pre)=> !pre);

                    }}>
                        {
                            showpass?<AiFillEyeInvisible/>:<AiFillEye/>
                        }
                    </button>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <label className='text-lg text-richblack-200' for="confirmpass">Confirm New password<sup className='text-pink-400 text-sm'>*</sup></label>
                    <div className='flex w-full bg-richblack-800 rounded-xl relative'>
                    <input value={confirmpass} onChange={handleOnchange} required className='w-[90%] h-full bg-richblack-800 px-3 py-3 outline-none rounded-xl relative text-richblack-50' type={showconfpass?"text":"password"} name='confirmpass'/>
                    <button className='text-3xl text-richblack-50 absolute right-[5%] top-[20%] ' onClick={(e)=>{
                                     e.preventDefault();
                                     setconfpass((pre)=> !pre);
                    }
                    } >
                        {
                            showconfpass?<AiFillEyeInvisible/>:<AiFillEye/>
                        }
                    </button>
                    </div>
                   
                </div>
                <div className='flex flex-wrap gap-3'>
                    <div className='flex gap-3 text-[18px] text-richblack-600 items-center justify-center'> 
                    <PiArrowCircleRightBold/>
                    <p>one lowercase character</p>
                    </div>
                    <div className='flex gap-3 text-[18px] text-richblack-600 items-center justify-center'>
                    <PiArrowCircleRightBold/>
                    <p>one special character</p>
                    </div>
                    <div className='flex gap-3 text-[18px] text-richblack-600 items-center justify-center'>
                    <PiArrowCircleRightBold/>
                    <p>one uppercase character</p>
                    </div>
                    <div className='flex gap-3 text-[18px] text-richblack-600 justify-center items-center'>
                    <PiArrowCircleRightBold/>
                    <p>8 character minimum</p>
                    </div>
                    <div className='flex gap-3 text-[18px] text-richblack-600 justify-center items-center'>
                    <PiArrowCircleRightBold/>
                    <p>one number</p>
                    </div>
                </div>
                
                  

                        <button  type="submit" className='w-full bg-yellow-100 py-3 rounded-lg font-inter font-bold' >Update password</button>

                    
               
                <div className='text-richblack-100 '>
                            <Link to="/login" className='flex gap-3  items-center'>
                            <BiArrowBack/>
                            <p>
                                Back to login
                            </p>
                            </Link>
                           

                        </div>
            </form>
            )
          }
            
                {
                    update?(
                        <div onClick={(e)=>{
                                    e.preventDefault();
                                    history.replace("/")
                                    navigate("/login")
                        }}>
                             <Button active={true}   >login page</Button>
                        </div>
                       
                    ):(
                        ""
                    )
                }   
        </div>

            )
        }
       
    </div>
  )
}
export default Updatepassword;
