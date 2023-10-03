import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { RxCross2 } from 'react-icons/rx';
import Upload from './Upload';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { setCourse } from '../../../../slices/corse';
import { useDispatch } from 'react-redux';
import { createSubSection, updateSubsection } from '../../../../services/operations/course';
const SubSectionModal = (
    {
        modalData,
        setmodalData,
        add=false,
        view=false,
        edit=false,
    }
) => {


    useEffect(()=>{
       
        // console.log(course);
        // console.log(modalData)
        if(view || edit){
            setValue("lectureTitle",modalData.title)
            setValue("lectureDesc",modalData.description)
            setValue("lectureVideo",modalData.videoUrl)
        }
    },[])
    const {register,handleSubmit,setValue ,formState:{errors} ,getValues}=useForm();
    const [loading,setloading]=useState(false);
    const {token} =useSelector((state)=>state.auth)
    const {course}=useSelector((state)=>state.course);
    const isFormUpdated=()=>{

           const current=getValues();
           if(current.lectureTitle !== modalData.title 
            || current.lectureDesc !== modalData.description 
            || current.lectureVideo !== modalData.videoUrl){
            return true;
           }

          return false;
           

    }
    const handleEditSubsection=async()=>{

         const formdata= new FormData();
         const current=getValues();
         formdata.append("sectionid",modalData.sectionId);
         formdata.append("subsectionid",modalData._id);
         if(current.lectureTitle !== modalData.title){
               formdata.append("title",current.lectureTitle)
         }
        
         if(current.lectureDesc !== modalData.description){
            formdata.append("discription",current.lectureDesc);
         }

         if(current.lectureVideo !== modalData.videoUrl){
           formdata.append("video",current.lectureVideo);
         }
       

         try {
         setloading(true);
          const result=await updateSubsection(formdata,token);
        
          if(result){
            const updatedCourseContent=course.courseContent.map((section)=>
              section._id === modalData.sectionId ? result:section
            )
            const updatedcourse={...course,courseContent:updatedCourseContent};
            dispatch(setCourse(updatedcourse));
          }
          setloading(false);
          setmodalData(null);
          
         } catch (error) {
               toast.error("error in api call")
         }

    }
    const dispatch=useDispatch();
    const onsubmit= async (data)=>{
        //  console.log("data",data)
        if(view)return
        if(edit){
            if(!isFormUpdated()){
                toast.error("No changes made to the form")
            }else{
                handleEditSubsection();
            }
            return
        }
    
        const formData= new FormData();
        formData.append("sectionid",modalData);
        formData.append("title",data.lectureTitle);
        formData.append("courseId",course._id);
        formData.append("discription",data.lectureDesc)
        formData.append("video",data.lectureVideo);
        setloading(true);
        
        try {
            const result=await createSubSection(formData,token)

            if(result){
                dispatch(setCourse(result));
            }
            
        } catch (error) {
            console.log(error);
        }

        setloading(false);
        setmodalData(null);

    }

  return (
    <div className='fixed inset-0 z-50  grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm mt-[10vh] pb-10'>

        <div className=' w-[90%] md:w-1/2 bg-richblack-800   border-[1px] rounded-md border-richblack-400'>
            <div className='flex justify-between px-7 bg-richblack-700 py-4 rounded-md text-richblack-25 font-inter text-2xl'>
            <p>
                {
                    view && "Viewing"
                }
                {
                    add && "Adding"
                }
                {
                    edit && "Editing"
                }
            </p>
            <button onClick={(e)=>!loading? setmodalData(null):{}

            }>
                <RxCross2 className='text-2xl text-richblack-5'/>
            </button>
            </div>
            <form onSubmit={handleSubmit(onsubmit)}
            className='mx-8 my-5'>
                  <Upload 
                    name="lectureVideo"
                    label="Lecture Video"
                    register={register}
                    setValue={setValue}
                    errors={errors}
                    viewData={view?modalData.videoUrl:null}
                     video={true}
                    editData={edit ?modalData?.videoUrl:null}
                    />
                     {/* <Upload
                     name="f"
                     label="Lecture Video"
                     setValue={setValue}
                     ragister={register}
                     video={true}
                     viewData={view ? modalData.videoUrl : null}
                     editData={edit ? modalData.videoUrl:null}
                     /> */}
                     

                     <div className='text-richblack-300'>
                        <label htmlFor="lectureTitle">
                            Lecture Title {!view && <sup className='text-pink-200'>*</sup>}
                        </label>
                        <input type="text"
                        disabled={view || loading} 
                        id='lectureTitle'
                        
                        placeholder='Enter Lecture Title'
                        {...register("lectureTitle",{required:true})}
                        className='w-full bg-richblack-700 py-2 rounded-md text-richblack-25 px-3 outline-none'/>
                        {
                            errors.lectureTitle && (
                                <span className='ml-2 text-xs tracking-wide text-pink-200'>
                                    Lecture title is required
                                </span>
                            )
                        }
                     </div>
                     <div className="flex flex-col space-y-2 text-richblack-400">
            <label  htmlFor="lectureDesc">
              Lecture Description{" "}
              {!view && <sup className="text-pink-200">*</sup>}
            </label>
            <textarea
              disabled={view || loading}
              id="lectureDesc"
              placeholder="Enter Lecture Description"
              {...register("lectureDesc", { required: true })}
              className="form-style resize-x-none min-h-[130px] w-full text-richblack-25 bg-richblack-700 px-3 py-2"
            />
            {errors.lectureDesc && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Lecture Description is required
              </span>
            )}
          </div>
          {!view && (
            <div className="flex justify-end">
              <button
               className='bg-yellow-200 px-3 py-1 rounded-md mt-3'
                disabled={loading}
              >
                {loading ? "Loading.." : edit ? "Save Changes" : "Save"}
              </button>
            </div>
          )}


            </form>
        </div>

    </div>
  )
}


export default SubSectionModal;