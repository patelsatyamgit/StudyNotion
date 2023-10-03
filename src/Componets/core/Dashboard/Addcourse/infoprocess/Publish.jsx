import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { setResetCourseInfo, setStep } from '../../../../../slices/corse';
import { COURSE_STATUS } from '../../../../../utils/constant';
import { useNavigate } from 'react-router-dom';
import { editCourseDetails } from '../../../../../services/operations/course';
import { toast } from 'react-hot-toast';

const Publish = () => {

  const {course}=useSelector((state)=>state.course)
  const {token}=useSelector((state)=>state.auth);
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();

  useEffect(()=>{
    if(course?.status ===COURSE_STATUS.PUBLISHED){
      setValue("public",true);
    }

  },[])

  const goToCourses=()=>{
    dispatch(setResetCourseInfo());
    navigate("/dashboard/my-courses");

  }
  const handleCoursePublish= async()=>{
    if (
      (course?.status === COURSE_STATUS.PUBLISHED &&
        getValues("public") === true) ||
      (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
    ) {
      // form has not been updated
      // no need to make api call
      goToCourses()
      return
    }
     

       const formData=new FormData();
       formData.append("courseId",course._id);
       const courseStatus=getValues("public")?COURSE_STATUS.PUBLISHED :COURSE_STATUS.DRAFT

       formData.append("status",courseStatus);
       setLoading(true);
       const result= await editCourseDetails(formData,token);

       if(result){
        goToCourses();
        toast.success("published successfully");
       }

       setLoading(false);
  }
  const onsubmit=()=>{
           handleCoursePublish();
  }

  const dispatch=useDispatch();

  const {register,handleSubmit,setValue,getValues,formState:{errors}}=useForm();
  return (
    <div className='bg-richblack-700 px-5 py-5 mt-7 rounded-md border border-richblack-100 felx flex-col '>
      <p className='text-richblack-25 font-bold text-2xl'>Publish Settings</p>
      <form onSubmit={handleSubmit(onsubmit)} className='mt-6' >
        <input type="checkbox"  id='public' className='autofill:bg-yellow-200' {...register("public")} />
        <label htmlFor="public" className=' text-md text-richblack-400 mx-3'>Make this course as public</label>
    
        <div className='flex justify-end gap-3'>
          <button onClick={()=>dispatch(setStep(2))} className='bg-richblack-500 px-3 py-1 rounded-md  hover:bg-richblack-600'>Back</button>
          <button type='submit' className='bg-yellow-200 px-3 py-1 rounded-md  hover:bg-yellow-500'>Save Changes</button>
        </div>
      </form>
    </div>
  )
}
export default Publish;