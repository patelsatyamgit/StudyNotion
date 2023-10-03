import React from 'react'
import { useSelector } from 'react-redux';
import {FiEdit}  from "react-icons/fi"
import { useNavigate } from 'react-router-dom';
const Myprofile = () => {
    const {user}=useSelector((state)=>state.profile);
    const navigate=useNavigate();
  return (
    <div className=' px-4 py-4 w-11/12  '>
        <h1 className=' font-inter font-bold text-white text-2xl'>My Profile</h1>
        <div className='md:px-14 mt-10 flex flex-col gap-7 '>
            <div className=' bg-richblack-800 py-7 px-2 md:px-10 rounded-sm   border-[1px] border-richblack-600      flex md:justify-between items-start md:items-center flex-col justify-start md:flex-row gap-5 '>
                <div className='flex gap-3'>
                        <div>
                            <img  className=' w-[80px] h-[80px] rounded-full hover:scale-150 transition-all duration-200 shadow-richblack-300 flex '  src={user?.image} alt="" />
                        </div>
                        <div>
                            <p className='text-richblack-25 font-inter font-bold'>{user?.firstName+" "+user?.lastName}</p>
                            <p className='text-sm text-richblack-400'> {user?.email}</p>

                        </div>
                </div>
                <div className='flex justify-end items-end'>
                    <button onClick={()=>navigate("/dashboard/setting")} className='flex items-center gap-2 bg-yellow-200 rounded-lg px-5 py-2 text-black'>
                        <FiEdit/>
                        <p>Edit</p>
                    </button>
                </div>
            </div>
            <div className=' bg-richblack-800 py-7 px-2 md:px-10 rounded-sm   border-[1px] border-richblack-600   flex md:justify-between justify-start items-start gap-5 md:items-center  flex-col md:flex-row'>
                <div className='flex-1 gap-3'>
                        <div className='flex flex-col gap-5'>
                            <p className='text-richblack-25 font-inter font-bold'>About</p>
                            <p className='text-sm text-richblack-400'> {user?.additionalDetails.about ?(user?.additionalDetails?.about):"write something about you |"}</p>

                        </div>
                </div>
                <div className='w-[10%]'>
                    <button onClick={()=>navigate("/dashboard/setting")} className='flex items-center gap-2 bg-yellow-200 rounded-lg px-5 py-2 text-black'>
                        <FiEdit/>
                        <p>Edit</p>
                    </button>
                </div>
            </div>

            <div className=' bg-richblack-800 py-8 px-2 md:px-10 rounded-sm  border-[1px] border-richblack-600   flex md:justify-between flex-col justify-start md:flex-row gap-5'>
                <div className='flex-1 gap-3'>
                        <div className='flex flex-col gap-5'>
                            <p className='text-richblack-25 font-inter font-bold'>Personal Details</p>
                           <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            <div>
                                <p className='text-richblack-400 font-inter'>FirstName</p>
                                 <p className='text-richblack-25 font-inter'>{user?.firstName}</p>
                            </div>
                            <div>
                              <p className='text-richblack-400 font-inter'>LastName</p>
                                 <p className='text-richblack-25 font-inter'>{user?.lastName}</p>
                            </div>
                            <div>
                                <p className='text-richblack-400 font-inter'>EmailId</p>
                                 <p className='text-richblack-25 font-inter'>{user?.email}</p>

                            </div>
                            <div>
                                <p className='text-richblack-400 font-inter'>Mobile Number</p>
                                 <p className='text-richblack-25 font-inter'>{user?.additionalDetails?.contactNumber ?(user?.additionalDetails?.contactNumber):"Please add your contact number"}</p>
                            </div>
                            <div>
                                <p className='text-richblack-400 font-inter'>Date of Birth</p>
                                 <p className='text-richblack-25 font-inter'>{user?.additionalDetails?.dateOfBirth ?(user?.additionalDetails?.dateOfBirth):"Please add your Date of birth"}</p>
                            </div>
                            <div>
                                <p className='text-richblack-400 font-inter'>Gender</p>
                                 <p className='text-richblack-25 font-inter'>{user?.additionalDetails?.gender ?(user?.additionalDetails?.gender):"Please add your gender"}</p>
                            </div>
                             
                           </div>

                        </div>
                </div>
                <div className='w-[10%]'>
                    <button onClick={()=>navigate("/dashboard/setting")} className='flex items-center gap-2 bg-yellow-200 rounded-lg px-5 py-2 text-black'>
                        <FiEdit/>
                        <p>Edit</p>
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}


export default Myprofile;