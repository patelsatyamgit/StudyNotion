import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import GetAvgRating from "../../../utils/avgRating"
import ReactStars from "react-rating-stars-component";

const CourseCard = (course) => {
  const [averageRating,setAverageRating]=useState(GetAvgRating(course?.course?.ratingAndReview));
  useEffect(()=>{
            // console.log("ratings",course?.course?.instructor)
  },[])
  return (
    <>
    <Link to={`/courses/${course.course._id}`}>
    <div  className={`${course.course.instructor.firstName?"hover:scale-110 transition-all duration-200 hover:rounded-2xl bg-richblack-700 rounded-md flex flex-col gap-3 ":"bg-richblack-700 rounded-md flex flex-col gap-3 "}`}>
          <img src={course.course.thumbnail} alt="" className='h-fit md:h-[200px]'/>
         <div className='px-4'>
         <p className='text-richblack-50 font-inter font-bold '>{course.course.courseName}</p>
          <p className='text-richblack-400 '>{course.course.courseDescription.substring(0,30)}....</p>
          <div className='flex gap-2 flex-col md:flex-row  items-start'>
           <div className='flex gap-2 items-center'>
           <p className='text-yellow-200 font-bold'>{averageRating}</p>
             <ReactStars
                   count={5}
                   value={averageRating}
                   
                   size={25}
                   edit={false}
                  activeColor="#ffd700"
                  half={true}
             
             />
           </div>
           <div className='flex gap-1 flex-col md:flex-row'>
           <p className='text-richblack-300'>{course?.course?.ratingAndReview?.length} Review</p>
            <p className='text-richblack-300'>(EnrolledStudent- {course?.course?.studentsEnrolled?.length}) </p>
             
           </div>
             
          
          </div>
          {course.course.instructor && course.course.instructor.firstName && <p className='flex gap-2 text-richblack-25 italic'><span className='text-pink-300 '>By</span>{course.course.instructor.firstName+" "+course.course.instructor.lastName}</p>}
          
         </div>
          <p className='px-4 font-inter text-richblack-25 font-bold pb-3'>{course.course.price}</p>
          
        </div>
  </Link>
    </>
  )
}

export default CourseCard;