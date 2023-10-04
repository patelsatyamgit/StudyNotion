import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore';
import HIghlightedText from './HIghlightedText';
import CourseCard from './CourseCard';


 const ExploreMore = () => {
const [currentTag,SetcurrentTag]=useState(HomePageExplore[0].tag);
const [courses,setcourses]=useState(HomePageExplore[0].courses);
const [currentcourse,setcurrentcourse]=useState(HomePageExplore[0].courses[0]);
  return (
    
    <div className=' mt-24 relative mb-48 '>
        {/* upper section */}
        <div className='flex justify-center flex-col items-center gap-3'>
            <h1 className='font-bold font-inter text-2xl flex gap-3 text-white '>Unlock the <HIghlightedText text={"Power of Code"}/></h1>
            <p className='text-pure-greys-500 text-sm'>Learn to Build Anything You Can Imagine</p>

            <div className='flex  md:gap-6 bg-richblack-800 px-4  rounded-lg py-[5px] transition-all duration-100'>
                {
                    HomePageExplore
                    .map((value, index) => {
                        return <button className={`text-pure-greys-300 px-3 py-[3px] rounded-md md:text-sm text-[10px] ${currentTag===value.tag?"bg-richblack-900":""} hover:text-pure-greys-50 cursor-pointer hover:bg-richblack-800`} key={index} onClick={(event)=>{
                            SetcurrentTag(value.tag);
                            setcourses(value.courses);
                        }}>
                           { value.tag}
                        </button>
                        
                    })
                    
                }
            </div>
        </div>
        {/* down section */}
        <div className=' flex flex-col md:flex-row gap-10 mt-10  md:absolute md:left-[50%] md:-translate-x-[50%]'>
            { 
                courses
                .map((element, index) => {
                    return <CourseCard key={index} course={element} currentcourse={currentcourse} setcurrentcourse={setcurrentcourse} />
                })
                
            }
            
        </div>

    </div>
  )
}

export default ExploreMore;