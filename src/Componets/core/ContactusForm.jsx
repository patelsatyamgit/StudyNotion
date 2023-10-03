import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import Footeger from '../../common/Footeger';
import contrycode from '../../data/countrycode';
import  {sendmailContectus,}  from '../../services/operations/authAPI'
import { useDispatch } from 'react-redux';
import UsersReview from './Home/UsersReview';

const ContactusForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState:{errors,isSubmitted}
    }=useForm()
  
    const [code,setcode]=useState("+91");
    const dispatch=useDispatch();
    const contactUsFormHandle=(data)=>{
        // console.log(code)
        const {firstname,lastname,Email,Phone,message}=data;
        // console.log(firstname,lastname,message)
        dispatch(sendmailContectus(firstname,lastname,Email,Phone,message,code));
       
    }
  return (
            <div className='w-full relative'>
                 <div className=' w-[90%] md:w-[30%] mx-auto flex flex-col gap-4'>
        <div>
            <h1 className='text-xl text-center text-richblack-5 font-inter font-bold'>Get in Touch</h1>
            <p className='text-sm text-center text-richblack-400'>We'd love to here for you,Please fill out this form.</p>
        </div>
        <div>
            <form onSubmit={handleSubmit(contactUsFormHandle)} className='flex flex-col gap-2'>
                <div className='flex flex-wrap md:flex-nowrap w-full gap-2 justify-between'>
                    <div className='flex-col flex w-full'>
                        <label htmlFor="firstname" className='text-richblack-300 font-inter text-sm'>First Name</label>
                        <input type="text" id='firstname' name='firstname' {...register('firstname',{required:true})} className='bg-richblack-800 px-2 rounded-xl py-2 text-richblack-50' placeholder='first name' />
                        {
                            errors.firstname && <span className='text-pink-700'>First name required</span>
                        }
                    </div>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="lastname" className='text-richblack-300 font-inter text-sm'>Last Name</label>
                        <input type="text"  id='lastname' name='lastname' {...register('lastname',{required:true})} className='bg-richblack-800 px-2 rounded-xl py-2 text-richblack-50' placeholder='last name' />
                        {
                            errors.lastname && <span className='text-pink-700'>Last name required</span>
                        }
                    </div>
                </div>
                <div className='flex flex-col'>
                <label htmlFor="Email" className='text-richblack-300 font-inter text-sm'>Email Address</label>
                        <input type="email" id='Email' name='Email' {...register('Email',{required:true})} className='bg-richblack-800 px-2 rounded-xl py-2 text-richblack-50' placeholder='Email ' />
                        {
                            errors.Email && <span className='text-pink-700'>Email required</span>
                        }
                </div>
                <div className='flex flex-col'>
                <label htmlFor="Phone" className='text-richblack-300 font-inter text-sm'>Mobile Number</label>
                       <div className='flex justify-between '>
                        <div className='w-[20%]'>
                            <select name="citycode" className='w-full py-2 rounded-lg bg-richblack-800 text-richblack-100' id="citycode">
                               {
                                contrycode.map((item,index)=>{
                                    return<option value={item.code} onSelect={()=> setcode(item.code)}>
                                        {item.code} {item.country}
                                    </option>
                                })
                               }

                            </select>

                        </div>
                        <div className='flex flex-col w-[78%] '>
                        <input type="number"  id='Phone' name='Phone' {...register('Phone',{required:true,valueAsNumber:false, minLength:"8",maxLength:"10"})} className='bg-richblack-800 px-2 rounded-xl py-2 text-richblack-50' placeholder='Mobile number'  maxLength="12"/>
                        {
                            errors.Phone && <span className='text-pink-700'>Phone number  must be mini 8 max 10 </span>
                        }
                        </div>
                       </div>
                </div>
                <div className='flex flex-col' >
                    <label htmlFor="message"  className='text-richblack-300 font-inter text-sm'>Message</label>
                    <textarea name="message"  id="message" cols="30" rows="6" {...register("message",{required:true,minLength:"30"})} className='bg-richblack-800 px-2 rounded-xl py-2 text-richblack-50' placeholder='Message here... ' />
                    {
                        errors.message && <span className='text-pink-700'>Message must be minimum 30 letter</span>
                    }
                </div>

                <button className='bg-yellow-200 py-2 rounded-lg text-richblack-900 font-inter font-bold mt-10 mb-9'>Send Message</button>

            </form>

           

        </div>
       
    </div>
            <Footeger/>
            </div>
  )
}
export default ContactusForm;