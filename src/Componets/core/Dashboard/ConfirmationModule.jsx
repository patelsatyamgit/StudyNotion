import React from 'react'
import Button from '../Home/Button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../services/operations/authAPI';

const ConfirmationModule = ({set}) => {
   const dispatch=useDispatch();
   const navigate=useNavigate();
  return (
    <div onClick={()=>{set(false)}} className='bg-richblack-400 fixed bg-opacity-25 w-full h-screen z-50 '>

        <div className='bg-richblack-800 w-[90%] md:w-[350px] p-5 z-20 rounded-lg absolute left-[50%] top-[50%]  -translate-y-[50%] -translate-x-[50%] ' >
            <h1  className='text-richblack-5 font-inter font-bold text-2xl relative'>You are Going to Log out</h1>
            <p className='text-richblack-400 font-inter'>Are you sure</p>
            <div className='flex justify-between mt-10'>
                <Button active={true}>
                <button onClick={(e)=>
                {
                    e.stopPropagation();
                    dispatch(logout(navigate))
                }} active={true}>
                       I am sure
                </button>
                </Button>
                <Button active={true}>
                       Cancle
                </Button>
            </div>
        </div>


    </div>
  )
}

export default ConfirmationModule;