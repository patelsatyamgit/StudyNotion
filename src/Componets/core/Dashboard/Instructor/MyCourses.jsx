import React, { useEffect, useState } from 'react'
import {AiOutlineDelete, AiOutlineEdit, AiOutlinePlus} from "react-icons/ai"
import {useNavigate, Navigate } from 'react-router-dom'
import { deleteSection, deletecourse, getInstructorCourses } from '../../../../services/operations/course';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import {MdPublishedWithChanges} from "react-icons/md";
import {BiTime} from "react-icons/bi"
import { toast } from 'react-hot-toast';
import ConfirmationModule from '../../../../common/ConfirmationModule';
import {setEditCourse,setCourse} from "../../../../slices/corse";

const MyCourses = () => {
    const[courses,setcourses]=useState(null);
    const[loading,setloading]=useState(false);
    const {token} =useSelector((state)=>state.auth);
    const [confirmationModule,setConfirmationModule]=useState(null);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const getcourses=async()=>{
        setloading(true);
        const result= await getInstructorCourses(token);
        if(result){
            setcourses(result);
        }
        setloading(false); 
     }
    useEffect(()=>{
        getcourses();
        // console.log(courses);
    },[])
   
    async function handleDeleteCourse(id){
        const newcoursess=courses.filter((course)=>course._id!==id)
        setcourses(newcoursess);
            setloading(true);
            try {
                // console.log("course id--vv",id)
                await deletecourse({courseId:id},token);
               
            } catch (error) {
                toast.error("delete errorrr");
            }

            setloading(false);
            setConfirmationModule(null)
    
    }
  return (
    <>

<div className=' px-7 py-7'>
        <div className=' flex flex-col md:flex-row justify-between gap-4'>
            <h1 className='text-richblack-25 font-inter font-bold text-2xl'> My Courses</h1>
         
          <button className='bg-yellow-200 px-3 py-1  text-richblack-700 w-fit  flex gap-2 rounded-lg items-center' onClick={()=>navigate("/dashboard/add-course")}>Add Course <AiOutlinePlus/></button>

        </div>
        <div>
            <Table className="mt-7">
                <Thead className="border border-richblack-800">
                      <Tr   className="flex gap-x-10 border-b border-richblack-800 px-8 py-2 text-richblack-100 ">
                          <Th className="flex-1">
                            COURSES
                        </Th>
                         <Th className="md:w-[15%]">
                                DURATION
                        </Th>
                        <Th className="md:w-[15%]">
                              PRICE
                       </Th>
                       <Th className="md:w-[15%]">
                              ACTIONS
                       </Th>
                      </Tr>
                </Thead>
                <Tbody>
                    {
                        loading ?(""):(
                          
                               courses && courses.length !== 0?(
                                courses.map((course)=>(
                                    <Tr key={course._id} className="flex gap-x-10 border-b border-richblack-800 px-6 py-8 ">
                                        <Td className="flex gap-6 flex-1">
                                            <img width={200}  src={course.thumbnail} className='rounded-lg border-richblack-700 border-[1px] aspect-square' alt="" />
                                            <div>
                                                <h3 className='text-richblack-50 font-inter text-xl'>{course.courseName}</h3>
                                                <p className='text-richblack-400 md:w-[150px] leading-3 py-2'>{course.courseDescription.substring(0,20)}....</p>
                                                <p className='text-richblack-25'>Created :</p>

                                                <p >
                                                {
                                                    course?.status=="Draft" ? (
                                                          <p className='px-1  rounded-lg bg-richblack-500 text-yellow-5 flex gap-1 w-fit items-center mt-5'>
                                                             <BiTime/>
                                                             Drafted
                                                          </p>
                                                        
                                                         
                                                    ):(
                                                        <p className='px-1 bg-[#005500] text-richblack-25 flex items-center gap-1 mt-5 rounded-lg w-fit'>
                                                            <MdPublishedWithChanges/>
                                                            Published
                                                        </p>
                                                    )
                                                    
                                                }

                                                </p>
                                            </div>
                                        </Td>
                                        <Td className="text-richblack-50 md:w-[15%]">
                                        2hr 30min
                                        </Td>
                                        <Td className="text-richblack-50 md:w-[15%]">
                                            {
                                                course.price
                                            }
                                        </Td>
                                        <Td className="text-richblack-200 flex gap-4 text-xl md:w-[15%] h-fit"
                                        >
                                            <button onClick={()=>{
                                                dispatch(setCourse(course));
                                                dispatch(setEditCourse(true));
                                                navigate("/dashboard/add-course")
                                            }}>
                                                <  AiOutlineEdit/>
                                            </button>
                                            <button onClick={()=>{setConfirmationModule({
                                                text1: "Do you want to delete this course?",
                                                text2:"All the data related to this course will be deleted",
                                                btn1text: !loading ? "Delete":"Loading..",
                                                btn2Text:"Cancel",
                                                btn1Handler: !loading ?
                                                ()=> handleDeleteCourse(course._id):()=> {},
                                                btn2Handler: !loading ? () => setConfirmationModule(null):()=>{}
                                                
                                            })}} disabled={loading}>
                                                <AiOutlineDelete/>
                                            </button>
                                        </Td>
                                        
                                        
                                        
                                        </Tr>
                                    
                             )
                             )
                                    
                                ):(
                                    <Tr className="text-richblack-200">
                                    <Td>No courses Found</Td>
                                   </Tr>
                                
                                )

                        )
                     
                    }

                </Tbody>
            </Table>
          
        </div>
       
    </div>
    

    {confirmationModule && <ConfirmationModule dataModule={confirmationModule} />}
    </>
   
    
  )
}


export default MyCourses;