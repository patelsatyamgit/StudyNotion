import React, { useState } from 'react'
import {FiSave} from "react-icons/fi";
import { useSelector,useDispatch } from 'react-redux';
import { updateAbout } from '../../../../services/operations/update';
import { setUser } from '../../../../slices/profileSlice';

const EditAbout = () => {
    const {user}=useSelector((state)=>state.profile);
    const {token}=useSelector((state)=>state.auth);
    const about=user?.additionalDetails?.about ? (user?.additionalDetails?.about):"";
    const[About,setAbout]=useState(about);
    const dispatch=useDispatch();
    const onchangeHandle=(event)=>{
                setAbout(event.target.value);
    }
    const onclickHandle=()=>{
        dispatch(updateAbout(About,token)).then((result) => {
            const{firstName,_id,courseProgress,email,lastName,image,token,additionalDetails}=user;
            const objj={};
            objj.firstName=firstName;
            objj._id=_id;
            objj.courseProgress=courseProgress;
            objj.email=email;
            objj.lastName=lastName;
            objj.image=image;
            objj.additionalDetails={...additionalDetails,about:About};
            objj.token=token;
           
           localStorage.setItem("user",JSON.stringify(objj));
        })
    }

  return (
    <div className='mt-8'>
         <div className=' bg-richblack-800 py-4 px-2 md:px-7 rounded-sm   border-[1px] border-richblack-600     flex justify-between gap-3 flex-col md:flex-row'>
                <div className='md:flex-1 gap-3'>
                        <div className='flex flex-col gap-5'>
                            <p className='text-richblack-25 font-inter font-bold'>About</p>

                            <textarea name="about"
                            onChange={onchangeHandle} id="about" value={About} placeholder='write some thing about you' out className='bg-transparent  border-l-[1px] outline-none text-richblack-5 px-2 py-1'></textarea>

                        </div>
                </div>
                <div className='md:w-[10%]'>
                    <button onClick={onclickHandle} className='flex items-center gap-2 bg-yellow-200 rounded-lg px-3 py-1 text-black'>
                        <FiSave/>
                        <p>Save</p>
                    </button>
                </div>
            </div>
    </div>
  )
}

export default EditAbout;