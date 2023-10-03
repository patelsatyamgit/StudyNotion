import React, { useEffect, useState } from 'react'
import {HiOutlineCurrencyRupee} from "react-icons/hi"
import { apiConnector } from '../../../../../services/apiconnector';
import Upload from '../Upload';
import { categories } from '../../../../../services/apis'
import { useSelector } from 'react-redux';
import {useForm} from "react-hook-form";
import ChipInput from '../ChipInput';
import Requirements from '../Requirements';
import { useDispatch } from 'react-redux';
import { MdNavigateNext } from 'react-icons/md';
import { setStep } from '../../../../../slices/corse';
import { COURSE_STATUS } from '../../../../../utils/constant';
import { setCourse } from '../../../../../slices/corse';
import { addCourseDetails,editCourseDetails } from '../../../../../services/operations/course';
import { toast } from 'react-hot-toast';
const CourseInfo = () => {
    const [coursecatagory,setcoursecatagory]=useState([]);
    const dispatch=useDispatch();
    const {course,editCourse}=useSelector((state)=>state.course)
    const {CATEGORIES_API}=categories;
    const [loading,setloading]=useState(false);
    const {token} =useSelector((state)=>state.auth);
    const [defCategory,setDefCategory]=useState(null);
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState:{errors},
    }=useForm();

    useEffect(()=>{

        const getCourseCatagories=async()=>{
               setloading(true);
            try {
                   const response=await apiConnector("GET",CATEGORIES_API);
                   setcoursecatagory(response.data.data);
            } catch (error) {
                console.log(error)
                console.log("error in fetching course catagory");   
            }
            setloading(false);

        }

        getCourseCatagories();
        // console.log("courses",course)

        if(editCourse){
          // console.log("category",course.category);
            setValue("courseTitle",course.courseName);
            setValue("Description",course.courseDescription);
            setValue("price",course.price);
            setValue("CourseCategory",course.category);
            setValue("courseTags",course.tag);
            setValue("courseImage",course.thumbnail);
            setValue("benifits",course.whatYouWillLearn);
            setValue("Requirements",course.instructions);
        }

        // coursecatagory && coursecatagory.map((item)=>{
        //   console.log("prove---",course.category===item._id);
        //   if(item._id == course.category){
        //     setDefCategory(item);
        //   }
          
        // })
        // console.log("vvccdd",course.category,defCategory);

        


    },[]);
    const isFormUpdated = () => {
        const currentValues = getValues()
        // console.log("changes after editing form values:", currentValues)
        if (
          currentValues.courseTitle !== course.courseName ||
          currentValues.Description !== course.courseDescription ||
          currentValues.price !== course.price ||
          currentValues.courseTags.toString() !== course.tag.toString() ||
          currentValues.benifits !== course.whatYouWillLearn ||
          currentValues.CourseCategory._id !== course.Category._id ||
          currentValues.Requirements.toString() !==
            course.instructions.toString() ||
          currentValues.courseImage !== course.thumbnail
        ) {
          return true
        }
        return false
      }

    
  //   handle next button click
  const onSubmit = async(data) => {
    console.log("data-----",data)

    if (editCourse) {
      // const currentValues = getValues()
      // console.log("changes after editing form values:", currentValues)
      // console.log("now course:", course)
      // console.log("Has Form Changed:", isFormUpdated())
      console.log("isformupdated,,",isFormUpdated());
      if (isFormUpdated()) {
        const currentValues = getValues()
        const formData = new FormData()
        // console.log(data)
        formData.append("courseId", course._id)
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle)
        }
        if (currentValues.Description !== course.courseDescription) {
          formData.append("courseDescription", data.Description)
        }
        if (currentValues.price !== course.price) {
          formData.append("price", +data.price)
        }
        if (currentValues.courseTags.toString() !== course.tag.toString()) {
          formData.append("tag", JSON.stringify(data.courseTags))
        }
        if (currentValues.benifits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.benifits)
        }

        if (currentValues.CourseCategory !== course.category) {
          formData.append("category",data.CourseCategory)
        }
        if (
          currentValues.Requirements.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          )
        }
        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnailImage", data.courseImage)
        }
        // console.log("Edit Form data: ", formData)
        setloading(true)
        const result =await editCourseDetails(formData, token)
        setloading(false)
      
        if (result) {
          dispatch(setStep(2))
          dispatch(setCourse(result))
        }
      } else {
        toast.error("No changes made to the form")
      }
      return
    }

    const formData = new FormData()
    formData.append("courseName", data.courseTitle)
    formData.append("courseDescription", data.Description)
    formData.append("price", data.price)
    formData.append("tag", JSON.stringify(data.courseTags))
    formData.append("whatYouWillLearn", data.benifits)
    formData.append("category", data.CourseCategory)
    formData.append("status", COURSE_STATUS.DRAFT)
    formData.append("instructions", JSON.stringify(data.Requirements))
    formData.append("thumbnailImage", data.courseImage)
    setloading(true)
    const result = await addCourseDetails(formData, token)
    if (result) {
      dispatch(setStep(2))
      dispatch(setCourse(result))
    }
    setloading(false)
  }

  return (
        <form onSubmit={handleSubmit(onSubmit)}>
             <div className='text-richblack-5 bg-richblack-800 mt-6 px-5 py-5 flex flex-col gap-4 rounded-lg border-[1px] border-richblack-400 z-20'>
        <div className='flex flex-col gap-2'>
            <label htmlFor="courseTitle">Course Title<sup className='text-pink-400 text-sm'>*</sup></label>
            <input type="text" id="courseTitle" className='bg-richblack-700 rounded-lg px-4 py-3 outline-none text-richblack-5 font-inter border-b-[2px] border-richblack-300' placeholder='Enter Course Title' {...register("courseTitle",{required:true})} />
            {
                errors.courseTitle &&(
                    <span className='ml-2 text-xs tracking-wide text-pink-200'>
                        Course title is required
                    </span>
                )
            }
        </div>
        <div className='flex flex-col  gap-2'>
            <label htmlFor="Description">Course Short Description<sup  className='text-pink-400 text-sm'>*</sup></label>
            <textarea name="Description" id="Description"  className='bg-richblack-700 rounded-lg px-4 py-3 outline-none text-richblack-5 font-inter border-b-[2px] border-richblack-300' placeholder='Enter Description' {...register("Description",{required:true,validate:(value)=>value.length >15})}/>
            {
                errors.Description && (
                    <span className='ml-2 text-xs tracking-wide text-pink-200'>
                    Course description needed must be min 15 char
                </span>
                )
            }
        </div>
        <div className='flex flex-col gap-2 relative'>
            <label htmlFor="price">Course Price<sup className='text-pink-400 text-sm'>*</sup></label>
            <input type="text" id="price" className='bg-richblack-700 rounded-lg pl-11 py-3 outline-none text-richblack-5 font-inter border-b-[2px] border-richblack-300' placeholder='Enter Course Price' {...register("price",{required:true,valueAsNumber:true,pattern:{
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
            }})}/>
            {
                errors.price && (
                    <span className='ml-2 text-xs tracking-wide text-pink-200'>
                    Course price needed.
                </span>
                )
            }
            <div className='absolute top-12 left-3 text-xl text-richblack-300'>
                <HiOutlineCurrencyRupee/>
            </div>
        </div>
        <div className='flex flex-col gap-2'>
            <label htmlFor="CourseCategory">Course Category<sup className='text-pink-400 text-sm'>*</sup></label>
            <select  type="text" id="CourseCategory" className='bg-richblack-700 rounded-lg px-4 py-3 outline-none font-inter border-b-[2px] border-richblack-300 '{...register("CourseCategory",{required:true})} >
                <option value={ course && course.category ? course.category._id:"ffffffffffff"} className='text-richblack-400'>{course && course.category? course.category.name :"Choose your course Category"}</option>

                {
                    !loading && coursecatagory.map((item,index)=>{
                        return <option value={item._id} key={index} className='bg-richblack-800'>{item?.name}</option>
                    })
                }

            </select>
            {
                errors.CourseCategory && (
                    <span className='ml-2 text-xs tracking-wide text-pink-200'>
                  please select  Course Category.
                </span>
                )
            }
        </div>
        <div>
            <ChipInput
            label="Tags"
            name="courseTags"
            placeholder="Enter Tags and press Enter"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
            />

        </div>
        <div>
            <Upload 
              name="courseImage"
              label="Course Thumbnail"
              register={register}
              setValue={setValue}
              errors={errors}
              editData={editCourse ?course?.thumbnail:null}
            />
        </div>
        <div className='flex flex-col gap-2'>
            <label htmlFor="benifits">Benifits of the Course <sup className='text-pink-200'>*</sup></label>
            <textarea name="benifits" id="benifits"  placeholder='Enter benefits of the course' className='bg-richblack-700 rounded-md px-2 py-3 outline-none font-inter'{...register("benifits",{required:true})}/>
            {
                errors.benifits && (
                    <span className='ml-2 text-xs tracking-wide text-pink-200'>
                    Course befits required
                </span>
                )
            }
        </div>
        <div>
            <Requirements
              label="Requirements/Instructions"
              name="Requirements"
              register={register}
              errors={errors}
              setValue={setValue}
              getValues={getValues}
            />
        </div>
        <div className="flex justify-end gap-x-2">
        {editCourse && (
          <button
            onClick={() => dispatch(setStep(2))}
            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
          >
            Continue Wihout Saving
          </button>
        )}
        <button
        className=' bg-yellow-200 px-4 py-2 rounded-lg items-center flex gap-3'
        type='submit'
        >
          {!editCourse ? "Next" : "Save Changes"}
          <MdNavigateNext />
        </button>
      </div>
        
        
    </div>
        </form>
           
  )
}
export default CourseInfo;
