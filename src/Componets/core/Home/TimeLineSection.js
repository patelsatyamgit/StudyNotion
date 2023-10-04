import React from 'react'
import HIghlightedText from './HIghlightedText';
import Button from './Button';
import logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import "./home.css"
import TimelineImage from "../../../assets/Images/TimelineImage.png"

const TimeLineSection = () => {
    const timeline=[
        {
            logo:logo1,
            heading:"Leadership",
            description:"Fully committed to the success company"
        },
        {
            logo:logo2,
            heading:"Responsibility",
            description:"Student will always be our top priority"
        },
        {
            logo:logo3,
            heading:"Flexibility",
            description:"The ability to switch is an important skills"
        },
        {
            logo:logo4,
            heading:"Solve the problem",
            description:"Code your way to a solution"
        }
    ]
    // const count=0;
  return (
    <div className='mt-3'>
        {/* section one  */}
        <div className='flex flex-col  lg:flex-row gap-3 '>
            <div className='lg:w-[50%]'>
                <h1 className='text-2xl flex gap-3'>Get the skills you need for a job <HIghlightedText text={"job that is in demand"}/></h1>
            </div>
            <div className='lg:w-[50%] flex flex-col gap-6 items-start'>
                <p>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>

                <Button linkto={"/sighup"} active={true}>Learn More</Button>
                
            </div>
            
        </div>
        {/* section two  */}
        <div className='flex flex-col lg:flex-row gap-1 mt-6'>
            {/* left  */}
            <div className='flex flex-col lg:w-[50%] px-10  gap-4'>
                    { timeline
                        .map((element, index) => {
                            return <div key={index} className='flex  gap-8 items-center py-2'>
                                <div className='relative'>
                                    <img alt='okk' src={element.logo} />

                                    
                                </div>
                                <div>
                                    <h2 className='font-bold'>{element.heading}</h2>
                                    <p className='text-pure-greys-500'>{element.description}</p>
                                </div>
                            </div>
                        })
            }
            

                
            </div>
            {/* right  */}
            <div className='relative lg:w-[50%] px-10 '>
                <div className='relative z-40'>
                    <img alt='okk' src={TimelineImage}/>
                    <div className='w-full h-full bg-white shadow-2xl  absolute -z-10 -bottom-4 -right-4 '>
                        <div className='g3blur'>
                            
                        </div>
                    </div>
                    <div className=' w-[95%] lg:w-[80%] flex bg-caribbeangreen-700 -bottom-10 left-[10%] absolute  p-1 lg:p-3 justify-between items-center px-6'>
                        <div className='flex gap-6 items-center'>
                            <div className='text-white 
                            text-2xl lg:text-4xl font-bold'>
                                10
                            </div>
                            <div className='text-caribbeangreen-300 text-sm lg:text-lg'>
                                YEARS<br/>EXPERIENCES
                            </div>
                        </div>
                        <div className='w-[4px] h-12 bg-caribbeangreen-500 '>
                          
                            
                        </div>
                        <div className='flex gap-6 items-center'>
                            <div className='text-white text-2xl lg:text-4xl font-bold'>
                                250
                            </div>
                            <div className='text-caribbeangreen-300 text-sm lg:text-lg'>
                                TYPES OF <br/>COURSES
                            </div>
                            
                        </div>
                    </div>
                </div>
               
                
            </div>
            
        </div>
    </div>
  )
}

export default TimeLineSection;
