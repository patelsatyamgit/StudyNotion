import React, { useState } from 'react'
import { MdEdit } from 'react-icons/md';
import { useSelector } from 'react-redux';
import {RxDropdownMenu} from "react-icons/rx"
import {AiFillCaretDown} from "react-icons/ai";
import {RiDeleteBin6Line} from "react-icons/ri"
import ConfirmationModule from '../../../../common/ConfirmationModule';
import { useDispatch } from 'react-redux';
import { deleteSection, deleteSubsection } from '../../../../services/operations/course';
import { setCourse } from '../../../../slices/corse';
import SubSectionModal from './SubSectionModal';
import { toast } from 'react-hot-toast';

const NestedView = ({handlechangeEditSectionName}) => {

    const {course}=useSelector((state)=>state.course);
    const [confirmationModule,setConfirmationModule]=useState(null);
    const {token} =useSelector((state)=>state.auth);
    const [loading,setloading]=useState(false);
    const [viewsubsection,setviewsubsection]=useState(null);
    const [editsubsection,seteditsubsection]=useState(null);
    const [addsubsection,setaddsubsection]=useState(null);
    const dispatch=useDispatch();
    const handleDeleteSection=async(id)=>{
        setloading(true);
        const result=await deleteSection({
                 courseId:course._id,
                 sectionId:id
        },token)

        if(result){
            dispatch(setCourse(result));
        }
             setloading(false);
             setConfirmationModule(null);
    }
    // const addLectureHandler=(e)=>{
    //     e.preventDefault();


    // }
    const handleDeletesubSection=async(id,sectionId)=>{
        setloading(true);

        try {
            const result=await deleteSubsection({subsectionid:id,sectionID:sectionId},token);
            if(result){
                const updatedContent=course.courseContent.map((section)=> section._id === sectionId ? result:section);
                const updatedCourse={...course,courseContent:updatedContent};

                dispatch(setCourse(updatedCourse));
            }
        } catch (error) {

            toast.error(error.message);
            
        }
         setloading(false);
         setConfirmationModule(null);
    }
  return (
 <>
                <div className='flex flex-col gap-5 bg-richblack-700  mt-5 rounded-md px-8 py-5'>
        {
            course?.courseContent?.map((section)=>(
                      <details key={section._id} className='transition-all duration-200' open>
                        <summary className='flex justify-between border-b-[2px] border-richblack-600 py-1'>
                            <div className='text-richblack-25 flex gap-3'>
                                <RxDropdownMenu  className="text-2xl" />
                                <p>
                                    {section.sectionName}
                                </p>
                            </div>
                            <div className='flex gap-4 text-richblack-300 items-center justify-center'>
                                <button 
                                onClick={()=>{
                                    handlechangeEditSectionName(
                                        section._id,
                                        section.sectionName
                                    )
                                }}>
                                    <MdEdit className='text-xl' />
                                </button>
                                <button
                                onClick={()=>setConfirmationModule(
                                    {
                                        text1:"Delete this Section?",
                                        text2:"All the lectures in this section will be deleted",
                                        btn1text:"Delete",
                                        btn2Text:"Cancel",
                                        btn1Handler:()=>handleDeleteSection(section._id),
                                        btn2Handler:()=>setConfirmationModule(null),
                                    }
                                )}
                                
                                >
                                    
                                <RiDeleteBin6Line className='text-xl' />

                                </button>
                                <span className="font-medium text-richblack-300">|</span>
                <AiFillCaretDown className={`text-xl text-richblack-300`} />
                            </div>
                        </summary>
                        <div className='w-[90%] mx-auto'>
                            {
                                section.subSection
                                .map((subsec, index) => 
                                (
                                    <div onClick={()=>setviewsubsection(subsec)} className=' flex justify-between border-b-[2px] border-richblack-600 py-1' key={index}>
                                         <div className='text-richblack-25 flex gap-3'>
                                <RxDropdownMenu  className="text-2xl" />
                                <p>
                                    {subsec.title}
                                </p>
                            </div>
                            <div onClick={(e)=>e.stopPropagation()} className='flex gap-4 text-richblack-300 items-center justify-center'>
                                <button 
                                onClick={()=>{
                                    seteditsubsection(
                                       {
                                        ...subsec,
                                        sectionId:section._id
                                       }
                                    )
                                }}>
                                    <MdEdit className='text-xl' />
                                </button>
                                <button
                                onClick={()=>setConfirmationModule(
                                    {
                                        text1:"Delete this subSection?",
                                        btn1text:"Delete",
                                        btn2Text:"Cancel",
                                        btn1Handler:()=>handleDeletesubSection(subsec._id,section._id),
                                        btn2Handler:()=>setConfirmationModule(null),
                                    }
                                )}
                                
                                >
                                    
                                <RiDeleteBin6Line className='text-xl' />

                                </button>
                                <span className="font-medium text-richblack-300">|</span>
                <AiFillCaretDown className={`text-xl text-richblack-300`} />
                            </div>
                                    </div>

                                )    
                                )
                                
                            }
                           
                                <button className='font-inter font-bold text-yellow-200 pt-5' onClick={()=>setaddsubsection(section._id)}>+ Add Lecture</button>
                           
                        </div>

                      </details>

            ))
        }

    </div>
    {
        addsubsection ? (
            <SubSectionModal
               modalData={addsubsection}
               setmodalData={setaddsubsection}
               add={true}
            />

        ):(
            viewsubsection?(
                <SubSectionModal
                modalData={viewsubsection}
                setmodalData={setviewsubsection}
                view={true}
                />

            ):(
                  editsubsection ?(
                       <SubSectionModal
                       modalData={editsubsection}
                       setmodalData={seteditsubsection}
                       edit={true}/>
                  ):(
                    <></>
                  )

            )
        )
    }
    {
        confirmationModule && <ConfirmationModule dataModule={confirmationModule}/>
    }
 </>
  )
}

export default NestedView;
