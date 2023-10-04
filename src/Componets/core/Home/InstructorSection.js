import React from 'react'
import INSTRUCTOR from "../../../assets/Images/Instructor.png"
import HIghlightedText from './HIghlightedText'
import Button from './Button'
import {  FiArrowRight } from 'react-icons/fi'
export const InstructorSection = () => {
  return (
    <div className='flex flex-col md:flex-row mt-8 gap-2 items-center'>
        <div className='relative'>
            <img src={INSTRUCTOR} alt="oke" className='relative z-40'/>
            <div className='w-full h-full bg-white absolute -top-3 -left-3'>
                
            </div>
        </div>
        <div className='flex flex-col gap-5 md:px-24 items-start'>
            <div className='flex flex-col gap-2 '>
                <h1 className='text-2xl text-white'>Become an <HIghlightedText text={"instructor"}/></h1>
                <p className='font-inter text-sm text-pure-greys-400'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
            </div>
            <Button active={true} linkto={"/signup"}>
                Start Teaching Today <FiArrowRight/>
            </Button>
            
        </div>
    </div>
  )
}
