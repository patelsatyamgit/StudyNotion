import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import {AiOutlinePlusCircle} from "react-icons/ai";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setCourse, setEditCourse, setStep } from '../../../../../slices/corse';
import { setLoading } from '../../../../../slices/authSlice';
import { updateSection } from '../../../../../services/operations/course';
import { createSection } from '../../../../../services/operations/course';
import NestedView from '../NestedView';
import { set } from 'mongoose';
import { toast } from 'react-hot-toast';
const CourseBuilder = () => {
   const {register,handleSubmit,getValues,setValue,formState:{errors}}=useForm();


   const dispatch=useDispatch();
   const [loading,setloading]=useState(false);
   const [editsection,setEditsection]=useState(null);
   const {course}=useSelector((state)=>state.course);
   const {token}=useSelector((state)=>state.auth);
   const onSubmit=async (data)=>{
                //   console.log(data);
             setloading(true);
             let result
          if(editsection){
            result=await updateSection(
                {
                    sectionName:data.sectionName,
                    sectionId:editsection,
                    courseId:course._id,
                },
                token
            )
          }
          else{
            result=await createSection(
                {
                    sectionName:data.sectionName,
                    courseId:course._id,
                },
                token
            )
          }
          if(result){
            dispatch(setCourse(result))
            setEditsection(null);
            setValue("sectionName","")
            setloading(false);
          }

          setLoading(false);

   }
   useEffect(()=>{
                //    console.log("coursecontent ---",course.courseContent);
   },[])

   const EditSectionName=(sectionId,sectionName)=>{
    // console.log(sectionId===editsection);
         if(sectionId === editsection)
         {
            setEditsection(null);
            setValue('sectionName',"");
            return;
         }
              setEditsection(sectionId);
              setValue("sectionName",sectionName);

   }
   const goToNext =()=>{
    if(course.courseContent.length===0){
        toast.error("please add atleast one section")
        return;
    }
    if(course.courseContent.some((section)=>section.subSection.length===0)){
        toast.error("please add atleast one subsection");
        return;
    }

    dispatch(setStep(3))
   }

   const goBack=()=>{
      dispatch(setStep(1));
      dispatch(setEditCourse(true));
   }
  return (
    <div className='bg-richblack-800 mt-8 px-4 rounded-md py-4 border-[1px] border-richblack-500'>
       <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className='text-richblack-5 font-inter text-2xl font-bold'>Course Builder</h1>
                <div className='flex flex-col gap-1 mt-5'>
                    <label htmlFor="sectionName" className=' text-richblack-100'>Section Name</label>
                    <input type="text" id='sectionName' name='sectionName' {...register("sectionName",{required:true})} className='bg-richblack-700  px-3 py-3 border-b-[1px] border-richblack-200 rounded-md outline-none text-richblack-25' />
                    {
                        errors.sectionName && (
                            <span className='text-sm text-pink-200'>Section name is required</span>
                        )
                    }
                </div>
                <div className='flex gap-4 items-center '>
                    <button type='submit' className=' bg-transparent text-yellow-200 border-[1px] px-3 py-1 border-yellow-200 flex gap-2 mt-3 shadow-lg text-lg  items-center justify-evenly rounded-lg'>
                        {
                            editsection?"Edit Section Name":"Create Section"
                        }
                        <AiOutlinePlusCircle/>
                    </button>
                    <div>
                      {
                        editsection?(
                            <button type='button' onClick={(e)=>{
                                e.preventDefault();
                                setEditsection(null);
                                setValue("sectionName","");
                            }} className='underline text-richblack-400 '>
                            cancel Edit
                        </button>
                        ):""
                      }
                    </div>

                </div>
       </form>
       <div>
        {
             
           course.courseContent && course.courseContent.length > 0 && (
                <NestedView handlechangeEditSectionName={EditSectionName} />
            )
        }
       </div>
       <div className='flex justify-end mt-3 gap-2'>
        <button onClick={goBack} disabled={loading}  className='bg-richblack-400 px-3 py-1 rounded-md '>Back</button>
        <button onClick={goToNext} disabled={loading} className='bg-yellow-200 px-3 py-1 rounded-md'>Next</button>
       </div>
    </div>
  )
}
export default CourseBuilder;
