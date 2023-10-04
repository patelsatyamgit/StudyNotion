import React from 'react'
import {  getInstructorDeskboard } from '../../../../services/operations/course'
import { useSelector } from 'react-redux'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VisualizeData from './VisualizeData';

const InstructorDesboard = () => {
  const navigate=useNavigate();
  const {token}=useSelector((state)=>state.auth);
   const {user}=useSelector((state)=>state.profile);
   const [course,setcourses]=useState([]);
  const getInstructorDetails=async()=>{
          try {
               const result=await getInstructorDeskboard(token)
              //  console.log("desktopDetails---",result);
               setcourses(result);
          } catch (error) {
            // console.log(error);
          }
  }
  const [totalIncome,setTotalincome]=useState(0);
  useEffect(()=>{
    // console.log("courses,",course)
    const totalIncome=course.reduce((acc,cur)=>acc+cur.totalIncome,0);
    setTotalincome(totalIncome);
  },[course,totalIncome])
  useEffect(()=>{
    getInstructorDetails();
    
    // console.log("course",course)
  },[])
  return (
    <div className=' px-7 py-7 md:w-[70%] bg-richblack-900'>
      <h1 className='text-richblack-25 font-inter font-bold text-2xl'>HI {user.firstName}</h1>
      <p className='text-richblack-300 mb-5'>Let's start something new</p>
      {/* visulize section  */}
      <div className='flex flex-col lg:flex-row my-4 gap-4'>
        <div className='flex-1 bg-richblack-800 rounded-md'>
                <VisualizeData courseData={course} />
        </div>
        <div className='md:w-[20%] bg-richblack-800 rounded-md px-3 flex flex-col gap-5 py-4'>
          <h3 className='text-richblack-100 font-bold '>Statistics</h3>

           <div>
           <p className='text-richblack-300 font-inter text-sm'>Total Courses</p>
            <p className='text-xl font-inter font-bold text-richblack-5'>{course?.length}</p>
           </div>
           <div>
            <p className='text-richblack-300 font-inter text-sm'>Total Student</p>
            <p className='text-xl font-inter font-bold text-richblack-5'>{course[0]?.studentEnrolled || 0}</p>
           </div>
           <div>
            <p  className='text-richblack-300 font-inter text-sm'>Total Income</p>
            <p className='text-xl font-inter font-bold text-richblack-5'>Rs. {totalIncome}</p>
           </div>

        </div>
      </div>
        <div className='bg-richblack-800 px-4'>
        <div className='flex justify-between px-4 py-4'>
        <h4 className='font-bold text-richblack-25 text-xl'>Your course</h4>
        <button onClick={()=>{
          navigate("/dashboard/my-courses")
        }} className='text-blue-400 underline'>See all</button>
        </div>
      <div className='flex gap-4 flex-col md:flex-row'>
        {
          
          course.map((item,index)=>{
            
          return (index <3 && <div key={index} className='bg-richblack-600'>
              <img src={item?.course?.thumbnail} alt="" width={250} />
              <h6 className='text-richblack-50 font-inter pl-2'>{item.courseName}</h6>
              <p className='text-richblack-300 pl-2 font-inter'>{item.studentEnrolled}. Student Enrolled</p>
              
            </div>)

          }
          )

        }

      </div>
        </div>
    </div>
  )
}


export default InstructorDesboard;