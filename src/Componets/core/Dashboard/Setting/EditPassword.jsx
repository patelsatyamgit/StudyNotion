import React, { useState } from 'react'
import {AiOutlineEyeInvisible,AiOutlineEye} from "react-icons/ai"
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../../../services/operations/update';
const EditPassword = () => {
    const [showcurPassword,setShowcurPassword]=useState(false);
    const [shownewPassword,setShownewPassword]=useState(false);
    const [curpassword,setcurpassword]=useState("");
    const [newpassword,setnewpassword]=useState("");
    const dispatch=useDispatch();
    const {token}=useSelector((state)=>state.auth);

    const onclickHandler=(e)=>{
            e.preventDefault();
            const formdata=new FormData();
            formdata.set("oldPassword",curpassword);
            formdata.set("newPassword",newpassword);

            try {
                dispatch(changePassword(formdata,token))
                setcurpassword("");
                setnewpassword("");
            } catch (error) {
                console.log(error);
                
            }
           

    }
  
  return (
    <div className='bg-richblack-800 mt-10 px-2 md:px-10 pt-7 rounded-md   border-[1px] border-richblack-600  '>
        <h1 className='text-richblack-25 font-inter text-2xl '>Password</h1>
        <div className='flex mt-5 justify-evenly flex-col md:flex-row'>
            <div className='relative'>
                <label className='text-richblack-400' htmlFor="curPass">Current Password</label>
                <input
                        required
                        type={showcurPassword ? "text" : "password"}
                        name="curpassword"
                        value={curpassword}
                        onChange={(e)=>setcurpassword(e.target.value)}
                        placeholder="Enter Password"
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] pr-12 text-richblack-5"
                        />
                        <span
                        onClick={() => setShowcurPassword((prev) => !prev)}
                        className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                        >
                        {showcurPassword ? (
                            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                        ) : (
                            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                        )}
                        </span>

            </div>
            <div className='relative'>
                    <label className='text-richblack-400' htmlFor="curPass">New Password</label>
                    <input
                    required
                    type={shownewPassword ? "text" : "password"}
                    name="newpassword"
                    value={newpassword}
                    onChange={(e)=>setnewpassword(e.target.value)}
                    placeholder="Enter New Password"
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] pr-12 text-richblack-5"
                    />
                    <span
                    onClick={() => setShownewPassword((prev) => !prev)}
                    className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                    >
                    {shownewPassword ? (
                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                    ) : (
                        <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                    )}
                    </span>

            </div>

        </div>
        <div className='flex w-full justify-end gap-6'>
            <button className='text-richblack-25 bg-richblack-700 mt-16 mb-5 w-fit  px-4 rounded-lg  py-2 ' onClick={(e)=>{
                setcurpassword("");
                setnewpassword("")
           
            }}>
                      cancel
            </button>
           <button onClick={onclickHandler} className='text-richblack-900 bg-yellow-300 mt-16 mb-5 w-fit  px-6 rounded-lg  py-2 '>Save</button>
           </div>
    </div>
  )
}


export default EditPassword;