import React, { useState } from 'react'

import { MdOutlineKeyboardArrowUp,  } from 'react-icons/md';
import { FaBackward } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { setActivesubsection, setTotalNoOfLectures } from '../../../slices/viewCourseSlice';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';




const VideosectionSidebar = ({setAddReview}) => {
  const {courseId,sectionId,subsectionId}=useParams();

  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {courseSectionData,courseEntireData,completedLectures,totalNoOfLectures}=useSelector((state)=>state.viewCourse)
  const [activeSection,setActiveSection]=useState(sectionId)
  // const [activeSubSection,setActiveSubsection]=useState(subsectionId);
  const {user}=useSelector((state)=>state.profile)
  const {Activesubsection}=useSelector((state)=>state.viewCourse);

  const ifAlreadyReview=()=>{

    const index=courseEntireData?.ratingAndReview?.findIndex((item)=>item.user ===user._id);

      if(index){
        return true;
      }
      else{
            toast.error("You have already reviewed");
            // console.log("...........ff",index);
            return false
      }
  
  }
  useEffect(()=>{
    // console.log("completed lectures",completedLectures)

  },[completedLectures])

  useEffect(()=>{
          dispatch(setActivesubsection(subsectionId));
  },[])
  
  return (
    <div className=' pt-[50px] md:py-4 '>

      <div className='px-2 flex justify-between items-center'>
        <div className='text-richblack-25 bg-richblack-500 px-2 py-2 rounded-full hover:bg-richblack-800 hover:text-yellow-300' onClick={()=>{
          navigate("/dashboard/enrolled-courses")
        }}>
          <FaBackward/>
        </div>
        <button className='bg-yellow-100 text-black font-inter  rounded-md px-4 py-1 text-sm hover:bg-yellow-200' onClick={()=>{ifAlreadyReview() &&setAddReview(true)}}>Add Review</button>
      </div>
      
      <div className='flex flex-col px-4 py-5 border-b-[1px] border-r-richblack-100'>
        <div className='text-richblack-25 font-bold font-inter text-xl'>
          {courseEntireData.courseName}
        </div>
        <div className='text-richblack-400 font-inter text-sm'>
          {completedLectures?.length} /
          {totalNoOfLectures}
        </div>
      </div>

      <div>
        <div className='overflow-y-auto'>
          {
            courseSectionData && courseSectionData?.map((section,index)=>(
              <div className="" key={index} onClick={()=>setActiveSection(section._id)}>
                <div className='flex justify-between px-3 py-2 bg-richblack-500 items-center'>
                <div className='text-richblack-100'>
                {section.sectionName}
                </div>
                <div className={`text-richblack-50 text-xl ${activeSection===section._id ?"rotate-[180deg]":""}`}>
                  <MdOutlineKeyboardArrowUp/>
                </div>
                </div>

                <div className='px-4 py-2' type='1'>
                  {
                    section._id === activeSection && (
                      section?.subSection && section?.subSection?.map((subsec,index)=>(

                                      <div key={index} className={`${Activesubsection===subsec._id ? "text-yellow-100":"text-richblack-100"} flex gap-3 cursor-pointer`} >
                                        <input onClick={()=>{}}
                                        checked={completedLectures?.includes(subsec._id)} type="checkbox" />
                                                    <p onClick={(e)=>{

                                e.preventDefault();
                                dispatch(setActivesubsection(subsec._id));
                                // setActiveSubsection(subsec._id);    
                                navigate(`dashboard/enrolled-courses/view-course/${courseId}/section/${activeSection}/sub-section/${subsec._id}`)
                                                 
                                        }
                                      }>{subsec.title}</p>
                                      </div>
                         )
                      )
                    )
                  }
                </div>
              </div>
            ))
          }
        </div>


      </div>

    </div>
  )
}

export default VideosectionSidebar;