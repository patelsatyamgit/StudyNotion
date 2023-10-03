import React from 'react'
import HIghlightedText from './HIghlightedText';
import learn1 from "../../../assets/Images/Know_your_progress.png"
import learn2 from "../../../assets/Images/Compare_with_others.png"
import learn3 from "../../../assets/Images/Plan_your_lessons.png"
import Button from './Button';

 const LearningSection = () => {
  return (
    <div className='mt-20 flex flex-col items-center justify-center '>
        <div className='flex flex-col items-center gap-6  '>
            <h1 className='text-2xl flex font-inter font-bold gap-2'>
                Your swiss knife for <HIghlightedText text={"learning any language"}/>
            </h1>
            <p className='max-w-[40rem] text-center text-pure-greys-600 font-inter '>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</p>
        </div>
      <div className='w-[96%
      ] mx-auto  mt-5'>
      <div className='flex flex-col md:flex-row justify-between items-center  relative px-1  w-full'>
       a <img src={learn1} alt='learn 1 image' className='w-[300px] relative'/>
        <img src={learn2} alt='learn 2 image' className='w-[300px]  '/>
        <img src={learn3} alt='learn 3 image' className='w-[300px]  '/>
            
        </div>
        <div className='items-center flex justify-center mt-3 mb-7'>
            <Button active={true} linkto={"/signup"}>
                Learn More
            </Button>
        </div>
      </div>
    </div>
  )
}

export default LearningSection;