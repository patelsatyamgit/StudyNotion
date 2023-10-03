import React from 'react'
import {AiTwotoneDelete} from "react-icons/ai"
import { useDispatch, useSelector } from 'react-redux'
import { deleteProfile } from '../../../../services/operations/update';
import { useNavigate } from 'react-router-dom';

const DeleteProfile = () => {
    const dispatch=useDispatch();
    const {token}=useSelector((state)=>state.auth);
    const navigate=useNavigate();
    const deleteProfileHandler=()=>{

        dispatch(deleteProfile(token,navigate));
    }
  return (
    <div className='bg-pink-900 mt-8 px-2 md:px-10 py-4 rounded-md'>
        <div className='flex items-center gap-5 flex-col md:flex-row'>
            <div>
                   <  AiTwotoneDelete className=' w-[60px] h-[60px] bg-pink-600 rounded-full text-pink-300 '/>
            </div>
            <div className='md:w-[60%]'>
                <h1 className='text-2xl text-richblack-25 font-inter'>Deltete Account</h1>
                <p className='text-pink-25 font-inter text-sm'>Would you like to delete account?</p>
                <p className='text-pink-25 font-inter text-sm'>This account may contain Paid Courses. Deleting your account is permanent and will remove all the contain associated with it.</p>

              <button onClick={deleteProfileHandler} className='font-inter italic text-pink-50 mt-3'>I want to delete my account</button>

            </div>
        </div>
    </div>
  )
}

export default DeleteProfile;
