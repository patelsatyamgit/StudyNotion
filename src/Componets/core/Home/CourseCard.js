import React from 'react'
import { BsDiagram2 } from "react-icons/bs";
import {BsPeopleFill} from "react-icons/bs"
const CourseCard = ({course,currentcourse,setcurrentcourse}) => {
    // console.log(course.length);
  return (
    <div className='text-white   relative '>
     
                  
                   <section className={`w-[250px] h-[220px] ${currentcourse.heading===course.heading?"bg-white ":"bg-richblack-800"} p-5 flex flex-col justify-between  z-20 transition-all duration-200`} onClick={()=>{
                    setcurrentcourse(course);
                   }}>
                   <div>
                    <div className={ `${currentcourse.heading===course.heading?" w-full h-full absolute bg-yellow-300  -right-3 -bottom-3 -z-50 bg-opacity-100":""}`}>
                        
                    </div>
                   <h3 className={` text-[15px] font-inter font-semibold  ${currentcourse.heading===course.heading?"text-black":"text-white"} relative`}>{course.heading} </h3>
                    <p className='text-pure-greys-500 mb-8 text-sm'>{course.description}</p>
                   </div>
                    <div className={`flex justify-between ${currentcourse.heading===course.heading?"text-blue-400":"text-pure-greys-300"} relative `}>
                    <div className='flex gap-1 items-center justify-center'>
                       <BsPeopleFill/>
                        <p>{course.level}</p>
                    </div>
                    <div className='flex relative items-center justify-center gap-1'>
                        <BsDiagram2/>
                        <p className='font-bold'>{course.lessionNumber}</p>
                        <p>Lesson</p>
                    </div>
                    </div>
                  
                   </section>
            
        
    </div>
  )
}


export default CourseCard;