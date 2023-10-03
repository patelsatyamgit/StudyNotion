import React, { useEffect, useState } from 'react'
import { RxCross1 } from 'react-icons/rx';
import { useSelector } from 'react-redux';
import ReactStars from "react-rating-stars-component";
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { createRating } from '../../../services/operations/course';
 const ReviewDataModule = ({dataModule,setAddReview}) => {
    const {courseId}=useParams();
    const {getValues,setValue,handleSubmit,register,formState:{errors}}=useForm();
    const {token}=useSelector((state)=>state.auth);
    const[rating,setrating]=useState(0);
    const {user}=useSelector((state)=>state.profile);
    useEffect(()=>{
        // console.log("user",user);
    },[])
    const ratingChanged = (newRating) => {
        setrating(newRating);
      };
    const onsubmit=async(data)=>{
                //  console.log("Rating data---",data);
                 setValue("course_id",courseId)
                 setValue("review",data.experiance)
                 setValue("rating",rating);
                 const Data=getValues();
                 try {
                    const result=await createRating(Data,token)
                    setAddReview(false)
                 } catch (error) {
                    console.log(error);
                 }
    }

  return (
    <div className={`${dataModule?"fixed inset-0 z-50 grid place-items-center overflow-auto bg-opacity-10 backdrop-blur-sm":""}`}>

        <div className='bg-richblack-900 md:w-[50%] border-[1px] border-richblack-500 pb-5 rounded-md'>
            <div className='bg-richblack-500 flex justify-between px-3 py-2'>
                <p className='font-bold text-richblack-50'>Add Review</p>
                <button className='text-richblack-25 font-bold' onClick={()=>setAddReview(false)}><RxCross1/></button>
            </div>
            <div className='flex flex-col items-center mt-4'>
                <div className='flex gap-7 items-center'>
                    <img className='w-[50px] lg:w-[80px] rounded-full' src={user.image} alt="" />
                    <div>
                        <p className='text-richblack-25 font-inter font-bold text-2xl'>{user.firstName} {user.lastName}</p>
                        <p className='text-richblack-400'>Posting Pulicly</p>
                    </div>
                </div>
                <div>
              
              <form onSubmit={handleSubmit(onsubmit)} id='rating'  className='flex items-center flex-col gap-4'>
             <div>

             <ReactStars
                count={5}
                half={true}
                value={rating}
                onChange={ratingChanged}
                size={50}
                activeColor="#ffd700"
            />,
             </div>
             
        
            <div className='w-full px-3'>
                <label className='text-richblack-400' htmlFor="experiance">Add Your Experience</label>
                <textarea name="experiance" id="experiance" className='bg-richblack-700 w-full  text-richblack-5 px-2' cols="50" rows="6" {...register("experiance",{required:true})}/>
                {
                        errors.experiance && <span className='text-pink-300 text-sm'>
                            Review message required minmum 10 word
                        </span>
                }
            </div>

            <button type='submit' className='bg-yellow-100 px-3 mr-3 py-1 rounded-md self-end '>Submit</button>
              </form>
                </div>

            </div>
        </div>
                
        </div>
  )
}

export default ReviewDataModule;