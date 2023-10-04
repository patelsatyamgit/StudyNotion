import React from 'react'
import { useSelector } from 'react-redux'
import {AiFillCheckCircle} from "react-icons/ai"
// import { setStep } from '../../../../slices/corse'
import { useDispatch } from 'react-redux'
import Publish from './infoprocess/Publish'
import CourseInfo from './infoprocess/CourseInfo'
import CourseBuilder from './infoprocess/CourseBuilder'
const RenderSteps = () => {
    const steps=[
        {
            step:1,
            title:"Course Information",
        },{
            step:2,
            title:"Course Builder",
        },
        {
            step:3,
            title:"Publish",
        }
            
        ]
        // const dispatch=useDispatch();
        // dispatch(setStep(1));
        

        const {step}=useSelector((state)=>state.course);
  return (
    <div className=' w-[97%] z-10  '>
        {/* steps  */}
        <div className='flex justify-between text-richblack-400 '>
            {
                steps.map((item,index)=>{
                    return  <div key={index} className={`${item.step<steps.length?"w-[calc(100%/2)]":""}`}>
                        <div className='flex gap-0 items-center '>
                            <div className={` w-7 h-7 text-lg  text-center border-[1px] cursor-default rounded-full ${item.step<=step?"bg-yellow-800 text-yellow-50 outline-8":"bg-richblack-800 border-richblack-700 text-richblack-300 flex items-center justify-center"}`}> 
                             {step>item.step?(<AiFillCheckCircle className='text-[30px] text-yellow-400'/>):(item.step)}
                            </div>
                           {
                            item.step<steps.length?(
                                <div className={`flex-1  
                                border-b-2 border-dashed ${step>item.step?"text-yellow-400":"text-richblack-400"}`}>

                                </div>
                            ):""
                           }
                        </div>
                        
                    </div>

                })
            }
          

        </div>
        <div className='flex justify-between '>
            {
                steps.map((item2,index)=>{
                    return <div key={index} className={`${step===item2.step?"text-richblack-5":""} font-inter ${step<steps.length?"w-[100%/2] text-center":""} text-richblack-200  text-sm md:text-xl`}>
                        {item2.title}
                    </div>
                })
            }
        </div>
        <div>
            {
                step===1 && <CourseInfo/>
            }
            {
                step===2 && <CourseBuilder/>
            }
            {
                step===3 && <Publish/>
            }

        </div>

    </div>
  )
}


export default RenderSteps;