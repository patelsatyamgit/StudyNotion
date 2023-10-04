import React from 'react'
import { Outlet, useParams } from "react-router-dom"

import VideosectionSidebar from "../Componets/core/ViewCourses/VideosectionSidebar"
import { useEffect } from 'react'
import { useState } from 'react'
import { getcourseAllDetails } from '../services/operations/course'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';

import { setCourseEntireData,setCompletedLectures,setCourseSectionData,setTotalNoOfLectures } from '../slices/viewCourseSlice'
import ReviewDataModule from '../Componets/core/ViewCourses/ReviewDataModule'

const ViewCourse = () => {
       
    const [activeSidesection,setactiveSidesection]=useState(false);
     const [Review,setAddReview]=useState(false);
    const [loading,setloading]=useState(false);
    const {courseId}=useParams();
    const {token}=useSelector((state)=>state.auth);
     const {completedLectures,courseSectionData}=useSelector((state)=>state.viewCourse)
    const dispatch =useDispatch();
    // useEffect(()=>{

    //     courseSectionData?.forEach((sec)=>{
    //         sec.subSection.forEach((ech)=>{
    //             console.log("complete lectures",ech._id)
    //             if(!completedLectures.includes(ech._id))
    //             {

    //                 dispatch(updateCompleteLectures(ech._id))
    //             }
              
    //         })
            
    //      })

    // },[,completedLectures,courseSectionData])
    const courseDetails=async()=>{
        setloading(true);
        try {
            const result= await getcourseAllDetails({courseId:courseId},token);
            dispatch(setCourseSectionData(result?.courseDetails?.courseContent));
            dispatch(setCourseEntireData(result.courseDetails))
            dispatch(setCompletedLectures(result.completedVideos));
            let lectures=0;
             result?.courseDetails?.courseContent?.forEach((sec)=>{
                lectures+=sec.subSection.length
                
             })
             

             dispatch(setTotalNoOfLectures(lectures));
        } catch (error) {
            console.log(error);
        }
        
    }
    useEffect(()=>{

     courseDetails();

     

    },[])
  return (
    <div className='flex flex-row w-full  pt-[10vh] relative'>

        

      <button onClick={()=>setactiveSidesection(!activeSidesection)} className={` text-yellow-100 md:scale-0 absolute   top-[12vh] ${activeSidesection ?"left-[40%]":"-left-1"} text-2xl z-50`}>
       {
        activeSidesection? <AiOutlineDoubleLeft/>:<AiOutlineDoubleRight/>
       } 
       
      </button>
    {
        
            <div className={`md:w-[15%] bg-richblack-700 h-[90vh] fixed z-40 ${activeSidesection ?"scale-100":"scale-0 md:scale-100"}`}>
          <VideosectionSidebar setAddReview={setAddReview} />
    </div>
        
    }
    <div className='md:flex-1 w-full bg-richblack-900 min-h-[90vh] z-20 md:pl-[18%]  '>
        <Outlet/>
    </div>
       {
        Review && <ReviewDataModule dataModule={Review} setAddReview={setAddReview}/>
       }
 </div>
  )
}


export default ViewCourse;