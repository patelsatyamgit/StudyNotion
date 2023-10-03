import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import ProgressBar from "@ramonak/react-progress-bar"
import { getEnrolledCourses } from '../../../services/operations/update';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { useNavigate } from 'react-router-dom';



const EnrolledCourses = () => {


  const navigate=useNavigate();
  const[flag,setflag]=useState(1);
  const categorytype=[
    {
    id:1,
    name:"All",
  },
  {
    id:2,
    name:"Pending",
  },
  {
    id:3,
    name:"Completed",
  },


  ]
  const[course,setcourse]=useState([]);
  const {token} =useSelector((state)=>state.auth);


  const getEnrolledcourses=async()=>{

              try {
                        const result=await getEnrolledCourses(token);

                        if(result){
                          setcourse(result);
                          toast.success("fetched enrolled courses successfully");
                        }
              } catch (error) {
                console.log(error);
              }
  }

  useEffect(()=>{
          getEnrolledcourses();
  },[])

  return (
    <div className=' py-10'>
      <p className='text-richblack-300'>Home  / Dashboard / <span className='text-yellow-200'>Enrolled Courses</span></p>
      <h1 className='font-bold text-richblack-25 text-2xl py-2'>Enrolled Courses</h1>

      <div className='flex gap-5 bg-richblack-600 w-fit px-5 rounded-xl py-2'>
          {
            categorytype.map((item,index)=>(
              <button key={index} className={`${item.id===flag ?"bg-richblack-900 px-2 rounded-md text-richblack-5":""}`} onClick={()=>setflag(item.id)}>{item.name}</button>
            ))
          }
      </div>
        <div className='mt-5 px-4 '>
          <Table className="border-[1px] border-richblack-400 pl-3">
            <Thead className="border-[1px] border-richblack-400">
              <Tr className="bg-richblack-600 text-richblack-300  ">
              
              <Th className=" text-start">Course Name</Th>
                <Th className="text-start">Durations</Th>
                <Th className="text-start">Progress</Th>
                
              </Tr>
            </Thead>
            <Tbody>
              {
                course.map((item,index)=>(
                          <Tr key={index} className="border-b-[1px] border-richblack-400 cursor-pointer" onClick={()=>{
                                   navigate(`view-course/${item._id}/section/${item.courseContent[0]._id}/sub-section/${item.courseContent[0].subSection[0]._id}`)
                          }}>
                            <Td className="flex gap-3 py-3">
                              <img src={item.thumbnail} alt="Thumbnail" className='w-[60px] aspect-square rounded-xl' />
                              <div>
                                <h4 className='font-bold font-inter text-lg text-richblack-5'>{item.courseName}</h4>
                                <p className='text-richblack-400 '>{item.courseDescription.substring(0,20)}...</p>
                              </div>
                            </Td>
                            <Td className="text-richblack-400">2hr 30min</Td>
                            <Td className="text-richblack-400">
                              <p className='text-richblack-25'>{item?.progressPercentage || 0  }%</p>
                              <ProgressBar 
                              className='border-[2px] border-yellow-200 rounded-md'
                              completed={item.progressPercentage || 0} height='8px'
                              isLabelVisible={false}/>
                            </Td>
                          </Tr>
                
                ))
              }
            </Tbody>
          </Table>
        </div>
    </div>
  )
}

export default EnrolledCourses;