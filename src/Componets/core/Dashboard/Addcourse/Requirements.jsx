import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const Requirements = (
    {
        label,
        name,
        register,
        errors,
        setValue
    }
) => {
    const [requirements,setrequirements]=useState([]);
    const {course,editCourse}=useSelector((state)=>state.course);
    const [fieldvalue,setfieldvalue]=useState("");
    useEffect(()=>{
           if(editCourse){
                setrequirements(course.instructions);
           }

           register(name,{required:true})

    },[])
    useEffect(()=>{

        setValue(name,requirements);

    },[requirements])
    const handleonchange=(event)=>{
           setfieldvalue(event.target.value);
    }
    const onclickhandler=()=>{
        if(fieldvalue.length >0){
            const newrequiremenst=[...requirements,fieldvalue.trim()]
            setrequirements(newrequiremenst);
            setfieldvalue("");
        }
      
    }
    const deleterequirement=(indexvlaue)=>{
        const newRequirements=requirements.filter((_,index)=>indexvlaue!==index);
        setrequirements(newRequirements);
    }
  return (
    <div className='flex flex-col gap-2'>
        <label htmlFor={name}>{label} <sup className='text-pink-200'>*</sup>
        </label>

       
            <input type="text" value={fieldvalue} onChange={handleonchange} className='bg-richblack-700 px-3 py-3 border-b-[2px] border-richblack-100 rounded-md outline-none' />
            {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
            <button type='button' 
            onClick={onclickhandler}className='text-yellow-100 self-start  font-bold'>Add</button>
        <div className='flex flex-col gap-2'>
            {
               requirements && requirements.map((item,index)=>{
                          return <div key={index} className='flex gap-2 capitalize'>
                            {item}
                            <button onClick={()=>deleterequirement(index)} className='text-sm italic bg-richblack-700 rounded-lg px-2'>
                                clear
                            </button>
                          </div>
                })
            }

        </div>
       
    </div>
  )
}

export default Requirements;
