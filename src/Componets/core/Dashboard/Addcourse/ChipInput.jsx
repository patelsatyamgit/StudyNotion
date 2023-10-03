import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { MdClose } from 'react-icons/md';

 const ChipInput = (
   { label,
    name,
    placeholder,
    register,
    errors,
    setValue,
    getValues}
 ) => {

    const {course,editCourse}=useSelector((state)=>state.course);
    const [tags,settags]=useState([]);
    useEffect(()=>{
        if(editCourse){
            // console.log("tags",course?.tag);
            settags(course?.tag);
        }
        register(name,{required:true,validate:(value)=> value.length > 0})
    },[])

    useEffect(()=>{
        setValue(name,tags)
    },[tags])

    const handleKeyDown=(event)=>{

        if(event.key=="Enter" || event.key==','){
            event.preventDefault();
            const data=event.target.value.trim();
            if(data && !tags.includes(data)){
                const newtags=[...tags,data];
                settags(newtags);
                event.target.value=""
            }
        }

    }
    const handleDeletetag=(tagIndex)=>{
              const newtags=tags.filter((_,index)=>index!==tagIndex)

              settags(newtags);
    } 
  return (
    <div className='w-full flex flex-col gap-1'>
        <label htmlFor="tags">{label}
        <sup className='text-pink-200'>*</sup>
        </label>
        <div className='flex gap-5 pb-2 flex-wrap'>
            {
               tags && tags.map((tag,index)=>{
                    return <div key={index} className='flex items-center gap-2 bg-yellow-400 rounded-md px-1 text-white py-[1px] '>
                        {tag}

                        <button type='button' onClick={()=>handleDeletetag(index)}>
                             <MdClose/>
                        </button>
                    </div>
                })
            }
        </div>
        <div className='flex w-full'>
            <input id={name} name={name} type="text" className='w-full rounded-md  border-b-2 border-richblack-300  bg-richblack-700 px-3 py-3 outline-none' placeholder={placeholder} onKeyDown={handleKeyDown}/>
        </div>
        {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}

    </div>
  )
}

export default ChipInput;
